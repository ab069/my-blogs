// "use client";

// import { useSelector } from "react-redux";
// import { RootState } from "../lib/store";
// import {
//   PencilSquareIcon,
//   TagIcon,
//   FireIcon,
//   DocumentTextIcon,
// } from "@/heroicons/react/24/outline";

// const iconMap = {
//   totalPosts: PencilSquareIcon,
//   totalTags: TagIcon,
//   popularTag: FireIcon,
//   latestPost: DocumentTextIcon,
// };

// export default function CardWrapper() {
//   const posts = useSelector((state: RootState) => state.blog.posts);

//   // Calculate total posts
//   const totalPosts = posts.length;

//   // Extract tags and count occurrences
//   const tagCounts: Record<string, number> = {};
//   posts.forEach((post) => {
//     post.tags?.forEach((tag) => {
//       tagCounts[tag] = (tagCounts[tag] || 0) + 1;
//     });
//   });

//   // Calculate total tags & most popular tag
//   const totalTags = Object.keys(tagCounts).length;
//   const popularTag = Object.entries(tagCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A";

//   // Get latest post title
//   const latestPost = posts[posts.length - 1]?.title || "No Posts Available";

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
//       <Card title="Total Posts" value={totalPosts} type="totalPosts" />
//       <Card title="Total Tags" value={totalTags} type="totalTags" />
//       <Card title="Popular Tag" value={popularTag} type="popularTag" />
//       <Card title="Latest Post" value={latestPost} type="latestPost" />
//     </div>
//   );
// }

// export function Card({
//   title,
//   value,
//   type,
// }: {
//   title: string;
//   value: number | string;
//   type: "totalPosts" | "totalTags" | "popularTag" | "latestPost";
// }) {
//   const Icon = iconMap[type];

//   return (
//     <div className="rounded-xl bg-gray-50 p-4 shadow-sm flex flex-col items-center text-center">
//       <div className="flex items-center space-x-2">
//         {Icon ? <Icon className="h-6 w-6 text-gray-700" /> : null}
//         <h3 className="text-sm font-medium text-gray-700">{title}</h3>
//       </div>
//       <p className="mt-2 text-2xl font-bold text-gray-900">{value}</p>
//     </div>
//   );
// }
