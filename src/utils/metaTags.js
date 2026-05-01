/**
 * Update meta tags dynamically for better social sharing
 */
export function updateMetaTags({ title, description, image, url }) {
  // Update document title (browser tab) with site name
  if (title) {
    document.title = `${title} | LuvlyFans Blog`;
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
    // Ensure absolute URL
    const imageUrl = image.startsWith("http")
      ? image
      : `${window.location.origin}${image}`;

    updateMetaTag("og:image", imageUrl);
    updateMetaTag("twitter:image", imageUrl, true);
  }

  if (url) {
    const fullUrl = url.startsWith("http")
      ? url
      : `${window.location.origin}${url}`;

    updateMetaTag("og:url", fullUrl);
  }

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
