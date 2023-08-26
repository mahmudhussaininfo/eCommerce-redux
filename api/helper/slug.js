export const createSlug = (title) => {
  // Remove special characters and convert to lowercase
  const cleanedTitle = title.replace(/[^\w\s]/gi, "").toLowerCase();

  // Replace spaces with dashes
  const slug = cleanedTitle.replace(/\s+/g, "-");

  return slug;
};
