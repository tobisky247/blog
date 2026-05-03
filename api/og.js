export const config = {
  runtime: "edge",
};

// ── Article data (matches src/data.js) ──────────────────────────────────────
const ARTICLES = [
  {
    slug: "sustainable-monthly-income",
    title: "How Creators Build Sustainable Monthly Income",
    excerpt:
      "Virality opens the door, but sustainability keeps it open. Learn the balance between capitalizing on attention and building a reliable base.",
    thumbnail: "/assets/homepage/creating sustainable income.jpg",
  },
  {
    slug: "pricing-strategy",
    title: "A Pricing Strategy That Supports Consistent Subscription Income",
    excerpt:
      "Stop guessing. Pricing isn't just about maximizing short-term spikes. Learn how to build a structure that feels sustainable and fair for the long run.",
    thumbnail: "/assets/homepage/pricing-plan.jpg",
  },
  {
    slug: "get-subscribers",
    title: "Get Your First Subscribers Without Buying Ads",
    excerpt:
      "Most creators think they need a budget to start. They don't. Learn how to leverage your existing presence and platform tools to build your first base organically.",
    thumbnail: "/assets/homepage/subscribers.jpg",
  },
  {
    slug: "building-consistent-monthly-income",
    title: "Building Consistent Monthly Income as a Creator",
    excerpt:
      "Making money is not the same as making money consistently. Learn the habits, structure, and trust required for reliable monthly earnings.",
    thumbnail: "/assets/homepage/Building Consistent Monthly Income as a Creator.jpg",
  },
  {
    slug: "content-ideas-that-sell",
    title: "50 Content Ideas That Actually Convert to Paid Subscribers",
    excerpt:
      "Steal these ideas. Proven formats that keep fans engaged and wallets open.",
  },
  {
    slug: "promote-your-profile",
    title: "How to Promote Your LuvlyFans Profile",
    excerpt:
      "Promotion works best when it's simple, consistent, and clear. Learn the best practices for social media, Reddit, and collaborations.",
    thumbnail: "/assets/homepage/promotion.jpg",
  },
  {
    slug: "build-your-fanbase",
    title: "How to Build Your Fanbase on LuvlyFans",
    excerpt:
      "Building a fanbase is less about quick wins and more about what you do repeatedly. Learn the difference between followers and subscribers, and how to build lasting trust.",
    thumbnail: "/assets/homepage/fans.jpg",
  },
  {
    slug: "creator-habits",
    title: "5 Habits That Separate Creators Who Earn From Those Who Don't",
    excerpt:
      "Most creators post and hope. The ones who earn consistently? They do these five things instead. No gimmicks - just the quiet habits that actually move the needle.",
    thumbnail: "/assets/homepage/plan.jpg",
  },
  {
    slug: "luvlyfans-standard",
    title: "The LuvlyFans Standard: Why the Top 1% are Switching",
    excerpt:
      "Fast payouts, real human support, and built-in growth tools. Discover why the biggest creators in the industry are choosing LuvlyFans as their long-term partner.",
    thumbnail: "/assets/homepage/luvlfans-macbook.png",
  },
  {
    slug: "setup-first-impressions",
    title: "Setting Up Your Page for First Impressions",
    excerpt:
      "When someone lands on your page, they decide quickly whether to stay or leave. Learn how to build trust immediately with a clear profile.",
    thumbnail: "/assets/homepage/page-set-up.jpg",
  },
  {
    slug: "content-direction",
    title: "Choosing Your Content Direction",
    excerpt:
      "You don't need a perfect niche, but you do need a clear direction. Learn how to define what your page is about for prospective subscribers.",
    thumbnail: "/assets/homepage/choosing-content.jpg",
  },
  {
    slug: "first-30-days",
    title: "Your First 30 Days Plan",
    excerpt:
      "Your first month is about building a foundation, not chasing results. Follow this 4-week structure to get your page ready for growth.",
    thumbnail: "/assets/homepage/planning.jpg",
  },
  {
    slug: "pricing-content",
    title: "Pricing Your Content",
    excerpt:
      "Pricing affects who subscribes and how long they stay. Learn the simple structure that supports consistency and reduces pressure.",
    thumbnail: "/assets/homepage/pricing.jpg",
  },
];

// ── Events data ─────────────────────────────────────────────────────────────
const EVENTS = [
  {
    slug: "lustful-events-introduction",
    title: "Introduction: The Real-World Creator Environment",
    excerpt:
      "Organised by Lustful Events CEO Lou (@iamloulalouagain), the Lustful Ladies space brings creators together for real-world connection and perspective.",
    thumbnail: "/assets/creators/Loulalou.png",
  },
  {
    slug: "avn-celebrating-creators",
    title: "LuvlyFans at AVN: Celebrating Creators",
    excerpt:
      "LuvlyFans creator QuietlyVae represents the next generation of professional talent at the industry's largest event.",
    thumbnail: "/assets/events/Quietlyvae.avn2.jpeg",
  },
  {
    slug: "quietlyvae-creators-after-dark",
    title: "QuietlyVae represents Luvlyfans at Creators After Dark",
    excerpt:
      "Not every important conversation happens on a stage. Some happen in more relaxed spaces.",
    thumbnail: "/assets/events/creators_after_dark2.jpeg",
  },
];

// ── Creator voices data ─────────────────────────────────────────────────────
const CREATOR_ARTICLES = [
  {
    slug: "trinity-infinity",
    title:
      "In Conversation with Trinity Infinity: Finding Her Own Path and Building Connection Over Numbers",
    excerpt:
      "Every creator builds differently. In this feature, we spoke with Trinity Infinity about how she got started, what's worked for her, and what she's learned along the way.",
    thumbnail: "/assets/creators/trinity1.jpeg",
  },
];

// ── Features data ───────────────────────────────────────────────────────────
const FEATURES = [
  {
    slug: "spotlight-global-reach",
    title: "Spotlight: Amplify Your Global Reach",
    excerpt:
      "Break outside your follower count and get discovered by thousands of new fans across the LuvlyFans network.",
    thumbnail: "/assets/promotions/spotlight4.png",
  },
  {
    slug: "stories-share-moment",
    title: "Stories: Share the Moment",
    excerpt:
      "Stay present between posts. Share short, temporary updates that give fans a more natural connection to your day.",
    thumbnail: "/assets/promotions/Stories.png",
  },
  {
    slug: "media-vault",
    title: "Media Vault",
    excerpt:
      "Creating content takes time. Managing it shouldn't. Media Vault keeps all your photos and videos in one place - ready to reuse, repost, and repurpose whenever you need.",
    thumbnail: "/assets/promotions/spotlight_Image.png",
  },
];

// ── Helper: find content by path ────────────────────────────────────────────
function findContent(pathname) {
  let match;

  match = pathname.match(/^\/article\/([^/]+)$/);
  if (match) {
    const item = ARTICLES.find((a) => a.slug === match[1]);
    if (item) return item;
  }

  match = pathname.match(/^\/events\/([^/]+)$/);
  if (match) {
    const item = EVENTS.find((e) => e.slug === match[1]);
    if (item) return item;
  }

  match = pathname.match(/^\/creator-voices\/([^/]+)$/);
  if (match) {
    const item = CREATOR_ARTICLES.find((c) => c.slug === match[1]);
    if (item) return item;
  }

  match = pathname.match(/^\/features\/([^/]+)$/);
  if (match) {
    const item = FEATURES.find((f) => f.slug === match[1]);
    if (item) return item;
  }

  return null;
}

// ── Build a full HTML page with correct OG tags ─────────────────────────────
function buildOgHtml(title, description, image, url) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} | LuvlyFans</title>
    <meta name="description" content="${description}" />

    <!-- Open Graph -->
    <meta property="og:title" content="${title} | LuvlyFans" />
    <meta property="og:description" content="${description}" />
    <meta property="og:image" content="${image}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:type" content="article" />
    <meta property="og:site_name" content="LuvlyFans Blog" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title} | LuvlyFans" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="${image}" />

    <!-- Redirect real users to the SPA -->
    <script>
      // Bots don't run JS, so only real users will be redirected
      window.location.href = "${url}";
    </script>
</head>
<body>
    <h1>${title}</h1>
    <p>${description}</p>
    <img src="${image}" alt="${title}" />
    <p><a href="${url}">Read more on LuvlyFans Blog</a></p>
</body>
</html>`;
}

// ── Main handler ────────────────────────────────────────────────────────────
export default async function handler(req) {
  const url = new URL(req.url);
  const pathname = url.pathname;
  const baseUrl = url.origin;

  const content = findContent(pathname);

  if (content) {
    const imageUrl = content.thumbnail
      ? `${baseUrl}${content.thumbnail}`
      : `${baseUrl}/og-image.png`;
    const pageUrl = `https://blog.luvlyfans.com${pathname}`;

    const html = buildOgHtml(content.title, content.excerpt, imageUrl, pageUrl);

    return new Response(html, {
      headers: {
        "content-type": "text/html;charset=UTF-8",
        "cache-control": "public, max-age=0, must-revalidate",
      },
    });
  }

  // Fallback: fetch and return the original index.html
  const htmlResponse = await fetch(`${baseUrl}/index.html`);
  const html = await htmlResponse.text();

  return new Response(html, {
    headers: {
      "content-type": "text/html;charset=UTF-8",
      "cache-control": "public, max-age=0, must-revalidate",
    },
  });
}
