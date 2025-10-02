# Deployment Guide for SynCode Project

## Render.com Deployment

### Prerequisites
1. GitHub repository with your code
2. Render.com account
3. MongoDB Atlas account (for database)

### Steps to Deploy

#### 1. Prepare Your Repository
- Ensure all files are committed to your GitHub repository
- The project structure should be:
  ```
  ├── server/
  │   ├── src/
  │   └── package.json
  ├── client/
  │   ├── src/
  │   └── package.json
  ├── package.json (root)
  ├── render.yaml
  └── Procfile
  ```

#### 2. Deploy on Render.com

**Option A: Using render.yaml (Recommended)**
1. Go to Render.com dashboard
2. Click "New" → "Web Service"
3. Connect your GitHub repository
4. Render will automatically detect the `render.yaml` file
5. The deployment will use the configuration in `render.yaml`

**Option B: Manual Configuration**
1. Go to Render.com dashboard
2. Click "New" → "Web Service"
3. Connect your GitHub repository
4. Configure the following:
   - **Build Command**: `npm run install-all && npm run build`
   - **Start Command**: `npm start`
   - **Environment**: Node

#### 3. Environment Variables
Set these environment variables in Render dashboard:
- `NODE_ENV`: `production`
- `PORT`: `5000` (or let Render assign automatically)
- `CLIENT_URL`: `https://your-app-name.onrender.com`
- `JDOODLE_URL`: `https://api.jdoodle.com/v1/execute`
- `JDOODLE_CLIENT_ID`: `d2415881da3e9be930d4df49b654d1ad`
- `JDOODLE_CLIENT_SECRET`: `d2dde1832b5dc0d933415442bed87bce22e550eca031ce8b587ed15975c05d42`
- `DATABASE`: Your MongoDB connection string
- `SECRET_KEY`: Your JWT secret key

#### 4. Build Process
The deployment will:
1. Install all dependencies (server, client, root)
2. Build the React client
3. Start the server which serves both API and static files

#### 5. Access Your App
Once deployed, your app will be available at:
`https://your-app-name.onrender.com`

### Local Testing
To test the production build locally:
```bash
# Install all dependencies
npm run install-all

# Build the client
npm run build

# Start the server (serves both API and client)
npm start
```

### Features After Deployment
- ✅ Single deployment (server + client)
- ✅ Real-time collaboration
- ✅ Code compilation
- ✅ Chat functionality
- ✅ User authentication
- ✅ Room management

### Troubleshooting
1. **Build fails**: Check if all dependencies are installed
2. **API not working**: Verify environment variables are set
3. **Database connection**: Ensure MongoDB Atlas is accessible
4. **Static files not loading**: Check if client build was successful

### Notes
- The app uses a single port for both API and client
- All API routes are prefixed (e.g., `/execute`)
- React routing is handled by the server
- Socket.io connections work through the same domain
