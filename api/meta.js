import { ARTICLES, EVENTS, FEATURES, CREATOR_ARTICLES } from './_data.js';

export default async function handler(req, res) {
  const { type, slug, bot } = req.query;
  const url = req.url || '/';

  let title = "LuvlyFans Blog — Creator Education & Growth";
  let description = "The creator hub built by creators for creators. Learn strategies, case studies, and playbooks to help you earn more.";
  let image = "/og-image.png";

  if (type === 'article' && slug) {
    const article = ARTICLES.find(a => a.slug === slug);
    if (article) {
      title = article.title;
      description = article.excerpt;
      image = article.thumbnail;
    }
  } else if (type === 'event' && slug) {
    const event = EVENTS.find(e => e.slug === slug);
    if (event) {
      title = event.title;
      description = event.excerpt;
      image = event.thumbnail;
    }
  } else if (type === 'creator' && slug) {
    const creator = CREATOR_ARTICLES.find(c => c.slug === slug);
    if (creator) {
      title = creator.title;
      description = creator.excerpt;
      image = creator.thumbnail;
    }
  } else if (type === 'feature' && slug) {
    const feature = FEATURES.find(f => f.slug === slug);
    if (feature) {
      title = feature.title;
      description = feature.excerpt;
      image = feature.thumbnail;
    }
  }

  // Ensure absolute image URL
  if (image && !image.startsWith('http')) {
    const host = req.headers.host || 'blog.luvlyfans.com';
    const protocol = host.includes('localhost') ? 'http' : 'https';
    image = `${protocol}://${host}${image.startsWith('/') ? '' : '/'}${image}`;
  }

  // If it's a bot request from middleware, return minimal HTML with tags
  if (bot === 'true') {
    const botHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>${title}</title>
    <meta name="description" content="${description}" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:image" content="${image}" />
    <meta property="og:url" content="https://blog.luvlyfans.com${url}" />
    <meta property="og:type" content="article" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="${image}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
</head>
<body>
    <h1>${title}</h1>
    <p>${description}</p>
    <img src="${image}" alt="${title}" />
</body>
</html>`;
    res.setHeader('Content-Type', 'text/html');
    return res.status(200).send(botHtml);
  }

  // For real users, we don't want them hitting this API directly
  res.status(404).send('Not Found');
}
