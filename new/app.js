const express = require("express");
const mongoose = require('mongoose');

const path = require("path");
const methodOverride = require('method-override');
const Review = require("./models/review.js");
const { ObjectId } = require('mongoose').Types;
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");

// const listingsRoutes = require('./routes/listings'); // Import the listings routes

const authRoutes = require('./routes/auth'); // Import the auth routes
const contactRoutes = require('./routes/contact'); // Import the contact routes

const app = express();

app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));

const ejsMate = require("ejs-mate");

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://prathameshrao05:0FIkQaNeVF1tLorG@cluster0.vunox.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

main().then(() => console.log("connected to DB")).catch(err => console.error(err));

async function main() {
    await mongoose.connect(uri);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "public")));

const store = MongoStore.create({
    mongoUrl: uri,
    crypto: {
      secret: "mysupersecretcode",
    },
    touchAfter: 24 * 3600, // Update session only once in 24 hours (in seconds)
});
  
store.on("error", (err) => {
    console.error("ERROR in MONGO SESSION STORE", err);
});

const sessionOptions = {
    store,
    secret: "mysuperscretcode",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,   
        httpOnly: true, // Prevent client-side JavaScript access
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days (in milliseconds)
    },
};

app.use(session(sessionOptions));
app.use(flash());

const recycleRoutes = require('./routes/recycle'); // Import the recycle routes
app.use('/recycle', recycleRoutes); // Use the recycle routes

app.use((req, res, next) => {
    res.locals.user = req.user || {}; // Pass user information to EJS templates, default to an empty object
    res.locals.success = req.flash('success');
    next();
});

app.use('/contact', contactRoutes); // Use the contact routes
app.use('/', authRoutes); // Use the auth routes

// Define the root route
app.get("/", (req, res) => {
    res.render("layouts/boilerplate", { body: `
        <div class="container mt-5">
            <div class="row justify-content-center text-center">
                <div class="col-lg-8">
                    <h1>Automating Waste Management for a Cleaner Future</h1>
                    <p class="lead">Niramay uses AI to optimize waste collection, encourage recycling, and create cleaner communities through citizen participation.</p>
                    <div class="d-grid gap-2 d-sm-flex justify-content-sm-center mt-4">
                        <button type="button" class="btn btn-success btn-lg px-4 gap-3" onclick="window.location.href='/recycle'">Report Waste <i class="bi bi-arrow-right"></i></button>
                        <button type="button" class="btn btn-outline-secondary btn-lg px-4">View Dashboard</button>
                    </div>
                </div>
            </div>
        </div>` }); // Pass the body variable


});

// Remaining routes...
app.listen(8080, () => {
    console.log("the server has been started");
});
