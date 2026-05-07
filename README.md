# Story Writer Application

## Overview

The Story Writer is an AI-powered creative writing assistant that helps users generate original stories based on their prompts. This application allows users to create, view, and manage AI-generated stories with full control over their story collection.

## Features

- AI Story Generation: Create unique stories from simple prompts
- Story Management: Save, view, and manage your collection of stories
- Full Control: Add, edit, and delete stories
- Theme Support: Toggle between light and dark mode for your reading preference
- Responsive Design: Works on mobile and desktop devices

## Technology Stack

- Next.js 14 with App Router
- MongoDB for data persistence
- Tailwind CSS for styling
- Context API for state management
- OpenAI API integration for story generation

## How to Use

1. Enter a story prompt in the input field
2. Click "Generate Story" to create a new AI story
3. Browse your generated stories in the gallery
4. Edit or delete stories as needed
5. Toggle between light/dark mode using the theme switcher

## Project Structure

```
src/
  app/              # Next.js app directory
  ├── api/           # API routes
  ├── home/          # Home page components
  components/         # Reusable UI components
  context/          # React context for state management
  public/           # Static assets
  stories/          # Story data files
```

## API Endpoints

- `POST /api/generate` - Generate a new story using AI
- `GET /api/stories` - Get all stories
- `GET /api/stories/[id] - Get a specific story
- `DELETE /api/stories/[id]` - Delete a story

## Dependencies

- next: The React framework for production
- openai: For the AI story generation
- mongoose: For database operations with MongoDB
- @next/env: For environment variable management
- All dependencies are listed in package.json

## Setup

1. Clone the repository
2. Install dependencies with `npm install` or `yarn install`
3. Set up your OpenAI API key in the environment variables
4. Run the development server with `npm run dev`
5. Access the application at http://localhost:3000

## Development

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).