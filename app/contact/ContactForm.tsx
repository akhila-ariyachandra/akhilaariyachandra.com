"use client";

import toast from "react-hot-toast";
import { useId } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useSession } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { contactSchema, type ContactSchemaType } from "@/lib/schema";
import { cn } from "@/lib/helpers";

const ContactForm = () => {
  const id = useId();
  const { status } = useSession();

  const subjectId = `subject-${id}`;
  const contentId = `content-${id}`;

  const { register, handleSubmit, reset } = useForm<ContactSchemaType>({
    resolver: zodResolver(contactSchema),
  });

  const contactMutation = useMutation({
    mutationFn: async (values: ContactSchemaType) => {
      await fetch("/api/contact", {
        method: "POST",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
    },
    onSuccess: () => {
      reset();
      toast.success("Successfully sent email");
    },
    onError: () => {
      toast.error("Error sending email");
    },
  });

  const onSubmit: SubmitHandler<ContactSchemaType> = async (values) => {
    await contactMutation.mutateAsync(values);
  };

  if (status !== "authenticated") {
    return null;
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center gap-4"
    >
      <div className="flex w-full flex-col gap-1">
        <label
          htmlFor={subjectId}
          className="font-display text-xs text-zinc-800 dark:text-zinc-200 sm:text-sm"
        >
          Subject
        </label>

        <input
          {...register("subject")}
          id={subjectId}
          type="text"
          className={cn(
            "rounded bg-white font-body text-zinc-900 disabled:bg-zinc-200 disabled:text-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 disabled:dark:bg-zinc-800 disabled:dark:text-zinc-200",
            "focus:border-emerald-700 focus:ring-emerald-700 dark:focus:border-emerald-600 dark:focus:ring-emerald-600"
          )}
          disabled={contactMutation.isPending}
        />
      </div>

      <div className="flex w-full flex-col gap-1">
        <label
          htmlFor={contentId}
          className="font-display text-xs text-zinc-800 dark:text-zinc-200 sm:text-sm"
        >
          Content
        </label>

        <textarea
          {...register("content")}
          id={contentId}
          className={cn(
            "resize-none",
            "rounded bg-white font-body text-zinc-900 disabled:bg-zinc-200 disabled:text-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 disabled:dark:bg-zinc-800 disabled:dark:text-zinc-200",
            "focus:border-emerald-700 focus:ring-emerald-700 dark:focus:border-emerald-600 dark:focus:ring-emerald-600"
          )}
          rows={10}
          disabled={contactMutation.isPending}
        />
      </div>

      <button
        type="submit"
        className="rounded bg-zinc-800 px-3 py-1 font-display text-base font-medium leading-none text-zinc-200 disabled:bg-zinc-600 dark:bg-zinc-200 dark:text-zinc-800 disabled:dark:bg-zinc-400 sm:px-4 sm:py-2 sm:text-lg"
        disabled={contactMutation.isPending}
      >
        Send
      </button>
    </form>
  );
};

export default ContactForm;
