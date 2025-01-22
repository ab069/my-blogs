"use client";

import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addPost } from "../../lib/features/blogSlice";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const dispatch = useDispatch();
  const router = useRouter();

  // Handle Image Selection & Preview
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const objectURL = URL.createObjectURL(file);
      setPreview(objectURL);
    }
  };

  // Cleanup URL.createObjectURL to free memory
  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  // Handle Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !content || !image) {
      return alert("All fields are required, including an image.");
    }

    // Store only the image preview URL in Redux
    dispatch(
      addPost({
        id: Date.now().toString(),
        title,
        description,
        content,
        tags: tags.split(",").map((tag) => tag.trim()),
        image: preview, // Storing the image preview URL
        createdAt: new Date().toISOString(),
      })
    );

    // Redirect back to home
    router.push("/");
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Create New Blog Post</h1>
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

        {/* Image Upload Input */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full p-2 border rounded"
          required
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
          Create Post
        </button>
      </form>
    </div>
  );
}
