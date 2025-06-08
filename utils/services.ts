import { supabase } from "@/lib/supabase";

export const uploadImagesToSupabase = async (
  imageUri: string,
  userId: string
) => {
  try {
    // Extract file extension
    const fileExt = imageUri.split(".").pop()?.toLowerCase() || "jpg"; // fallback to jpg
    const fileName = `${Date.now()}.${fileExt}`;

    // Convert image to blob
    const response = await fetch(imageUri);
    const blob = await response.blob();

    // Determine MIME type
    const mimeType = blob.type || `image/${fileExt}`;

    // Upload with correct content-type
    const { data, error } = await supabase.storage
      .from("projects")
      .upload(`user_${userId}/${fileName}`, blob, {
        contentType: mimeType,
      });

    if (error) throw error;

    // Get public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from("projects").getPublicUrl(data.path);

    return publicUrl;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};
