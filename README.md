# Joboard

Joboard is a React job search interface backed by Firebase Firestore. It displays the newest jobs first, lets users filter listings by role, type, location, and experience level, and links each listing to its application page.

## Features

- Firestore-powered job listings
- Newest-first sorting by `postedOn`
- Exact-match filtering for job role, type, location, and experience
- Clear-filters action after a search
- Relative posting dates and skill tags
- External application links

## Tech stack

- React 19
- Vite
- Tailwind CSS
- Firebase Firestore
- Day.js

## Getting started

### Prerequisites

- Node.js 18 or newer
- A Firebase project with Cloud Firestore enabled

### Install and run

```bash
npm install
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

## Firestore data

The app reads from a collection named `jobs`. Each document should contain the following fields:

| Field | Type | Example |
| --- | --- | --- |
| `title` | string | `Frontend Developer` |
| `company` | string | `Google` |
| `type` | string | `Full-time` |
| `experience` | string | `Mid Level` |
| `location` | string | `Remote` |
| `skills` | array of strings | `["React", "CSS"]` |
| `job_link` | string | `https://example.com/jobs/123` |
| `postedOn` | Firestore Timestamp | `2026-05-16` |

`postedOn` must be a Firestore Timestamp because the app converts it with `.toDate()`. Filtering uses exact values, so the stored values must match the options in the search controls, including capitalization.

The Firebase project configuration is in `src/firebase.config.js`. Replace it with your own project configuration before deploying the app, and configure Firestore security rules appropriate for your environment.

## Available scripts

```bash
npm run dev       # Start the Vite development server
npm run build     # Create a production build
npm run preview   # Preview the production build locally
npm run lint      # Run ESLint
```

## Project structure

```text
src/
|-- components/
|   |-- Header/
|   |-- JobCard/
|   |-- Navbar/
|   `-- SearchBar/
|-- App.jsx
|-- JobDummyData.js
|-- firebase.config.js
|-- App.css
`-- index.css
```
