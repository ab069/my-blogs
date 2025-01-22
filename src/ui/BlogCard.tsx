import Link from "next/link";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { deletePost } from "@/lib/features/blogSlice";
import { BlogPost } from "@/types/blog";
import { useCallback } from "react";

export default function BlogCard({ post }: { post: BlogPost }) {
  const dispatch = useDispatch();

  const handleDelete = useCallback( async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this post?");
    if (confirmDelete) {
      // Make an API call to delete the image
      if (post.image) {
        try {
          await fetch(`/api/delete-image`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ imagePath: post.image }),
          });
        } catch (err) {
          console.error("Failed to delete image:", err);
        }
      }
  
      // Dispatch Redux action to delete the post
      dispatch(deletePost(post.id));
    }
  }, [post.image, post.id, dispatch]);
  

  return (



<div className="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-96">
  <div className="relative h-56 m-2.5 overflow-hidden text-white rounded-md">
  {post.image && (
        <Image 
          src={post.image} 
          alt={post.title} 
          width={400} 
          height={160} 
          className="w-full h-40 object-cover" 
        />
      )}
  </div>
  <div className="p-4">
    <h6 className="mb-2 text-slate-800 text-xl font-semibold">
    {post.title}    </h6>
    {post.description && (  <p className="text-slate-600 leading-normal font-light">
    {post.description} </p>)}
   
    {post.tags && (   <p className="mt-2 text-sm text-gray-500">Tags: {post.tags?.join(", ")}</p>)}

  </div>
  <div className="px-4 pb-4 pt-0 mt-2">
    <button className="rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
    <Link href={`/post/${post.id}`} className="text-blue-600 hover:text-blue-800">
            Read More →
        </Link>
  
    </button>
  </div>
  <div className="space-x-3">
            <Link href={`/edit/${post.id}`} className="px-3 py-1 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600">
              Edit
            </Link>
            <button 
              onClick={handleDelete} 
              className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
</div>  




    // <div className="rounded-lg border border-gray-200 bg-white shadow-md hover:shadow-lg overflow-hidden">
    //   {/* Optimized Image Handling */}
    //   {post.image && (
    //     <Image 
    //       src={post.image} 
    //       alt={post.title} 
    //       width={400} 
    //       height={160} 
    //       className="w-full h-40 object-cover" 
    //     />
    //   )}

    //   <div className="p-4">
    //     <h2 className="text-xl font-semibold text-gray-900">{post.title}</h2>
    //     <p className="mt-2 text-gray-600">{post.description}</p>
    //     <p className="mt-2 text-sm text-gray-500">Tags: {post.tags?.join(", ")}</p>

    //     <div className="mt-4 flex justify-between items-center">
    //       {/* Read More */}
    //       <Link href={`/post/${post.id}`} className="text-blue-600 hover:text-blue-800">
    //         Read More →
    //       </Link>

    //       {/* Edit & Delete Buttons */}
    //       <div className="space-x-3">
    //         <Link href={`/edit/${post.id}`} className="px-3 py-1 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600">
    //           Edit
    //         </Link>
    //         <button 
    //           onClick={handleDelete} 
    //           className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
    //         >
    //           Delete
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}



