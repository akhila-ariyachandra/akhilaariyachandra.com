import React from "react";
import Link from "next/link";
import { BlogPost } from "../util/types";
import { formatTags } from "../util/helpers";

type Props = {
  blogPost: BlogPost;
};

const PostLink: React.FunctionComponent<Props> = ({ blogPost }) => {
  return (
    <div className="post-link">
      <Link href="/[slug]" as={`/${blogPost.slug}`}>
        <h2 className="link">{blogPost.title}</h2>
      </Link>

      <div className="info">
        <small className="date">{blogPost.date}</small>
        <small>{blogPost.readingTime}</small>
      </div>

      <small>{formatTags(blogPost.tags)}</small>

      <p>{blogPost.description}</p>

      <style jsx>{`
        .post-link {
          margin-top: 2rem;
          margin-bottom: 2rem;
        }

        .info {
          display: flex;
        }

        .date {
          flex: 1;
        }
      `}</style>
    </div>
  );
};

export default PostLink;
