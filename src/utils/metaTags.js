/**
 * Update meta tags dynamically for better social sharing
 */
export function updateMetaTags({ title, description, image, url }) {
  // Update document title (browser tab) with site name
  if (title) {
    document.title = `${title} | LuvlyFans`;
  }

  // Helper to update or create meta tag
  const updateMetaTag = (property, content, isName = false) => {
    const attr = isName ? "name" : "property";
    let element = document.querySelector(`meta[${attr}="${property}"]`);

    if (!element) {
      element = document.createElement("meta");
      element.setAttribute(attr, property);
      document.head.appendChild(element);
    }

    element.setAttribute("content", content);
  };

  // Update Open Graph tags
  if (title) {
    updateMetaTag("og:title", title);
    updateMetaTag("twitter:title", title, true);
  }

  if (description) {
    updateMetaTag("description", description, true);
    updateMetaTag("og:description", description);
    updateMetaTag("twitter:description", description, true);
  }

  if (image) {
    // Ensure absolute URL for OG images
    let imageUrl;
    if (image.startsWith("http")) {
      imageUrl = image;
    } else {
      // Remove leading slash if present to avoid double slashes
      const imagePath = image.startsWith("/") ? image : `/${image}`;
      imageUrl = `${window.location.origin}${imagePath}`;
    }

    console.log("Setting OG image:", imageUrl); // Debug log
    updateMetaTag("og:image", imageUrl);
    updateMetaTag("twitter:image", imageUrl, true);

    // Add image dimensions for better social sharing
    updateMetaTag("og:image:width", "1200");
    updateMetaTag("og:image:height", "630");
  }

  if (url) {
    const fullUrl = url.startsWith("http")
      ? url
      : `${window.location.origin}${url}`;

    updateMetaTag("og:url", fullUrl);
  }

  // Always set og:type for proper social sharing
  updateMetaTag("og:type", "article");

  // Update canonical link
  if (url) {
    const fullUrl = url.startsWith("http")
      ? url
      : `${window.location.origin}${url}`;

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", fullUrl);
  }
}

/**
 * Reset meta tags to default
 */
export function resetMetaTags() {
  updateMetaTags({
    title: "LuvlyFans Blog — Creator Education & Growth",
    description:
      "The creator hub built by creators for creators. Learn strategies, case studies, and playbooks to help you earn more.",
    image: "/og-image.png",
    url: "/",
  });
}
