//imports
const path = require("path");
const fs = require("fs");
const express = require("express");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");
const corsOptions = require("./config/corsOptions");
const verifyJWT = require("./middleware/verifyJWT");
const cookieParser = require("cookie-parser");

// Import API routes
const cmsApiRoutes = require("./routes/api/cms");

require("dotenv").config();

const app = express();

//our port
const PORT = process.env.PORT || 3500;

app.use(cors(corsOptions));

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cookieParser());

// Static Files & Public Routes
app.use("/", express.static(path.join(__dirname, "/public")));
app.use("/", require("./routes/root"));

// Public API Routes (no authentication required)
app.use("/api/public/blogs", require("./routes/api/cms/blogRoutes"));
app.use("/api/public/events", require("./routes/api/cms/eventRoutes"));
app.use("/api/public/programs", require("./routes/api/cms/programRoutes"));

// Protected routes below this middleware require authentication
app.use(verifyJWT);

// CMS API Routes (authentication required)
app.use("/api/cms", cmsApiRoutes);

// Handle production environment
// Force production mode on Render
console.log('Environment variables:', { NODE_ENV: process.env.NODE_ENV, RENDER: process.env.RENDER });
if (process.env.NODE_ENV === 'production' || process.env.RENDER === 'true') {
  // Serve static files from the React app build directory
  app.use(express.static(path.join(__dirname, 'client/dist')));
  
  // For all other requests, send the React app's index.html
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/dist', 'index.html'));
  });
} else {
  // 404 handler for development environment
  app.all("*", (req, res) => {
    res.status(404);
    if (req.accepts("html")) {
      // Try to serve the client's index.html as a fallback
      const clientIndexPath = path.join(__dirname, 'client/dist', 'index.html');
      if (fs.existsSync(clientIndexPath)) {
        console.log('Serving client index.html as fallback');
        return res.sendFile(clientIndexPath);
      }
      
      // If client index doesn't exist, just return a simple 404 message
      return res.send("404 Not Found - Page does not exist");
    } else if (req.accepts("json")) {
      return res.json({error: "404 Not Found"});
    } else {
      return res.type("txt").send("404 Not Found");
    }
  });
}

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// For development, log server URL
console.log(`Server running at http://localhost:${PORT}`);
console.log(`CMS accessible at http://localhost:${PORT}/api/cms`);
console.log(`Public API available at http://localhost:${PORT}/api/public`);