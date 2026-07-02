// Prefix public-folder assets with Vite's base URL so they resolve
// both locally (/) and on GitHub Pages (/pharelab/).
export const asset = (path: string) =>
  import.meta.env.BASE_URL + path.replace(/^\//, "");
