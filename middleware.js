import { next } from '@vercel/edge';

export const config = {
  matcher: ['/article/:path*', '/events/:path*', '/creator-voices/:path*', '/features/:path*'],
};

export default function middleware(req) {
  const userAgent = req.headers.get('user-agent') || '';
  const bots = [
    'facebookexternalhit',
    'WhatsApp',
    'Twitterbot',
    'LinkedInBot',
    'Embedly',
    'quora link preview',
    'showyoubot',
    'outbrain',
    'pinterest/0.',
    'developers.google.com/+/web/snippet',
    'slackbot',
    'vkShare',
    'W3C_Validator',
    'redditbot',
    'Applebot',
    'TelegramBot',
    'Flipboard',
    'Googlebot',
    'Bingbot'
  ];

  const isBot = bots.some(bot => userAgent.includes(bot));

  if (isBot) {
    const url = new URL(req.url);
    const path = url.pathname;
    let type = '';
    let slug = '';

    if (path.startsWith('/article/')) {
      type = 'article';
      slug = path.replace('/article/', '');
    } else if (path.startsWith('/events/')) {
      type = 'event';
      slug = path.replace('/events/', '');
    } else if (path.startsWith('/creator-voices/')) {
      type = 'creator';
      slug = path.replace('/creator-voices/', '');
    } else if (path.startsWith('/features/')) {
      type = 'feature';
      slug = path.replace('/features/', '');
    }

    if (type && slug) {
      // Rewrite to the bot-meta API
      url.pathname = '/api/meta';
      url.searchParams.set('type', type);
      url.searchParams.set('slug', slug);
      url.searchParams.set('bot', 'true');
      return Response.rewrite(url);
    }
  }

  return next();
}
