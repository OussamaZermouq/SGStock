import type { NextApiRequest, NextApiResponse } from "next";
import { v2 as cloudinary } from "cloudinary";

// Configure your Cloudinary credentials
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { image } = req.body;

    // Remove the data URL prefix (e.g., 'data:image/jpeg;base64,')
    const base64String = image.split(',')[1];

    const result = await cloudinary.uploader.upload(`data:image/jpeg;base64,${base64String}`, {
      upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
    });

    return res.status(200).json({ url: result.secure_url });
  } catch (error) {
    console.error("Error uploading image:", error);
    return res.status(500).json({ error: "Failed to upload image" });
  }
}
