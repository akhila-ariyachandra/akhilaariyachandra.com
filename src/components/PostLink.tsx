import React from "react"
import Link from "next/link"
import { BlogPost } from "../util/types"

type Props = {
  blogPost: BlogPost
}

const PostLink: React.FunctionComponent<Props> = ({ blogPost }) => {
  return (
    <div>
      <Link href="/[slug]" as={`/${blogPost.slug}`}>
        <h2>{blogPost.title}</h2>
      </Link>

      <p>{blogPost.description}</p>
    </div>
  )
}

export default PostLink
