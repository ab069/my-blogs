import fs from "fs";
import path from "path";

export async function POST(req) {
  const { imagePath } = await req.json();

  if (!imagePath) {
    return new Response(
      JSON.stringify({ error: "Image path is required" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const fullPath = path.join(process.cwd(), "public", imagePath);

  try {
    fs.unlinkSync(fullPath);
    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Error deleting image:", err);
    return new Response(
      JSON.stringify({ error: "Failed to delete image" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

