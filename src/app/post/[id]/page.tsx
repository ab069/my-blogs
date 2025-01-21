"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { BlogPost } from "@/types/blog";
import { getPosts } from "@/lib/storage";

export default function ViewPost() {
  const { id } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    if (id) {
      const posts = getPosts();
      setPost(posts.find((p) => p.id === id) || null);
    }
  }, [id]);

  if (!post) return <p>Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <p className="text-gray-600">{post.description}</p>
      <div className="mt-4">{post.content}</div>
      <p className="mt-4 text-gray-500">Tags: {post.tags?.join(", ")}</p>
    </div>
  );
}
