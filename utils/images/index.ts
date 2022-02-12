export function getProductImagePath(imageName: string | null) {
  const publicPath = "/images/products";
  const fallbackImage = "fallback.png";

  if (imageName) return `${publicPath}/${imageName}`;

  return `${publicPath}/${fallbackImage}`;
}
