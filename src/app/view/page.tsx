"use client";

import BlogWrapper from "../../ui/BlogWrapper";
import Link from "next/link";

export default function BlogView() {
  return (
    <div className="max-w-4xl text-center mx-auto p-6">
      <div className="flex justify-between  items-center mb-6">
        <h1 className="text-3xl  font-bold">Blog Dashboard</h1>
        <Link href="/create">
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
            ➕ Create Blog
          </button>
        </Link>
      </div>
      <BlogWrapper />
    </div>
  );
}
