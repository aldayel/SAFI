# SAFI Demo - Dynamic Node.js/Express Website

This project is a dynamic web application built with Node.js and Express, featuring a modern frontend inspired by Anthropic/Geist design principles. It allows users to upload audio files, which are then processed by a (simulated or actual) backend service to "clean" the audio.

## Project Structure

-   `server.js`: The main Node.js Express server file that handles API requests (like audio uploading and processing) and serves static frontend files.
-   `package.json`: Lists project dependencies (Express, Multer for file uploads, CORS) and scripts (like `npm start`).
-   `public/`: This directory contains all the static frontend assets:
    -   `index.html`: The main HTML structure of the application.
    -   `script.js`: Frontend JavaScript for handling user interactions, file uploads, WaveSurfer.js integration, and communication with the backend.
    -   `style.css`: Minimal global styles; most styling is done via Tailwind CSS (CDN) and inline styles in `index.html`.
    -   `logo.png`: The SAFI application logo.
-   `README.md`: This file, providing deployment instructions.

## Deployment to Vercel/Netlify via Your GitHub Account

Follow these steps to deploy this application publicly using your GitHub account (e.g., `aldayel`) and a platform like Vercel or Netlify.

### Step 1: Create a New Repository on GitHub

1.  Go to your GitHub account: [https://github.com/aldayel](https://github.com/aldayel) (or your main GitHub page).
2.  Click on the "New" button to create a new repository.
3.  Choose a repository name (e.g., `safi-audio-demo`).
4.  You can add a description if you like.
5.  Choose whether to make it Public or Private.
6.  **Do not** initialize the repository with a README, .gitignore, or license at this stage, as you will be pushing existing files.
7.  Click "Create repository".

### Step 2: Push Project Files to Your New GitHub Repository

1.  Unzip the project files provided to you (this ZIP file) into a local folder on your computer.
2.  Open a terminal or command prompt and navigate into the root of this unzipped project folder (the one containing `server.js`, `package.json`, etc.).
3.  Initialize a new Git repository locally:
    ```bash
    git init -b main
    ```
4.  Add all the project files to the staging area:
    ```bash
    git add .
    ```
5.  Commit the files:
    ```bash
    git commit -m "Initial commit of SAFI audio demo project"
    ```
6.  Add your new GitHub repository as the remote origin. Replace `<YOUR_GITHUB_USERNAME>` and `<YOUR_REPOSITORY_NAME>` with your actual GitHub username and the repository name you chose in Step 1 (e.g., `aldayel/safi-audio-demo`):
    ```bash
    git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/<YOUR_REPOSITORY_NAME>.git
    ```
    For example:
    ```bash
    git remote add origin https://github.com/aldayel/safi-audio-demo.git
    ```
7.  Push the files to your GitHub repository:
    ```bash
    git push -u origin main
    ```

Your project files are now on GitHub.

### Step 3: Deploy to Vercel or Netlify

Choose either Vercel or Netlify for deployment.

**For Vercel:**

1.  Go to [Vercel](https://vercel.com) and sign up or log in (you can use your GitHub account).
2.  From your Vercel dashboard, click "Add New..." -> "Project".
3.  Under "Import Git Repository," select your GitHub account and then choose the repository you just created (e.g., `safi-audio-demo`). Click "Import".
4.  Vercel will usually auto-detect that it's a Node.js/Express project.
    *   **Framework Preset:** Should be detected as "Other" or it might suggest Node.js.
    *   **Build and Output Settings:**
        *   **Build Command:** You might need to override this. If Vercel tries to build something, you can set it to `npm install` or leave it if it correctly identifies it as a Node.js app that doesn't need a separate frontend build step.
        *   **Output Directory:** Usually not needed for Express apps serving their own static files.
        *   **Install Command:** `npm install` (this should be default).
    *   **Root Directory:** Should be the root of your project.
5.  **Environment Variables (if any):** This project doesn't require specific environment variables for basic operation, but if you extend it later, you can add them here.
6.  Click "Deploy". Vercel will build (install dependencies) and deploy your application.
7.  Once deployed, Vercel will provide you with a public URL (e.g., `safi-audio-demo-username.vercel.app`).

**For Netlify:**

1.  Go to [Netlify](https://www.netlify.com) and sign up or log in (you can use your GitHub account).
2.  From your Netlify dashboard, click "Add new site" -> "Import an existing project".
3.  Connect to your Git provider (GitHub) and authorize Netlify.
4.  Select the repository you created (e.g., `safi-audio-demo`).
5.  Netlify will try to detect settings:
    *   **Branch to deploy:** `main` (or your default branch).
    *   **Build command:** `npm install` (or leave blank if it correctly infers no separate build is needed for the frontend).
    *   **Publish directory:** Not strictly needed as Express serves from `public`. If Netlify requires one for a Node.js backend, this setting might be less relevant than the start command.
    *   **Functions directory (if applicable):** Not used in this project setup.
6.  You might need to ensure Netlify knows how to run your Node.js server. Netlify typically looks for a `netlify.toml` or can be configured via the UI. The key is that `npm start` (which runs `node server.js`) should be executed.
    *   If Netlify doesn't automatically set up the start command, you might need to create a `netlify.toml` file in your project root with:
        ```toml
        [build]
          command = "npm install"
          publish = "public" # Or leave if server handles all
        [dev] # For local dev, not directly for deployment
          command = "npm start"
        ```
        Alternatively, ensure your `package.json`'s `start` script is `node server.js`.
7.  Click "Deploy site". Netlify will install dependencies and deploy your application.
8.  Once deployed, Netlify will provide you with a public URL (e.g., `your-project-name.netlify.app`).

### Important Notes:

*   **Server Port:** The `server.js` is configured to listen on `process.env.PORT || 3000`. Hosting platforms like Vercel and Netlify will set the `PORT` environment variable automatically, so your server will listen on the correct port.
*   **CORS:** The `server.js` includes `cors()` middleware, which is generally good for allowing frontend access if it were on a different domain, though in this setup (Express serving its own frontend), it might not be strictly necessary but doesn't hurt.

Your SAFI audio demo application should now be live and publicly accessible!
