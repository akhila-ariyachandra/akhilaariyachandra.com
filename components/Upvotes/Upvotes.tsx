"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import ky from "ky";
import { type ComponentProps, useEffect, useRef, useState } from "react";
import { FaHeart } from "react-icons/fa";

import usePost from "@/hooks/usePost.hook";
import { MAX_UPVOTES } from "@/lib/constants";
import type { PostsResponse } from "@/lib/types";

type UpvotesProps = {
  slug: string;
};

const Upvotes = ({ slug }: UpvotesProps) => {
  const queryClient = useQueryClient();
  const timeoutRef = useRef<NodeJS.Timeout>();
  const [currentCount, setCurrentCount] = useState(0);
  const [currentTotal, setCurrentTotal] = useState(0);

  const { data, refetch } = usePost(slug);

  useEffect(() => {
    if (data) {
      setCurrentCount(data?.userVotes ?? 0);
      setCurrentTotal(data?.upvotes ?? 0);
    }
  }, [data]);

  const upvotesMutation = useMutation({
    mutationKey: ["upvotes", slug, "change"],
    mutationFn: (count: number) =>
      ky
        .post(`/api/posts/${slug}/upvotes`, { json: { count } })
        .json<PostsResponse>(),
    onSettled: async () => {
      await refetch();
      queryClient.refetchQueries(["posts"]);
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
        disabled={currentCount >= MAX_UPVOTES || upvotesMutation.isLoading}
        className="relative overflow-hidden rounded bg-zinc-200 p-2 text-2xl data-[full]:animate-wiggle dark:bg-zinc-800"
        data-full={currentCount >= MAX_UPVOTES ? true : undefined}
      >
        <div
          className="absolute bottom-0 left-0 right-0 w-full transform bg-green-400 transition-height duration-200 ease-out dark:bg-green-800"
          style={{
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
