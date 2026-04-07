# Podsite CV Project

This workspace contains a Next.js static CV website feature implementation under `frontend/`.

## Setup

- `cd frontend`
- `npm install`
- `npm run dev`

## Build & Export

- `npm run build`
- `npm run export`

Static output will be generated in `frontend/out/`.

## Features

- Dark mode design with accent colors
- About Me, My Projects, Contact sections
- Responsive mobile-first layout
- Embedded project data in `src/data/episodes.ts`
- Static export-ready (Next.js `output: "export"`)

## QA

- `npm run lint`
- `npm run build && npm run export`

## Notes

The task list is in `specs/001-cv-site/tasks.md`.  
Specification is in `specs/001-cv-site/spec.md`.
