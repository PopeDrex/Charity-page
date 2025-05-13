# Secret Detours Charity Website

A modern, responsive charity website with integrated content management system.

## Features

- Modern React frontend with TailwindCSS
- Headless CMS for content management
- Responsive design for all devices
- User authentication
- Donation management
- Event calendar
- Blog/news section

## Getting Started

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```
PORT=3500
DB_URI=your_mongodb_connection_string
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
```

## Project Structure

- `/client` - React frontend application
- `/server` - Express backend API
- `/cms` - Content management system
- `/public` - Static assets

## Deployment to Render

This project is configured for easy deployment to [Render](https://render.com).

### Setup Steps

1. **Create a Render account** at [render.com](https://render.com)

2. **Create a new Web Service**
   - Connect your GitHub repository
   - Use the following settings:
     - **Environment**: Node
     - **Build Command**: `npm run setup`
     - **Start Command**: `npm start`
     - **Instance Type**: Free (or paid tier as needed)

3. **Add Environment Variables**
   - Configure the same environment variables as in your local `.env` file
   - Make sure to set `NODE_ENV=production`
   - Set any other necessary secrets or config values

4. **Deploy**
   - Click 'Create Web Service'
   - Render will automatically build and deploy your application

### Continuous Deployment

Render automatically deploys when you push changes to your repository's main branch.

### Monitoring

You can monitor the status of your application through Render's dashboard, which provides logs and performance metrics.
