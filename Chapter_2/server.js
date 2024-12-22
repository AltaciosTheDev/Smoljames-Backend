//The address of this server connected to the network is:
// URL -> http://localhost:3000
// IP -> 127.0.0.1.3000
const express = require("express"); //lets you use express code in this file
const app = express(); //starts the express app
const PORT = 3000; //subdirectory in the ip address, location within the server.
const data = ["Enzo"];
//Endpoint => HTTP VERBS(method) && ROUTERS OR PATHS
// The method informs the nature of the request and the route is a further subdirectory (basically we direct the request to the body of code to respond accordingly, and these locations or routes are called endpoints).

//Type 1 - Website endpoint (website resousrces, html,css,images. Typically when a user types in a URL)
app.get("/", (req, res) => {
  // this is endpoint number 1 - /
  console.log("I hit an endpoint", req.method);
  res.status(200).send(`
    <body 
        style="background:pink;
        color:blue";>
        <h1>DATA:</h1>
        <p>${JSON.stringify(data)}</p>
        <a href="/dashboard">Dashboard</a>
    </body>
    `);
});

//middleware
app.use(express.json()); //literally express can't read json without this

app.get("/dashboard", (req, res) => {
  console.log("I hit the /dashboard endpoint", req.method);
  res.status(200).send(`
    <body 
        style="background:pink;
        color:blue";>
        <h1>Dashboard</h1>
        <a href="/">Home</a>
    </body>
    `);
});

//Type 2 => API endpoints (non visual) /api is a good queue that signifies this will not send visual file and will focus on data

//CRUD-method => create-post, read-get, update-put, delete-delete

app.get("/api/data", (req, res) => {
  console.log("This one was for data");
  res.status(200).json({ data: "This is the data" });
});

app.post("/api/data", (req, res) => {
  //someone wants to create a user (For example when they click a sign up button)
  // the user clicks the sign up button after entering their credentials, and their browser is wired up to send out a network request to the server to hanlde that action
  const newEntry = req.body;
  console.log(newEntry);
  data.push(newEntry.name)
  res.status(200).send(`Finished with data ${newEntry}`);
});

app.delete('/api/data', (req, res) => {
    data.pop()
    console.log('We deleted the element of the end of the array')
    res.status(203)
})

app.listen(PORT, () => {
  //will keep the server open listening endlessly to incomming requests from the client
  console.log(`Server has started on: ${PORT}`);
}); //hardware running software connected to the internet listening to requests to its ip address and port
