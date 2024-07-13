# Wayfarer's Frontier (CMS)

Life is a beautiful mix of ups and downs. For all its worth, I like to sort out my thoughts, post some projects I'm working on, and collect insights from all walks of life while I try to make sense of my own. 

> Please see the frontend client repository for more info.

Live link: https://wayfarers-frontier.pages.dev/ 🧳

<img width="903" alt="Screenshot 2024-06-03 at 2 23 30 AM" src="https://github.com/NovaCat35/blog-client/assets/54908064/e27498aa-c8f7-46fe-b1d8-128499e28c6d">


## Project Links 🔗
- [Site Link](https://wayfarers-frontier.pages.dev/)
- [Frontend Client](https://github.com/NovaCat35/blog-client)
- [Backend API ](https://github.com/NovaCat35/blog-api)
- CMS _(You are here)_

## Features 🎯

- Blog pages and Editor
- Sign-up/Login authentication
- Session continuity and authorization with JWT

## Hosting Platforms 🌐

- [Cloudflare](https://dash.cloudflare.com/): for deploying and hosting the application

## Technologies Used 🚀

- **Framework:** React + Vite
- **Program Language:** TypeScript
- **Stylesheet Language:** SCSS module and tailwind
- **Unit Testing:** vitest

## Libraries 📚

```
  npm create vite@latest projectName -- --template react-ts
   npm install uuidv4
   npm install date-fns
   npm install --save prop-types
   npm install react-router-dom
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   npm install -D sass
   npm install --save react-lazy-load-image-component
   npm install --save @types/react-lazy-load-image-component
   npm install react-paginate
   npm install react-markdown  (note: blog format is changed after using tinyMCE for production vs the dev-sample json blogs. This pkg is not needed anymore)
   npm install html-react-parser --save
   npm install --save @tinymce/tinymce-react
```

> Don't forget to modify tailwind.config & create a tailwind.css file

