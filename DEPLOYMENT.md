# Deployment Guide - Elite Fitness Pro

Complete guide to deploy your Elite Fitness Pro website to various platforms.

## Table of Contents

1. [Pre-Deployment Checklist](#pre-deployment-checklist)
2. [Build Optimization](#build-optimization)
3. [Vercel (Recommended)](#vercel-recommended)
4. [Netlify](#netlify)
5. [GitHub Pages](#github-pages)
6. [Traditional Web Hosting](#traditional-web-hosting)
7. [Docker Deployment](#docker-deployment)
8. [Environment Variables](#environment-variables)

## Pre-Deployment Checklist

Before deploying, ensure:

- [ ] Replace placeholder images with real gym images
- [ ] Update contact information and social media links
- [ ] Configure email service for contact form
- [ ] Set up analytics (Google Analytics, etc.)
- [ ] Test on multiple devices and browsers
- [ ] Run lighthouse audit (target >90)
- [ ] Optimize images (compress and format)
- [ ] Update meta tags and titles
- [ ] Set up error tracking (Sentry, LogRocket)
- [ ] Configure security headers
- [ ] Test form submissions
- [ ] Update WhatsApp number
- [ ] Set up 301 redirects if needed
- [ ] Create sitemap.xml
- [ ] Create robots.txt

## Build Optimization

### 1. Optimize Production Build

```bash
npm run build
```

This creates a `dist` folder with optimized files.

### 2. Analyze Bundle Size

```bash
npm install --save-dev rollup-plugin-visualizer

# Add to vite.config.ts:
import { visualizer } from 'rollup-plugin-visualizer';

export default {
  plugins: [
    react(),
    visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true,
    })
  ]
}
```

### 3. Performance Checklist

```bash
npm install --save-dev lighthouse

# Run:
npx lighthouse https://your-site.com --view
```

Target scores:
- Performance: >90
- Accessibility: >95
- Best Practices: >90
- SEO: >95

## Vercel (Recommended)

### Setup

1. **Install Vercel CLI**
```bash
npm install -g vercel
```

2. **Deploy**
```bash
vercel
```

3. **Connect Git (Optional but recommended)**
```bash
# Sign up at vercel.com
# Connect your GitHub account
# Import repository
# Vercel auto-deploys on push
```

### Configuration

Create `vercel.json`:
```json
{
  "framework": "vite",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "env": {
    "VITE_API_URL": "https://your-api.com"
  },
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" },
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" }
      ]
    }
  ]
}
```

### Environment Variables

1. Go to Vercel Dashboard → Settings → Environment Variables
2. Add your variables:
   - `VITE_API_URL`
   - `VITE_CONTACT_EMAIL`
   - etc.

3. Reference in code:
```typescript
const apiUrl = import.meta.env.VITE_API_URL
```

## Netlify

### Setup

1. **Install CLI**
```bash
npm install -g netlify-cli
```

2. **Deploy**
```bash
netlify deploy --prod --dir=dist
```

### Git Integration

1. Push code to GitHub/GitLab
2. Go to netlify.com → New site from Git
3. Select repository
4. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`

### Configuration

Create `netlify.toml`:
```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "18.0.0"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
```

### Form Handling

Netlify Forms work out of the box. Update contact form:

```tsx
<form name="contact" method="POST" netlify>
  <input type="text" name="name" required />
  <input type="email" name="email" required />
  {/* other fields */}
</form>
```

## GitHub Pages

### Setup

1. **Update vite.config.ts**
```typescript
export default defineConfig({
  base: '/repository-name/', // Replace with your repo name
  plugins: [react()],
})
```

2. **Add to package.json**
```json
{
  "scripts": {
    "deploy": "npm run build && gh-pages -d dist"
  },
  "devDependencies": {
    "gh-pages": "^5.0.0"
  }
}
```

3. **Deploy**
```bash
npm install
npm run deploy
```

4. **Configure GitHub**
   - Go to Settings → Pages
   - Source: Deploy from a branch
   - Branch: gh-pages
   - Folder: root

### Custom Domain

1. Go to Settings → Pages
2. Add custom domain
3. Update DNS records:
   ```
   CNAME: your-domain.com → username.github.io
   ```

## Traditional Web Hosting

### cPanel Hosting

1. **Build locally**
```bash
npm run build
```

2. **Upload files**
   - Connect via FTP
   - Upload contents of `dist` folder to `public_html`

3. **Configure .htaccess**
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

### AWS S3 + CloudFront

1. **Create S3 bucket**
```bash
aws s3 mb s3://your-fitness-site.com
```

2. **Upload build**
```bash
aws s3 sync dist/ s3://your-fitness-site.com --delete
```

3. **Create CloudFront distribution**
   - Origin: S3 bucket
   - Viewer policy: Redirect HTTP to HTTPS

4. **Configure S3 for SPA**
   - Static website hosting: Enable
   - Index document: index.html
   - Error document: index.html

## Docker Deployment

### Dockerfile

```dockerfile
# Build stage
FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine
RUN npm install -g serve
WORKDIR /app
COPY --from=builder /app/dist ./dist
EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]
```

### Docker Compose

```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    restart: always
```

### Build and Run

```bash
docker build -t fitness-site .
docker run -p 3000:3000 fitness-site
```

### Deploy to Docker Hub

```bash
docker tag fitness-site username/fitness-site:latest
docker push username/fitness-site:latest
```

## Environment Variables

Create `.env.local`:
```env
VITE_API_URL=https://api.example.com
VITE_CONTACT_EMAIL=info@example.com
VITE_GA_ID=UA-XXXXXXXXX-X
```

Access in code:
```typescript
const apiUrl = import.meta.env.VITE_API_URL
```

## Security Checklist

- [ ] Enable HTTPS/SSL certificate
- [ ] Set security headers
- [ ] Configure CORS properly
- [ ] Use environment variables for secrets
- [ ] Enable DDoS protection
- [ ] Set up monitoring and alerts
- [ ] Regular backups
- [ ] Keep dependencies updated
- [ ] Implement rate limiting
- [ ] Add authentication if needed

## Monitoring & Analytics

### Google Analytics 4

1. Create property at analytics.google.com
2. Get Measurement ID
3. Add to index.html:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Error Tracking (Sentry)

```typescript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "your-sentry-dsn",
  environment: process.env.NODE_ENV,
});
```

## Performance Monitoring

- Lighthouse Score
- Core Web Vitals
- PageSpeed Insights
- GTmetrix
- Uptime monitoring

## Troubleshooting

### White Screen of Death
- Check browser console for errors
- Verify base URL in vite.config.ts
- Clear browser cache
- Check build output

### 404 on Refresh
- Ensure SPA routing configured
- Check .htaccess or server config
- Verify index.html fallback

### Slow Performance
- Analyze bundle size
- Optimize images
- Enable compression
- Use CDN
- Check database queries

### CORS Issues
- Configure server headers
- Update API URLs
- Check proxy settings

## Getting Help

- Vercel Docs: https://vercel.com/docs
- Netlify Docs: https://docs.netlify.com
- Vite Docs: https://vitejs.dev
- React Docs: https://react.dev

---

**Last Updated**: August 2026
