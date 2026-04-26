# Article CSS Structure

This folder contains individual CSS files for each article in the blog. Each article has its own stylesheet for custom styling.

## Files Structure

```
src/articles/
├── sustainable-monthly-income.jsx
├── sustainable-monthly-income.css
├── pricing-strategy.jsx
├── pricing-strategy.css
├── get-subscribers.jsx
├── get-subscribers.css
├── building-consistent-monthly-income.jsx
├── building-consistent-monthly-income.css
├── content-ideas-that-sell.jsx
├── content-ideas-that-sell.css
├── promote-your-profile.jsx
├── promote-your-profile.css
├── build-your-fanbase.jsx
├── build-your-fanbase.css
├── creator-habits.jsx
├── creator-habits.css
├── luvlyfans-standard.jsx
├── luvlyfans-standard.css
├── setup-first-impressions.jsx
├── setup-first-impressions.css
├── content-direction.jsx
├── content-direction.css
├── first-30-days.jsx
├── first-30-days.css
├── pricing-content.jsx
└── pricing-content.css
```

## How to Use

Each article component imports its corresponding CSS file:

```jsx
import React from "react";
import "./article-name.css";

export default function ArticleName() {
  return <div className="article-unique-class">{/* Article content */}</div>;
}
```

## CSS Classes

Each article has a unique wrapper class:

- `.article-sustainable-monthly-income` - Sustainable Monthly Income article
- `.article-pricing-strategy` - Pricing Strategy article
- `.article-get-subscribers` - Get Subscribers article
- `.article-building-consistent` - Building Consistent Income article
- `.article-content-ideas` - Content Ideas article
- `.article-promote-profile` - Promote Profile article
- `.article-build-fanbase` - Build Fanbase article
- `.article-creator-habits` - Creator Habits article
- `.article-luvlyfans-standard` - LuvlyFans Standard article
- `.article-setup-first-impressions` - Setup First Impressions article
- `.article-content-direction` - Content Direction article
- `.article-first-30-days` - First 30 Days article
- `.article-pricing-content` - Pricing Content article

## Common Styles

All article CSS files include common element styles:

- `h2` - Section headings with primary color
- `ul` / `li` - List styling
- `blockquote` - Quote styling with purple accent border (where applicable)

## Customization

To customize an article's appearance:

1. Open the corresponding CSS file (e.g., `sustainable-monthly-income.css`)
2. Add or modify styles within the article's unique class selector
3. Styles are scoped to that specific article

Example:

```css
.article-sustainable-monthly-income {
  /* Custom container styles */
}

.article-sustainable-monthly-income h2 {
  color: var(--primary);
  margin-top: 40px;
  font-size: 28px; /* Custom size */
}

.article-sustainable-monthly-income .custom-section {
  background: rgba(123, 81, 204, 0.05);
  padding: 24px;
  border-radius: 12px;
}
```

## Global Variables

The CSS files use CSS custom properties (variables) from the main stylesheet:

- `var(--primary)` - Primary brand color (#7B51CC)
- `var(--text-heading)` - Heading text color
- `var(--text-body)` - Body text color
- `var(--bg-surface)` - Surface background color
- `var(--border)` - Border color

These variables automatically adapt to dark/light mode.

## Adding a New Article

When creating a new article:

1. Create the JSX file: `src/articles/new-article.jsx`
2. Create the CSS file: `src/articles/new-article.css`
3. Import the CSS in the JSX file
4. Use a unique className for the wrapper div
5. Add article-specific styles in the CSS file
