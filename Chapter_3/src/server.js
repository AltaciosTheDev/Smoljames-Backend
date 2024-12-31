import express from "express"; // Import express from the express package
import path, { dirname } from "path"; // Import path from the path package
import { fileURLToPath } from "url"; // Import fileURLToPath from the url package
import authRoutes from "./routes/authRoutes.js"; // Import the router object from the authRoutes.js file
import todoRoutes from "./routes/todoRoutes.js";
const app = express();
const PORT = process.env.PORT || 5000;

//__filename: Represents the filename of the code being executed. This is the resolved absolute path of this code file.
const __filename = fileURLToPath(import.meta.url); //must compute b/c __filename is not a global object in ES6
//import.meta.url gives the URL of the current module (e.g., file:///C:/my-project/server.js).
//fileURLToPath() converts the URL to a file path (e.g., C:\my-project\server.js).

//__dirname: Represents the absolute path to the directory containing the current file.
const __dirname = dirname(__filename); //In CommonJS, it's global, In ES Modules, you compute it.
//dirname() returns the directory name of a path (e.g., C:\my-project).

app.use(express.json()); //litrally means that we are telling express to use json as the body parser. Without this, we would not be able to parse the body of the request
//Serves the HTML file from the /public directory
//Tells express to serve all files from the public folder as static assets / file.
//Any request for the css files will be resolved in the public directory
app.use(express.static(path.join(__dirname, "../public")));
//path.join() method joins all given path segments together using the platform-specific separator as a delimiter, then normalizes the resulting path.

//Defines a route for GET / that serves the index.html file from the public folder.
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.use("/auth", authRoutes); //Uses the router object to handle all requests to the /auth route
app.use("/todos", todoRoutes); //Uses the todo object to handle all requests to the /todo route

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
