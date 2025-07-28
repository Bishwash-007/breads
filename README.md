# 🥖 Breads Clone

This is a clone of the Threads app — think minimalist social vibes with power features.

## 🚀 Tech Stack

<div align="start" style="display: flex; justify-content: center; align-items: flex-start; gap: 2.5rem; margin: 40px 0;">
  <img src="./public/logos/tailwindcss.svg" alt="Tailwind CSS Logo" width="50" height="50">
  <img src="./public/logos/react.svg" alt="React Logo" width="50" height="50">
  <img src="./public/logos/expo.svg" alt="Expo Logo" width="50" height="50">
</div>

## 📱 Screenshots

<div align="center">
  <img src="./public/ui.png" alt="App UI Preview" width="80%"/>
</div>

## 🛠 Usage

1. Clone the repository
   ```zsh
   git clone https://github.com/Bishwash-007/breads.git
   cd breads
   ```

2. Install dependencies
   ```zsh
   npm install
   ```

3. Set Up Environment Variables `.env`
   ```.env
   CONVEX_DEPLOYMENT=

   EXPO_PUBLIC_CONVEX_URL=
   EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=
   EXPO_PUBLIC_SENTRY_DSN=
   SENTRY_AUTH_TOKEN=
   ```

4. Start the Convex server
   ```zsh
   npx convex dev
   ```

5. Start the app
   ```zsh
   npx expo start
   # or
   npm start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo
