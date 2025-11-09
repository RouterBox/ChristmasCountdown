# 🎅 Christmas Countdown - Complete Setup Guide

This guide will walk you through setting up and deploying your Christmas Countdown application.

## 📋 Prerequisites

1. **Node.js**: Version 18 or higher
   - Download from [nodejs.org](https://nodejs.org/)
   - Verify: `node --version`

2. **Git**: For version control
   - Download from [git-scm.com](https://git-scm.com/)
   - Verify: `git --version`

3. **Leonardo.ai Account** (Optional but recommended)
   - Sign up at [leonardo.ai](https://app.leonardo.ai/)
   - Get API key from Settings → API Access
   - Note: App works with emoji fallbacks if no API key provided

## 🚀 Local Setup

### Step 1: Install Dependencies

```bash
npm install
```

This will install:
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion (for animations)
- date-fns (for date calculations)

### Step 2: Configure Environment Variables

1. Copy the example environment file:
```bash
copy .env.example .env.local
```

2. Edit `.env.local` and add your Leonardo.ai API key:
```
LEONARDO_API_KEY=your_actual_api_key_here
```

**Note**: If you don't have a Leonardo.ai API key, the app will use fun emoji fallbacks! 🎄

### Step 3: Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser!

## 🎨 Testing the Application

### Admin Panel
- Click the **⚙️ gear icon** in the bottom-left corner
- Use "Add Elements Now" to immediately add 1-3 elements (for testing)
- Use "Clear All Elements" to reset the scene
- View debug info to see current state

### Features to Test
1. **Countdown Timer**: Should update every second
2. **Snowfall**: Beautiful falling snowflakes
3. **Scene Building**: Elements appear with animations
4. **Responsive Design**: Try different screen sizes
5. **Data Persistence**: Refresh page - elements should remain

## 🌐 Deploying to Vercel

### Option 1: Deploy via Vercel Dashboard (Easiest)

1. **Push to GitHub**:
```bash
git remote add origin https://github.com/YOUR_USERNAME/christmas-countdown.git
git push -u origin main
```

2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js settings

3. **Add Environment Variables**:
   - In project settings → Environment Variables
   - Add: `LEONARDO_API_KEY` = `your_api_key`
   - Select all environments (Production, Preview, Development)

4. **Deploy**: Click "Deploy" and wait ~2 minutes

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Add environment variable
vercel env add LEONARDO_API_KEY

# Deploy to production
vercel --prod
```

## 🖥️ Display Setup for 4K Monitor

### Recommended Settings

1. **Browser**: Chrome or Edge (best performance)
2. **Resolution**: 2160×3840 (portrait 4K)
3. **Fullscreen**: Press F11
4. **Zoom**: 100% (adjust if needed)

### Windows Display Settings

1. Right-click desktop → Display Settings
2. Set orientation to "Portrait"
3. Set resolution to 2160×3840
4. Set scale to 100%

### Prevent Screen Sleep

1. Settings → System → Power & Sleep
2. Set "Screen" to "Never"
3. Set "Sleep" to "Never" (while plugged in)

### Auto-Start on Boot (Optional)

Create a shortcut to your deployed Vercel URL:
1. Create `.bat` file with:
```batch
@echo off
start chrome --kiosk --app=https://your-app.vercel.app
```
2. Add to Windows Startup folder
   - Press `Win + R`, type `shell:startup`
   - Copy the `.bat` file there

## 🎁 Features Overview

### Countdown Timer
- Counts down to 8:00 AM on December 25th
- Updates every second
- Shows days, hours, minutes, seconds
- Displays special message when Christmas arrives

### Progressive Scene Building
- Automatically adds 1-3 elements per day
- Elements are saved to browser localStorage
- Survives page refreshes
- Builds up to Christmas Day

### Leonardo.ai Integration
- Generates unique Christmas images
- 12 different element types
- Optimized for child-friendly content
- Automatic fallback to emojis if API unavailable

### Animations
- Smooth spring physics
- Twinkling effects
- Gentle swaying motion
- Snowfall background

## 🛠️ Customization

### Change Christmas Time
Edit `components/CountdownTimer.tsx`:
```typescript
let christmas = new Date(currentYear, 11, 25, 8, 0, 0)
// Month is 0-indexed: 11 = December
// Day: 25
// Hour: 8 (8:00 AM)
```

### Adjust Elements Per Day
Edit `components/ChristmasScene.tsx`:
```typescript
const numElements = Math.floor(Math.random() * 3) + 1
// Random between 1-3 elements
// Change to fixed number: const numElements = 2
```

### Modify Colors
Edit `tailwind.config.ts`:
```typescript
colors: {
  christmas: {
    red: '#C41E3A',    // Christmas red
    green: '#0F6B3E',  // Christmas green
    gold: '#FFD700',   // Gold/yellow
    snow: '#FFFAFA',   // Snow white
  },
}
```

### Customize Leonardo.ai Prompts
Edit `lib/leonardo.ts` to modify image generation prompts for each element type.

## 🐛 Troubleshooting

### Issue: "Cannot find module errors"
**Solution**: Delete `node_modules` and reinstall
```bash
rm -rf node_modules
npm install
```

### Issue: Elements not appearing
**Solution**: 
1. Check browser console for errors (F12)
2. Verify Leonardo API key in `.env.local`
3. Clear localStorage via Admin Panel
4. Check that JavaScript is enabled

### Issue: Countdown shows wrong time
**Solution**: 
1. Verify system clock is correct
2. Check timezone settings
3. Ensure browser has permission to access time

### Issue: Snowflakes not animated
**Solution**: 
1. Check if hardware acceleration is enabled
2. Try a different browser
3. Reduce number of snowflakes in `components/Snowfall.tsx`

### Issue: Images not loading from Leonardo.ai
**Solution**:
1. Verify API key is correct
2. Check Leonardo.ai account has credits
3. Review `next.config.js` image domains
4. App will use emoji fallbacks automatically

## 📊 Performance Tips

### For Best Performance:
1. **Close other applications** to free up resources
2. **Enable hardware acceleration** in browser settings
3. **Use Chrome or Edge** for best WebGL support
4. **Keep browser updated** to latest version
5. **Disable browser extensions** that might interfere

### If Performance Issues:
1. Reduce number of snowflakes in `Snowfall.tsx`
2. Disable some animations in `ChristmasScene.tsx`
3. Lower image quality in Leonardo.ai settings
4. Use fewer elements per day

## 🎓 Understanding the Code Structure

```
ChristmasCountdown/
├── app/
│   ├── api/
│   │   └── generate-element/  # Leonardo.ai API endpoint
│   ├── layout.tsx             # Root layout
│   ├── page.tsx               # Main page
│   └── globals.css            # Global styles
├── components/
│   ├── CountdownTimer.tsx     # Timer display
│   ├── ChristmasScene.tsx     # Scene manager
│   ├── Snowfall.tsx           # Snow animation
│   └── AdminPanel.tsx         # Testing controls
├── lib/
│   └── leonardo.ts            # Leonardo.ai logic
├── public/                    # Static assets
└── package.json               # Dependencies
```

## 🎄 Daily Operation

### How It Works:
1. App checks localStorage for last update date
2. If date changed, adds 1-3 new elements
3. Elements are saved to localStorage
4. Scene progressively fills until Christmas

### Manual Testing:
1. Use Admin Panel to add elements immediately
2. Clear localStorage to reset scene
3. Change system date to test daily additions
4. Check browser console for debug info

## 📱 Mobile/Tablet Display

While optimized for 4K portrait monitors, the app works on other devices:
- **iPad/Tablet**: Great for personal viewing
- **Mobile**: Works but smaller countdown
- **TV**: Use browser app or casting

## 🎅 Tips for the 4-Year-Old Experience

1. **Start Early**: Begin a month before Christmas for best progression
2. **Morning Ritual**: Check the countdown each morning
3. **Participation**: Let them click "Add Elements" (via Admin Panel)
4. **Discussion**: Talk about each new element that appears
5. **Anticipation**: Count down the last 10 seconds together!

## 📞 Support & Resources

- **Next.js Docs**: [nextjs.org/docs](https://nextjs.org/docs)
- **Leonardo.ai Docs**: [docs.leonardo.ai](https://docs.leonardo.ai)
- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Framer Motion**: [framer.com/motion](https://www.framer.com/motion/)

## 🎁 Final Checklist

Before going live:
- [ ] Leonardo.ai API key configured
- [ ] Tested on target 4K monitor
- [ ] Verified countdown shows correct time
- [ ] Elements adding correctly
- [ ] Snowfall animation smooth
- [ ] Deployed to Vercel successfully
- [ ] Screen sleep disabled
- [ ] Bookmark/shortcut created
- [ ] Tested auto-refresh if needed

---

**Merry Christmas! 🎄🎅⭐**

Made with ❤️ for a very excited 4-year-old!

