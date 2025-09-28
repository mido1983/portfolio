# Portfolio (Next.js)

Personal portfolio site for Michael Doroshenko, Full Stack Web Developer. Built with Next.js 14, the App Router, TypeScript, Tailwind CSS, and Framer Motion animations.

## Scripts

```bash
npm install
npm run dev
npm run build
npm run start
npm run lint
```

## Structure

- `src/app` – routes (App Router) and the contact form API endpoint.
- `src/components` – reusable UI (hero, projects, skills, contact form, etc.).
- `src/data` – typed content objects for projects, experience, and site configuration.

## Contact form

POST requests to `/api/contact` are validated and can be connected to an email service in production.

## Résumé

The `/resume` section is optimized for printing/exporting to PDF using the browser print dialog.
