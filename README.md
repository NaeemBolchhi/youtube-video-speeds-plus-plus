# YouTube Video Speeds++
Enhance your YouTube viewing experience with a sleek, native-feeling expanded playback speed controller integrated directly into the player bar. This script replaces the default speed menu with a fast, modern interface.

## ✨ Key Features
- Adds a dedicated speed button to the bottom player controls with a modern, transparent aesthetic.
- Presets available to switch between speeds from 0.25x up to 4.0x.
- GUI and Keyboard support for increments and decrements at a rate of 0.05x. No maximum limit.
- Original playback speed menu is hidden.

## ⌨️ Keyboard Shortcuts
- Ctrl + . (Period): Increase speed
- Ctrl + , (Comma): Decrease speed

## 🛠️ Build Tools
This project is built using WXT (Web Extension Toolbox), providing a modern development experience with Vite.
- **Framework:** WXT
- **Bundler:** Vite
- **Language:** TypeScript
- **Styling:** Vanilla CSS
- **Package Manager:** npm

## 🚀 Getting Started
### Installation
```Bash
npm install
```

### Development
To start the development server with hot-reloading (HMR) on Firefox:
```Bash
npm run dev:f
```

On Chrome:
```Bash
npm run dev:c
```

### Building for Production
WXT allows you to target specific browsers. The output will be located in the `.output/` directory. Change `run` to `zip` to build `.zip` files ready for submitting to stores.

- Firefox:
```Bash
npm run build:f
```

- Chrome:
```Bash
npm run build:c
```

## 📝 License
This project is licensed under AGPL-3.0.