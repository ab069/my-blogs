"use client";

import { useEffect, useState } from "react";
import { BlogPost } from "@/types/blog";
import { getPosts, deletePost } from "@/lib/storage";
import Link from "next/link";

export default function Home() {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    setPosts(getPosts());
  }, []);

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this post?")) {
      deletePost(id);
      setPosts(getPosts());
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Blog Posts</h1>
      <Link href="/create">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Create New Post</button>
      </Link>

      {posts.length === 0 ? (
        <p className="text-gray-600 mt-4">No posts found.</p>
      ) : (
        <div className="mt-4 space-y-4">
          {posts.map((post) => (
            <div key={post.id} className="border p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p className="text-gray-700">{post.description}</p>
              <Link href={`/post/${post.id}`}>
                <button className="text-blue-500 mt-2">Read More</button>
              </Link>
              <button
                className="text-red-500 ml-4"
                onClick={() => handleDelete(post.id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
