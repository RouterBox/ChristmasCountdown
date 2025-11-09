# 🎄 Christmas Countdown

A magical, progressive Christmas countdown web app built for a 4-year-old! Watch as the scene fills with festive elements day by day until Christmas morning arrives.

![Christmas Countdown](https://img.shields.io/badge/Christmas-Magic-red?style=for-the-badge&logo=santa)

## ✨ Features

- **🕐 Real-time Countdown**: Days, hours, minutes, and seconds until 8:00 AM on Christmas morning
- **🎨 Progressive Scene Building**: Adds 1-3 new Christmas elements each day
- **❄️ Animated Snowfall**: Beautiful snowflakes falling continuously
- **🎅 Leonardo.ai Integration**: Generates unique Christmas-themed assets
- **📱 4K Portrait Display**: Optimized for full-screen portrait 4K monitors
- **💫 Smooth Animations**: Framer Motion powered animations

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- Leonardo.ai API key (get one at [leonardo.ai](https://app.leonardo.ai/settings))

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd ChristmasCountdown
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file and add your Leonardo.ai API key:
```bash
cp .env.local.example .env.local
# Edit .env.local and add your API key
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🎨 How It Works

### Countdown Timer
The app calculates time remaining until 8:00 AM on December 25th and updates every second with a beautiful animated display.

### Progressive Scene Building
- Each day, 1-3 new Christmas elements are added to the scene
- Elements are positioned randomly and animated with spring physics
- Progress is saved to localStorage
- Elements twinkle and gently sway for a magical effect

### Leonardo.ai Integration
- Generates high-quality Christmas-themed images on demand
- 12 different element types: trees, Santa, snowmen, reindeer, gifts, and more
- Optimized prompts for child-friendly, colorful illustrations

## 🌐 Deployment to Vercel

1. Push your code to GitHub:
```bash
git init
git add .
git commit -m "Initial commit: Christmas Countdown"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

2. Deploy to Vercel:
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add your `LEONARDO_API_KEY` environment variable in project settings
   - Deploy!

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **AI Images**: Leonardo.ai API
- **Deployment**: Vercel

## 📐 Display Recommendations

For the best experience displaying on a 4K portrait monitor:

1. Set browser to fullscreen mode (F11)
2. Use portrait orientation (2160x3840)
3. Ensure hardware acceleration is enabled
4. Disable screen sleep/screensaver

## 🎅 Customization

### Adjust Christmas Target Time
Edit `components/CountdownTimer.tsx`:
```typescript
let christmas = new Date(currentYear, 11, 25, 8, 0, 0)
//                                    ^month ^day ^hour
```

### Change Elements Per Day
Edit `components/ChristmasScene.tsx`:
```typescript
const numElements = Math.floor(Math.random() * 3) + 1
//                                             ^max    ^min
```

### Customize Leonardo.ai Prompts
Edit `lib/leonardo.ts` to modify image generation prompts.

## 🐛 Troubleshooting

### Elements not appearing?
- Check browser console for errors
- Verify Leonardo.ai API key is set correctly
- Check localStorage isn't disabled

### Countdown not updating?
- Ensure JavaScript is enabled
- Check system time is correct

## 📝 License

MIT License - feel free to use this for your own Christmas magic!

## 🎁 Contributing

This is a personal project for a 4-year-old's Christmas joy, but feel free to fork and create your own version!

---

Made with ❤️ and Christmas spirit 🎄✨

