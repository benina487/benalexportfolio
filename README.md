# Benina A — AI & ML Engineer Portfolio

This is the complete source code for Benina's portfolio website.

## Run it in Visual Studio Code

1. Install [Node.js 20 or newer](https://nodejs.org/) and Visual Studio Code.
2. Extract the downloaded ZIP file.
3. In Visual Studio Code, choose **File → Open Folder** and open the extracted `Benina_AI_ML_Engineer_Portfolio` folder (the one containing `package.json`).
4. Open **Terminal → New Terminal** and copy the example settings into a local settings file:

   **Windows PowerShell:**

   ```powershell
   Copy-Item .env.example .env
   ```

   **macOS or Linux:**

   ```sh
   cp .env.example .env
   ```

5. Install the website packages:

   ```sh
   npm ci
   ```

6. Start the website:

   ```sh
   npm run dev
   ```

7. Open the `http://localhost:8080` address printed in the terminal. Keep the terminal open while using the local website.

Do not open `index.html` by double-clicking it; the website must be started with `npm run dev`.

## Connected features

The AI chat, contact form, project list, and admin area use Benina's online Lovable Cloud services and need an internet connection. The chatbot includes a built-in fallback when its AI service is unavailable. Admin sign-in requires an existing authorized account; no password is included in this download.

The `.env.example` file contains only the public client connection settings needed to run this portfolio. Never put private passwords or service-role keys in browser code.

## Other commands

```sh
npm run build  # Create an optimized website in dist/
npm test       # Run the project's tests
```
