export const config = {
  runtime: 'edge',
};

const ARTICLES = [
  {
    slug: "sustainable-monthly-income",
    title: "How Creators Build Sustainable Monthly Income",
    excerpt: "Virality opens the door, but sustainability keeps it open. Learn the balance between capitalizing on attention and building a reliable base.",
    thumbnail: "/assets/homepage/creating sustainable income.jpg"
  },
  {
    slug: "pricing-strategy",
    title: "A Pricing Strategy That Supports Consistent Subscription Income",
    excerpt: "Stop guessing. Pricing isn't just about maximizing short-term spikes. Learn how to build a structure that feels sustainable and fair for the long run.",
    thumbnail: "/assets/homepage/pricing-plan.jpg"
  },
  {
    slug: "get-subscribers",
    title: "Get Your First Subscribers Without Buying Ads",
    excerpt: "Most creators think they need a budget to start. They don't. Learn how to leverage your existing presence and platform tools to build your first base organically.",
    thumbnail: "/assets/homepage/get subscribers.jpg"
  },
  {
    slug: "building-consistent-monthly-income",
    title: "Building Consistent Monthly Income as a Creator",
    excerpt: "Stability comes from what you do repeatedly. Learn how to build a predictable income stream that doesn't rely on luck.",
    thumbnail: "/assets/homepage/building-income.jpg"
  },
  {
    slug: "content-ideas-that-sell",
    title: "Content Ideas That Actually Sell",
    excerpt: "Content that converts doesn't have to be complicated. Learn what types of content drive real revenue.",
    thumbnail: "/assets/homepage/content-ideas.jpg"
  },
  {
    slug: "promote-your-profile",
    title: "How to Promote Your LuvlyFans Profile",
    excerpt: "Promotion works best when it's simple, consistent, and clear. Learn the best practices for social media, Reddit, and collaborations.",
    thumbnail: "/assets/homepage/promotion.jpg"
  },
  {
    slug: "build-your-fanbase",
    title: "How to Build Your Fanbase on LuvlyFans",
    excerpt: "Building a fanbase takes time. Learn the proven strategies that help creators grow steadily and sustainably.",
    thumbnail: "/assets/homepage/fanbase.jpg"
  },
  {
    slug: "creator-habits",
    title: "Daily Habits of Successful Creators",
    excerpt: "Success isn't about one big win. It's about what you do every day. Learn the habits that separate growing creators from stalled ones.",
    thumbnail: "/assets/homepage/habits.jpg"
  },
  {
    slug: "luvlyfans-standard",
    title: "The LuvlyFans Standard",
    excerpt: "What makes LuvlyFans different? Learn about our creator-first approach and why it matters for your growth.",
    thumbnail: "/assets/homepage/standard.jpg"
  },
  {
    slug: "setup-first-impressions",
    title: "Setup & First Impressions",
    excerpt: "Your profile is your storefront. Learn how to make a strong first impression that converts visitors into subscribers.",
    thumbnail: "/assets/homepage/first-impressions.jpg"
  },
  {
    slug: "content-direction",
    title: "Finding Your Content Direction",
    excerpt: "Not sure what to post? Learn how to find a content direction that feels authentic and attracts the right audience.",
    thumbnail: "/assets/homepage/direction.jpg"
  },
  {
    slug: "first-30-days",
    title: "Your First 30 Days on LuvlyFans",
    excerpt: "The first month sets the foundation. Learn exactly what to do in your first 30 days to set yourself up for success.",
    thumbnail: "/assets/homepage/30-days.jpg"
  },
  {
    slug: "pricing-content",
    title: "How to Price Your Content",
    excerpt: "Pricing is about more than numbers. Learn how to price your content in a way that feels fair and maximizes your earning potential.",
    thumbnail: "/assets/homepage/pricing-content.jpg"
  }
];

export default async function handler(req) {
  const url = new URL(req.url);
  const pathname = url.pathname;

  // Check if it's an article URL
  const articleMatch = pathname.match(/^\/article\/([^/]+)$/);
  
  if (articleMatch) {
    const slug = articleMatch[1];
    const article = ARTICLES.find(a => a.slug === slug);
    
    if (article) {
      // Fetch the base HTML
      const baseUrl = url.origin;
      const htmlResponse = await fetch(`${baseUrl}/index.html`);
      let html = await htmlResponse.text();
      
      // Replace meta tags
      html = html.replace(
        /<meta property="og:title" content="[^"]*">/,
        `<meta property="og:title" content="${article.title} | LuvlyFans">`
      );
      html = html.replace(
        /<meta property="og:description" content="[^"]*">/,
        `<meta property="og:description" content="${article.excerpt}">`
      );
      html = html.replace(
        /<meta property="og:image" content="[^"]*">/,
        `<meta property="og:image" content="${baseUrl}${article.thumbnail}">`
      );
      html = html.replace(
        /<meta name="twitter:title" content="[^"]*">/,
        `<meta name="twitter:title" content="${article.title} | LuvlyFans">`
      );
      html = html.replace(
        /<meta name="twitter:description" content="[^"]*">/,
        `<meta name="twitter:description" content="${article.excerpt}">`
      );
      html = html.replace(
        /<meta name="twitter:image" content="[^"]*">/,
        `<meta name="twitter:image" content="${baseUrl}${article.thumbnail}">`
      );
      html = html.replace(
        /<title>[^<]*<\/title>/,
        `<title>${article.title} | LuvlyFans</title>`
      );
      
      return new Response(html, {
        headers: {
          'content-type': 'text/html;charset=UTF-8',
          'cache-control': 'public, max-age=0, must-revalidate'
        }
      });
    }
  }
  
  // For all other routes, return null to continue to static files
  return null;
}
