var express                 = require("express"),
    app                     = express(),
    bodyParser              = require("body-parser"),
    flash                   = require("connect-flash"),
    mongoose                = require("mongoose"),
    methodOverride          = require("method-override"),
    passport                = require("passport"),
    LocalStrategy           = require("passport-local"),
    passportLocalMongoose   = require("passport-local-mongoose"),
    Campground              = require("./models/campground.js"),
    Comment                 = require("./models/comment.js"),
    User                    = require("./models/user.js");
    // seedDB               = require("./seeds");

// requiring routes
var campgroundRoutes    = require("./routes/campgrounds"),
    commentRoutes       = require("./routes/comments"),
    indexRoutes         = require("./routes/index");

// seedDB(); // seed the database
mongoose.connect(process.env.DATABASEURL, {useNewUrlParser: true});
// mongoose.connect("mongodb+srv://laurarogers:taminarossa133*@cluster0-6hfgv.mongodb.net/test?retryWrites=true&w=majority", {
//     useNewUrlParser: true,
//     useCreateIndex: true
// }).then(() => {
//     console.log("Connected to DB!");
// }).catch(err => {
//     console.log("ERROR:", err.message);
// });

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(flash());

// PASSPORT CONFIG
app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("YelpCamp server is running.");
});