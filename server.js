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
if (process.env.NODE_ENV === 'production' || process.env.RENDER) {
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
      // Check if view directory exists
      const viewPath = path.join(__dirname, "view", "404.html");
      if (fs.existsSync(viewPath)) {
        res.sendFile(viewPath);
      } else {
        res.send("404 Not Found - Page does not exist");
      }
    } else if (req.accepts("json")) {
      res.json({error: "404 Not Found"});
    } else {
      res.type("txt").send("404 Not Found");
    }
  });
}

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// For development, log server URL
console.log(`Server running at http://localhost:${PORT}`);
console.log(`CMS accessible at http://localhost:${PORT}/api/cms`);
console.log(`Public API available at http://localhost:${PORT}/api/public`);