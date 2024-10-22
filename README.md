<div align="center">
  <img src="./public/logo.svg" alt="logo" width="200" height="auto" />
  <h1>Magic Note - Write Smart, Edit Smarter with AI.</h1>
  
  <p>
    A platform that helps users effortlessly create, organize, and enhance your notes with a rich text editor, smart labels, and AI assistance.
  </p>
  
  
<!-- Badges -->
<p>
  <a href="https://github.com/dagim-mante/Magic-Notes---AI-Based-Notes-Editor/contributors">
    <img src="https://img.shields.io/github/contributors/dagim-mante/Magic-Notes---AI-Based-Notes-Editor" alt="contributors" />
  </a>
  <a href="">
    <img src="https://img.shields.io/github/last-commit/dagim-mante/Magic-Notes---AI-Based-Notes-Editor" alt="Last Update" />
  </a>
  <a href="https://github.com/dagim-mante/Magic-Notes---AI-Based-Notes-Editor/stargazers">
    <img src="https://img.shields.io/github/stars/dagim-mante/Magic-Notes---AI-Based-Notes-Editor" alt="stars" />
  </a>
  <a href="https://github.com/dagim-mante/Magic-Notes---AI-Based-Notes-Editor/blob/master/LICENSE">
    <img src="https://img.shields.io/github/license/dagim-mante/Magic-Notes---AI-Based-Notes-Editor.svg" alt="license" />
  </a>
</p>

<h4>
    <a href="https://magic-notes-gray.vercel.app/">View Live Website</a>
  </h4>
</div>

<br />

<!-- Table of Contents -->
# :notebook_with_decorative_cover: Table of Contents

- [:notebook\_with\_decorative\_cover: Table of Contents](#notebook_with_decorative_cover-table-of-contents)
  - [:star2: About the Project](#star2-about-the-project)
    - [:camera: Screenshots](#camera-screenshots)
    - [:space\_invader: Tech Stack](#space_invader-tech-stack)
    - [:dart: Features](#dart-features)
    - [:key: Environment Variables](#key-environment-variables)
  - [:toolbox: Getting Started](#toolbox-getting-started)
    - [:bangbang: Prerequisites](#bangbang-prerequisites)
    - [:running: Run Locally](#running-run-locally)
  - [:wave: Contributing](#wave-contributing)
  - [:warning: License](#warning-license)
  - [:handshake: Contact](#handshake-contact)

  

<!-- About the Project -->
## :star2: About the Project
<p>
    Magic Notes is a note editor that allows users to create, edit and organize their notes. It has a built in AI Assistant to help with note creation and editing.
</p>

<!-- Screenshots -->
### :camera: Screenshots


  <div align="center">
    <div style="display: flex; flex-wrap: wrap; justify-content: center;">
      <div style="flex: 1 1 300px; margin: 10px;">
        <img src="https://utfs.io/f/ez2eGPgh5yPHXD5qqWRZTXbMh0H2vRyxp3OtnBNf7wQGso1A" alt="Screenshot 1" width="100%" height="400">
      </div>
      <div style="flex: 1 1 300px; margin: 10px;">
        <img src="/rich-editor.gif" alt="Screenshot 2" width="100%" height="400">
      </div>
      <div style="flex: 1 1 300px; margin: 10px;">
        <img src="/ai-assistant.gif" alt="Screenshot 3" width="100%" height="400">
      </div>
      <div style="flex: 1 1 300px; margin: 10px;">
        <img src="/labels.gif" alt="Screenshot 4" width="100%" height="400">
      </div>
    </div>
</div>


<!-- TechStack -->
### :space_invader: Tech Stack


  <summary>Client and Server</summary>
  <ul>
        <li>
            <a href="https://www.typescriptlang.org/">
                <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="Typescript"/>
            </a>
        </li>
        <li>
            <a href="https://nextjs.org/">
                <img src="https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js"/>
            </a>
        </li>
        <li>
            <a href="https://reactjs.org/">
                <img src="https://shields.io/badge/react-black?logo=react&style=for-the-badge" alt="React.js"/>
            </a>
        </li>
        <li>
            <a href="https://tailwindcss.com/">
                <img src="https://img.shields.io/badge/TailwindCSS-38B2AC?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwindcss"/>
            </a>
        </li>
        <li>
            <a href="https://ui.shadcn.com/">
                <img src="https://img.shields.io/badge/shadcn/ui-000000?style=for-the-badge&logo=shadcn/ui&logoColor=white" alt="ShadCN"/>
            </a>
        </li>
  </ul>

<summary>Database</summary>
  <ul>
        <li>
            <a href="https://www.postgresql.org/">
                <img src="https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=fff&style=for-the-badge)" alt="PostgreSQL" />
            </a>
        </li>
        <li>
            <a href="https://orm.drizzle.team/">
                <img src="https://img.shields.io/badge/Drizzle-C5F74F?logo=drizzle&logoColor=000&style=for-the-badge" alt="Drizzle"/>
            </a>
        </li>
        <li>
            <a href="https://redis.io/">
                <img src="https://img.shields.io/badge/Redis-FF4438?logo=redis&logoColor=fff&style=for-the-badge" alt="Redis" />
            </a>
        </li>
  </ul>

<summary>Deployment</summary>
  <ul>
    <li>
        <a href="https://www.vercel.com/">
        <img src="https://img.shields.io/badge/Vercel-000?logo=vercel&logoColor=fff&style=for-the-badge" alt="Vercel" />
        </a>
    </li>
  </ul>

<!-- Features -->
### :dart: Features

- Full Authentication(Google OAuth) using NextAuth
- Full rich text editor using Tip Tap
- AI assistant chat using Gemini 
- and many more

<!-- Env Variables -->
### :key: Environment Variables

To run this project, you will need to add the following environment variables to your .env file

```bash
  // Your Postgres database hosted on NeonDB 
  DATABASE_URL=

  // Get them from  Google Cloud Console
  GOOGLE_CLIENT_ID= // Google Client ID
  GOOGLE_CLIENT_SECRET= // Google Client Secret

  // Google Gemini key from Google Studio 
  GOOGLE_GENERATIVE_AI_API_KEY=
```

<!-- Getting Started -->
## 	:toolbox: Getting Started

<!-- Prerequisites -->
### :bangbang: Prerequisites

This project uses Nodejs and npm as a package manager.
Check taht you have them installed/

```bash
 node -v
 npm -v
```

<!-- Run Locally -->
### :running: Run Locally

Create a project directory

```bash
  mkdir my-project
```

Clone the project

```bash
  git clone https://github.com/dagim-mante/Magic-Notes---AI-Based-Notes-Editor .
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```


<!-- Contributing -->
## :wave: Contributing

<a href="https://github.com/dagim-mante/Magic-Notes---AI-Based-Notes-Editor/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=dagim-mante/Magic-Notes---AI-Based-Notes-Editor" />
</a>


Contributions are always welcome!




<!-- License -->
## :warning: License

Distributed under the MIT License. See LICENSE.txt for more information.


<!-- Contact -->
## :handshake: Contact

<p>
    <a href="https://x.com/DMantefardo">
        <img src="https://img.shields.io/badge/X-000?logo=x&logoColor=fff&style=for-the-badge" alt="Twitter" />
    </a>
    <a href="https://www.linkedin.com/in/dagimawi-mantefardo/">
        <img src="https://img.shields.io/badge/LinkedIn-0A66C2?logo=linkedin&logoColor=fff&style=for-the-badge" alt="LinkedIn" />
    </a>
</p>

****
