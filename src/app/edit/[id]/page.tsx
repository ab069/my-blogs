"use client";

import { useState, useEffect,useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePost } from "@/lib/features/blogSlice"; // ✅ Corrected action name
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import { RootState } from "@/lib/store";

export default function EditPost() {
  const params = useParams();
  const id = params?.id as string; // Ensure ID is extracted correctly
  const dispatch = useDispatch();
  const router = useRouter();

  // Get existing post from Redux

  const post = useSelector((state: RootState) =>
    state.blog.posts.find((p) => p.id === id)
  );

  // Handle case where post is not found
  useEffect(() => {
    if (!post) {
      alert("Post not found!");
      router.push("/");
    }
  }, [post, router]);

  // Local state for the form
  const [title, setTitle] = useState(post?.title || "");
  const [description, setDescription] = useState(post?.description || "");
  const [content, setContent] = useState(post?.content || "");
  const [tags, setTags] = useState(post?.tags?.join(", ") || "");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState(post?.image || ""); // Default to existing image

  // Handle image selection
  const handleImageChange = useCallback( (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const objectURL = URL.createObjectURL(file);
      setPreview(objectURL);
    }
  }, []);

  // Cleanup URL.createObjectURL to free memory
  useEffect(() => {
    return () => {
      if (preview && image) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview, image]);

  // Handle form submission
  const handleSubmit =useCallback( (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !content) {
      return alert("All fields are required.");
    }

    // Update post in Redux
    dispatch(
      updatePost({
        id,
        title,
        description,
        content,
        tags: tags.split(",").map((tag) => tag.trim()),
        image: preview, // Keep old image or update it
        createdAt: post?.createdAt || new Date().toISOString(),
      })
    );

    router.push("/");
  }, [dispatch]);

  if (!post) return null; // Prevents rendering if post is not found

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Blog Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />

        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 border rounded"
          rows={5}
          required
        />

        {/* Image Upload */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full p-2 border rounded"
        />

        {/* Show Image Preview */}
        {preview && (
          <Image
            src={preview}
            width={300}
            height={200}
            alt="Preview"
            className="w-full h-40 object-cover rounded"
          />
        )}

        <input
          type="text"
          placeholder="Tags (comma-separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="w-full p-2 border rounded"
        />

        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Save Changes
        </button>
      </form>
    </div>
  );
}
