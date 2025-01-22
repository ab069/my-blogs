import fs from "fs";
import path from "path";

export async function POST(req) {
  const { fileName, fileContent } = await req.json();

  if (!fileName || !fileContent) {
    return new Response(JSON.stringify({ error: "Missing file data." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const uploadDir = path.join(process.cwd(), "public/uploads");
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const filePath = path.join(uploadDir, fileName);
  const base64Data = fileContent.replace(/^data:image\/\w+;base64,/, "");

  fs.writeFileSync(filePath, base64Data, "base64");
  return new Response(
    JSON.stringify({ url: `/uploads/${fileName}` }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}
