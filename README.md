# 3Dog

A fun interactive 3D dog simulation built with Three.js. The dog performs various behaviors and responds to user interactions like petting and playing fetch.

## Features

- 3D animated Shiba Inu model
- Interactive behaviors (walking, sleeping, jumping, etc.)
- Pet and play interactions
- Dynamic mood display
- Realistic environment with trees and ground

## Prerequisites

- Node.js (version 14.0.0 or higher)
- A modern web browser with WebGL support

## Quick Start

1. Clone the repository:
```bash
git clone <your-repository-url>
cd 3dog
```

2. Install dependencies:
   You can use any of these package managers:
```bash
# Using npm
npm install

# Using yarn
yarn

# Using pnpm
pnpm install
```

3. Start the development server:
```bash
# Using npm
npm run dev

# Using yarn
yarn dev

# Using pnpm
pnpm dev
```

4. Open your browser and navigate to `http://localhost:3000`

## Deployment

### Option 1: Deploy to GitHub Pages

1. Update the `vite.config.js` file:
```javascript
export default {
  base: '/3dog/',  // Replace with your repository name
}
```

2. Build the project:
```bash
npm run build
```

3. Deploy to GitHub Pages:
```bash
npm run deploy
```

### Option 2: Deploy to Netlify

1. Push your code to GitHub

2. Connect your GitHub repository to Netlify:
   - Sign in to Netlify
   - Click "New site from Git"
   - Choose your repository
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Click "Deploy site"

### Option 3: Deploy to Vercel

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

## Project Structure

```
3dog/
├── index.html          # Main HTML file
├── main.js            # Main JavaScript file with Three.js setup
├── package.json       # Project dependencies
└── README.md          # This file
```

## Controls

- ✋ Button: Pet the dog
- ⚾ Button: Play fetch with the dog

## Browser Support

The application requires WebGL support and works best in modern browsers:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License - feel free to use this code for your own projects!

## Acknowledgments

- Three.js for the 3D graphics library
- The Three.js community for examples and inspiration 