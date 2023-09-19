/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { type ComponentProps, useEffect, useRef, useState } from "react";
import { FaHeart } from "react-icons/fa";

import { type PostsSelectModel } from "@/db/schema";
import { MAX_UPVOTES } from "@/lib/constants";

type ResponseFormat = Omit<PostsSelectModel, "views"> & {
  userVotes: number;
};

type UpvotesProps = {
  slug: string;
};

const Upvotes = ({ slug }: UpvotesProps) => {
  const queryClient = useQueryClient();
  const timeoutRef = useRef<NodeJS.Timeout>();
  const [currentCount, setCurrentCount] = useState(0);
  const [currentTotal, setCurrentTotal] = useState(0);

  const { data, refetch } = useQuery({
    queryKey: ["upvotes", slug],
    queryFn: async () => {
      const response = await fetch(`/api/upvotes/${slug}`);

      if (!response.ok) {
        throw new Error("Error fetching upvotes");
      }

      return (await response.json()) as ResponseFormat;
    },
    placeholderData: {
      slug,
      upvotes: 0,
      userVotes: 0,
    },
  });

  useEffect(() => {
    if (data) {
      setCurrentCount(data?.userVotes ?? 0);
      setCurrentTotal(data?.upvotes ?? 0);
    }
  }, [data]);

  const upvotesMutation = useMutation({
    mutationKey: ["upvotes", slug, "changing"],
    mutationFn: async (count: number) => {
      const response = await fetch(`/api/upvotes/${slug}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ count }),
      });

      if (!response.ok) {
        throw new Error("Error changing upvotes");
      }

      return (await response.json()) as ResponseFormat;
    },
    onError: () => {
      refetch();
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["upvotes", slug], data);
    },
  });

  const increment: ComponentProps<"button">["onClick"] = () => {
    const newCount = currentCount + 1;
    setCurrentCount(newCount);

    const newTotal = currentTotal + (newCount - currentCount);
    setCurrentTotal(newTotal);

    clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      upvotesMutation.mutate(newCount);
    }, 2000);
  };

  return (
    <div className="my-9 flex flex-row items-center justify-center gap-3 sm:my-10 sm:gap-4">
      <button
        onClick={increment}
        disabled={currentCount >= MAX_UPVOTES}
        className="data-[full]:animate-wiggle relative overflow-hidden rounded bg-zinc-200 p-2 text-2xl dark:bg-zinc-800"
        data-full={currentCount >= MAX_UPVOTES ? true : undefined}
      >
        <motion.div
          className="absolute bottom-0 left-0 right-0 w-full transform bg-green-400 dark:bg-green-800"
          animate={{
            height: `${(currentCount / MAX_UPVOTES) * 100}%`,
          }}
        />

        <span className="relative text-zinc-800 dark:text-zinc-200">
          <FaHeart />
        </span>
      </button>

      <div className="text-2xl font-medium text-zinc-800 dark:text-zinc-200">
        {currentTotal}
      </div>
    </div>
  );
};

export default Upvotes;
