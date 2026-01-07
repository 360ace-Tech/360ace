# Deployment Guide

This Next.js application is configured to work across multiple deployment platforms.

## Environment Variables

Required environment variables (add these to your deployment platform):

```env
# MailerSend
MAILERSEND_API_KEY=your_mailersend_api_key
CONTACT_EMAIL_FROM="360ace.NET <no-reply@360ace.net>"

# Cloudflare Turnstile
TURNSTILE_SECRET_KEY=your_turnstile_secret_key
NEXT_PUBLIC_TURNSTILE_SITE_KEY=your_turnstile_site_key

# Site URLs
NEXT_PUBLIC_SITE_URL=https://360ace.net
NEXT_PUBLIC_TECH_URL=https://360ace.tech
NEXT_PUBLIC_FOOD_URL=https://360ace.food
NEXT_PUBLIC_LINKEDIN_URL=https://www.linkedin.com/company/360ace/

# Security
CONTACT_ALLOWED_ORIGINS=https://360ace.net,https://www.360ace.net
CONTACT_REQUESTED_WITH=XMLHttpRequest

# Optional
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your_google_verification_code
```

---

## Cloudflare Pages

Cloudflare Pages has **native Next.js support** - it automatically detects and deploys Next.js apps with full SSR and API routes support. No wrangler configuration needed!

### Dashboard Deployment (Only Method)

1. **Connect Repository**
   - Go to [Cloudflare Pages Dashboard](https://dash.cloudflare.com/?to=/:account/pages)
   - Click **"Create a project"** → **"Connect to Git"**
   - Select your repository: `360ace-Tech/360ace`
   - Choose branch: `main`

2. **Build Configuration**
   - **Framework preset**: `Next.js` (auto-detected)
   - **Build command**: `npm run build`
   - **Build output directory**: `.next`
   - **Root directory**: `/` (leave empty)

3. **Environment Variables** (IMPORTANT!)
   Add these in the Cloudflare Pages settings:

   ```env
   NODE_VERSION=20
   MAILERSEND_API_KEY=your_mailersend_api_key
   TURNSTILE_SECRET_KEY=your_turnstile_secret_key
   NEXT_PUBLIC_TURNSTILE_SITE_KEY=your_turnstile_site_key
   NEXT_PUBLIC_SITE_URL=https://your-domain.pages.dev
   NEXT_PUBLIC_TECH_URL=https://360ace.tech
   NEXT_PUBLIC_FOOD_URL=https://360ace.food
   NEXT_PUBLIC_LINKEDIN_URL=https://www.linkedin.com/company/360ace/
   CONTACT_EMAIL_FROM="360ace.NET <no-reply@360ace.net>"
   CONTACT_ALLOWED_ORIGINS=https://your-domain.pages.dev,https://360ace.net
   CONTACT_REQUESTED_WITH=XMLHttpRequest
   ```

4. **Deploy**
   - Click **"Save and Deploy"**
   - Cloudflare will build and deploy automatically
   - Future commits to `main` branch will auto-deploy

### What Cloudflare Pages Provides:

- ✅ Full Next.js SSR support (no static export needed!)
- ✅ API Routes work automatically (`/api/contact`, `/api/health`)
- ✅ Edge runtime for fast global response times
- ✅ Automatic HTTPS with Cloudflare CDN
- ✅ Free SSL certificates
- ✅ DDoS protection built-in
- ✅ Unlimited bandwidth
- ✅ Preview deployments for PRs

### Important Notes:

- **DO NOT** use `wrangler.toml` - Cloudflare Pages auto-detects Next.js
- **DO NOT** run `wrangler deploy` - that's for Workers, not Pages
- **Deploy branch**: Use `main` (or your production branch)
- **Custom domains**: Add in Cloudflare Pages settings after first deploy
- **Build time**: ~2-3 minutes for first deploy

### Troubleshooting:

**Build fails with "Missing entry-point to Worker script"**:
- This means wrangler.toml exists in your repo
- Remove wrangler.toml and redeploy
- Cloudflare Pages doesn't need it for Next.js

**Environment variables not working**:
- Ensure all `NEXT_PUBLIC_*` variables are set
- Re-deploy after adding environment variables
- Check spelling matches .env.example exactly

---

## Vercel

1. **Import Project**
   - Go to [Vercel Dashboard](https://vercel.com/new)
   - Import your Git repository

2. **Configuration**
   - Framework Preset: `Next.js` (auto-detected)
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

3. **Environment Variables**
   - Add all required environment variables
   - Production variables will be used for production deployments
   - Preview variables for PR previews

4. **Deploy**
   - Click "Deploy"

---

## Docker / Dockploy

### Using Docker

1. **Build Docker Image**
   ```bash
   docker build -t 360ace-net .
   ```

2. **Run Container**
   ```bash
   docker run -p 3000:3000 \
     -e MAILERSEND_API_KEY=your_key \
     -e TURNSTILE_SECRET_KEY=your_key \
     -e NEXT_PUBLIC_TURNSTILE_SITE_KEY=your_key \
     -e NEXT_PUBLIC_SITE_URL=https://360ace.net \
     360ace-net
   ```

### Using Dockploy

1. **Connect Repository**
   - Add your Git repository in Dockploy

2. **Build Configuration**
   - Build command: `npm run build`
   - Start command: `npm start`
   - Port: `3000`

3. **Environment Variables**
   - Add all required environment variables in Dockploy settings

4. **Deploy**
   - Dockploy will build and deploy automatically

---

## Node.js (VPS/Bare Metal)

### Requirements
- Node.js 20.x or higher
- npm 10.x or higher

### Deployment Steps

1. **Clone Repository**
   ```bash
   git clone https://github.com/360ace-Tech/360ace.git
   cd 360ace
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Set Environment Variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your values
   ```

4. **Build**
   ```bash
   npm run build
   ```

5. **Start Production Server**
   ```bash
   npm start
   ```

6. **Use Process Manager (Recommended)**
   ```bash
   # Using PM2
   npm install -g pm2
   pm2 start npm --name "360ace-net" -- start
   pm2 save
   pm2 startup
   ```

---

## Troubleshooting

### Turnstile Captcha Not Working

1. Check CSP headers allow `https://challenges.cloudflare.com`
2. Verify `NEXT_PUBLIC_TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET_KEY` are set
3. Check browser console for `[Turnstile]` error messages
4. Ensure domain is added to Turnstile allowed domains

### Build Fails on Cloudflare

- Ensure Node.js version is set to 20 in environment variables: `NODE_VERSION=20`
- Check that all `NEXT_PUBLIC_*` environment variables are set
- Review build logs for specific errors

### Email Not Sending

- Verify `MAILERSEND_API_KEY` is valid
- Check `CONTACT_EMAIL_FROM` email is verified in MailerSend
- Ensure domain is configured in MailerSend settings

### SEO/Favicon Not Showing

- After deployment, submit sitemap to Google Search Console: `https://360ace.net/sitemap.xml`
- Request re-indexing for faster updates
- Favicons may take 24-48 hours to appear in search results

---

## Platform-Specific Notes

### Cloudflare Pages
- ✅ Full Next.js support (SSR, API routes, middleware)
- ✅ Automatic HTTPS and CDN
- ✅ Built-in DDoS protection
- ✅ Zero-configuration deployment

### Vercel
- ✅ Optimal Next.js performance
- ✅ Automatic preview deployments for PRs
- ✅ Edge functions support
- ✅ Analytics built-in

### Docker/Dockploy
- ✅ Full control over environment
- ✅ Can run on any cloud or VPS
- ✅ Easier to customize server configuration
- ⚠️ Requires manual scaling and load balancing

---

## Security Checklist

Before deploying to production:

- [ ] All environment variables are set securely
- [ ] `TURNSTILE_SECRET_KEY` is kept secret (never in client code)
- [ ] CSP headers are configured properly
- [ ] HTTPS is enabled
- [ ] Rate limiting is configured for contact form
- [ ] Security headers are verified (HSTS, X-Frame-Options, etc.)

---

## Support

For issues or questions:
- Check the [GitHub Issues](https://github.com/360ace-Tech/360ace/issues)
- Review deployment platform documentation
- Check browser console for client-side errors
- Review server logs for server-side errors
