import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import session from "express-session";
import rateLimit from "express-rate-limit";
import hpp from 'hpp' // fix
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean"; // fix
import csurf from "csurf"; // اعملها لما تعمل cookie
import dbConnect from "./config/db.js";
import cors from 'cors'

dotenv.config();

// Express App
const app = express();
app.use(cors())
// middleware
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json({ limit: "120kb" }));
app.use(express.static(path.join(__dirname, "uploads")));


// Nosql injection (security)
app.use(mongoSanitize());

// Html script (security)
app.use(xss());

// Rate limit  (security)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 1000000,
  standardHeaders: true,
  legacyHeaders: true,
  message: "To many request please try agin in another time  ",
});
// Prevent http parameter pollution
app.use(hpp()); // => take a whitelist for params which you do not want to apply this middleware on it
export const csurfProtection = csurf({ cookie: true });
// set sessions and secure it (security);
app.use(
  session({
    secret: 'thisIsmysecretkey523',
    resave: false,
    saveUninitialized: true,
    name: "access_token",
    cookie: {
      maxAge: 1000 * 60 * 60,
      // secure: true, => production mode
      httpOnly: true,
      sameSite: true,
    }
    },
  )
);
// import mount routes function
import mountRoutes from "./routes/index.js";

// mount Routes
import errorHandler from "./middleware/handlingError.js";

app.use("/api", limiter);
mountRoutes(app);
//Global express handling middleware
app.use(errorHandler);

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  dbConnect();
  console.log(` server is running ${port}  `);
});

//Global rejection handling middleware

process.on("unhandledRejection", (err) => {
  console.log("unhandledRejection Errors", {
    message: err.message,
    stack: err.stack,
  });
  server.close(() => {
    console.log("server is shut down.....");
    process.exit(1);
  });
});
