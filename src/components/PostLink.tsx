import React from "react";
import Link from "next/link";
import readingTime from "reading-time";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { BlogPost } from "../util/types";
import { formatTags } from "../util/helpers";

type Props = {
  blogPost: BlogPost;
};

dayjs.extend(advancedFormat);

const PostLink: React.FunctionComponent<Props> = ({ blogPost }) => {
  return (
    <div className="post-link">
      <Link href="/[slug]" as={`/${blogPost.slug}`}>
        <h2 className="link">{blogPost.title}</h2>
      </Link>

      <div style={{ display: "flex" }}>
        <small style={{ flex: 1 }}>
          {dayjs(blogPost.date).format("Do MMMM YYYY")}
        </small>
        <small>{readingTime(blogPost.content).text}</small>
      </div>

      <small>{formatTags(blogPost.tags)}</small>

      <p>{blogPost.description}</p>

      <style jsx>{`
        h2 {
          cursor: pointer;
        }

        .post-link {
          margin-top: 2rem;
          margin-bottom: 2rem;
        }
      `}</style>
    </div>
  );
};

export default PostLink;
