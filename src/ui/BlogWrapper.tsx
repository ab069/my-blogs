"use client";

import { useSelector } from "react-redux";
import { RootState } from "../lib/store";
import BlogCard from "./BlogCard";

export default function BlogWrapper() {
  const posts = useSelector((state: RootState) => state.blog.posts);

  return (
    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
      {posts.length > 0 ? (
        posts.map((post) => <BlogCard key={post.id} post={post} />)
      ) : (
        <p className="text-gray-600">No blog posts available.</p>
      )}
    </div>
  );
}
