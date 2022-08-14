import React from 'react'
import Link from 'next/link'

const PostItem = ({item:{title,slug}}) => {
  return <Link href={`/posts/` + slug}>{title}</Link>;
}

export default PostItem