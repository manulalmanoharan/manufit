# 🚀 Quick Start Guide - Elite Fitness Pro

Your premium gym trainer website is ready! Follow these simple steps to get started.

## 1️⃣ Installation

```bash
# Navigate to project folder
cd c:\Users\DELL\Desktop\manufit

# Install dependencies
npm install

# Start development server
npm run dev
```

Your site will open at `http://localhost:5173`

## 2️⃣ First Time Setup

### A. Update Personal Information

Edit these files with your details:

**`src/components/Navbar.tsx`** (Lines 30-35)
```typescript
const navItems = [
  { label: 'Home', to: 'home' },
  // Update these navigation items
]
```

**`src/components/sections/Contact.tsx`** (Lines 20-22)
```typescript
const contactInfo = [
  { label: 'Phone', value: '+1 (555) 123-4567', href: 'tel:+15551234567' },
  { label: 'Email', value: 'info@elitefitnespro.com', href: 'mailto:info@elitefitnespro.com' },
  // Replace with YOUR contact info
]
```

**`src/components/Footer.tsx`** (Lines 57-60)
```typescript
const contactInfo = [
  { icon: MdPhone, label: '+1 (555) 123-4567', href: 'tel:+15551234567' },
  // Update contact information
]
```

### B. Replace Images

Current images are placeholders from Unsplash. Replace them:

1. **Hero Section** - `src/components/sections/Hero.tsx`
   ```typescript
   <img src="YOUR_IMAGE_URL" alt="Fitness trainer" />
   ```

2. **About Section** - `src/components/sections/About.tsx`
   ```typescript
   <img src="YOUR_IMAGE_URL" alt="Professional fitness trainer" />
   ```

3. **Gallery** - `src/components/sections/Gallery.tsx`
   ```typescript
   const galleryImages = [
     { image: 'YOUR_IMAGE_URL', ... }
   ]
   ```

4. **Testimonials** - `src/components/sections/Testimonials.tsx`
   ```typescript
   const testimonials = [
     { image: 'YOUR_IMAGE_URL', ... }
   ]
   ```

### C. Update Brand Colors (Optional)

Edit `tailwind.config.js` to customize colors:

```javascript
colors: {
  primary: {
    500: '#f97316',  // Orange (change this)
    600: '#ea580c',
    // ...
  },
  secondary: {
    500: '#ef4444',  // Red (change this)
    600: '#dc2626',
    // ...
  },
  accent: '#00ff88',  // Neon green (change this)
}
```

## 3️⃣ Customize Content

### Hero Section
File: `src/components/sections/Hero.tsx`
```typescript
<h1>Transform Your Body. Transform Your Life.</h1>
<p>Your personalized subheadline here...</p>
<CountUp end={500} label="Clients Trained" />
```

### Services Section
File: `src/components/sections/Services.tsx`
- Add/remove service cards
- Update descriptions
- Change icons using react-icons

### Pricing Programs
File: `src/components/sections/Programs.tsx`
- Update prices
- Modify features list
- Add/remove plans

### FAQ
File: `src/components/sections/FAQ.tsx`
```typescript
const faqs = [
  {
    question: 'Your question?',
    answer: 'Your answer here...'
  }
]
```

### Testimonials
File: `src/components/sections/Testimonials.tsx`
```typescript
const testimonials = [
  {
    name: 'Client Name',
    text: 'Their testimonial here...'
  }
]
```

## 4️⃣ Setup Contact Form

Currently, the form logs to console. To enable email:

### Option A: EmailJS (Recommended - No Backend Needed)

1. Sign up at [emailjs.com](https://emailjs.com)
2. Get your Service ID and Template ID
3. Update `src/components/sections/Contact.tsx`:

```typescript
import emailjs from '@emailjs/browser';

emailjs.init('YOUR_PUBLIC_KEY');

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  await emailjs.send('SERVICE_ID', 'TEMPLATE_ID', formData);
  setSubmitted(true);
};
```

### Option B: Backend Service

Connect to your backend API:
```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  const response = await fetch('https://your-api.com/contact', {
    method: 'POST',
    body: JSON.stringify(formData),
  });
  if (response.ok) setSubmitted(true);
};
```

### Option C: Netlify Forms

Add `netlify` attribute to form:
```typescript
<form netlify name="contact">
  {/* form fields */}
</form>
```

## 5️⃣ Update WhatsApp Button

File: `src/components/FloatingWhatsApp.tsx`

```typescript
const phoneNumber = '+1 (555) 123-4567'
const message = 'Hi! I would like to book a free consultation.'
const whatsappURL = `https://wa.me/YOUR_PHONE_NUMBER_WITHOUT_PLUS?text=${encodeURIComponent(message)}`
```

## 6️⃣ SEO Setup

### Meta Tags
Edit `index.html`:
```html
<meta name="description" content="Your site description">
<meta name="keywords" content="personal training, fitness coaching, gym">
```

### Google Analytics
Add to `index.html`:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Sitemap & Robots.txt
Create `public/sitemap.xml`:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://your-domain.com</loc>
    <priority>1.0</priority>
  </url>
</urlset>
```

Create `public/robots.txt`:
```
User-agent: *
Allow: /
Sitemap: https://your-domain.com/sitemap.xml
```

## 7️⃣ Build for Production

```bash
# Build optimized version
npm run build

# Preview production build
npm run preview

# This creates 'dist' folder ready for deployment
```

## 8️⃣ Deploy Your Site

### Quick Deploy to Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

Or use Netlify:
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

## 🎨 Customization Tips

### Change Font
Edit `tailwind.config.js`:
```javascript
fontFamily: {
  sans: ['Your Font', 'sans-serif'],
  display: ['Your Display Font', 'sans-serif'],
}
```

### Modify Animations
Edit `tailwind.config.js`:
```javascript
animation: {
  'float': 'float 6s ease-in-out infinite',
  // Add custom animations
}
```

### Add New Section

1. Create new file: `src/components/sections/NewSection.tsx`
2. Import in `App.tsx`: `import NewSection from './components/sections/NewSection'`
3. Add to JSX: `<NewSection />`

## 🐛 Troubleshooting

### Dependencies not installing?
```bash
rm -rf node_modules package-lock.json
npm install
```

### Port 5173 already in use?
```bash
npm run dev -- --port 3000
```

### CSS not working?
```bash
npm run dev
# Clear browser cache (Ctrl+Shift+Delete)
```

### Build fails?
```bash
npm run lint  # Check for errors
npm run build  # See full error
```

## 📱 Testing

1. **Desktop**: Open `http://localhost:5173`
2. **Mobile**: Use DevTools (F12 → Toggle device toolbar)
3. **Production**: Use Lighthouse
   ```bash
   npm install -g lighthouse
   lighthouse http://localhost:5173
   ```

## 📚 Learn More

- [Vite Docs](https://vitejs.dev)
- [React Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion)
- [React Icons](https://react-icons.github.io/react-icons)

## 🆘 Need Help?

Common tasks:

**Change a section header color?**
Look for `<span className="gradient-text">` and update the gradient in tailwind.config.js

**Add a new button?**
```typescript
<motion.button
  className="px-6 py-3 bg-primary-500 text-white rounded-lg"
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  Click Me
</motion.button>
```

**Remove a section?**
Comment out the import and JSX in `App.tsx`

**Change navigation menu?**
Edit the `navItems` array in `Navbar.tsx`

## ✨ Next Steps

1. ✅ Install dependencies
2. ✅ Customize content
3. ✅ Replace images
4. ✅ Setup contact form
5. ✅ Test locally
6. ✅ Build for production
7. ✅ Deploy to hosting
8. ✅ Monitor performance

---

**Your premium gym website is ready to transform bodies and minds!** 💪

For questions, refer to README.md and DEPLOYMENT.md
