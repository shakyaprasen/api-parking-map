const Joi = require("joi");
const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");

const parkingMarkerRoutes = require("./routes/parkingMarker");
const userRoutes = require("./routes/user");

const app = express();
mongoose
  .connect(
    "mongodb+srv://prasen:XUVShHKr88JDZO8x@cluster0-e0gph.mongodb.net/maps-information?retryWrites=true",
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("Connected to database");
  })
  .catch(() => {
    console.log("Connection failed");
  });

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

// example json data/structure for google maps
// const parkingspots = [
//   {
//     id: "1",
//     name: "Love.Fish",
//     address: "580 Darling Street, Rozelle, NSW",
//     lat: "-33.861034",
//     lng: "151.171936",
//     type: "restaurant"
//   },
//   {
//     id: "2",
//     name: "Young Henrys",
//     address: "76 Wilford Street, Newtown, NSW",
//     lat: "-33.898113",
//     lng: "151.174469",
//     type: "bar"
//   },
//   {
//     id: "3",
//     name: "Hunter Gatherer",
//     address: "Greenwood Plaza, 36 Blue St, North Sydney NSW",
//     lat: "-33.840282",
//     lng: "151.207474",
//     type: "bar"
//   },
//   {
//     id: "4",
//     name: "The Potting Shed",
//     address: "7A, 2 Huntley Street, Alexandria, NSW",
//     lat: "-33.910751",
//     lng: "151.194168",
//     type: "bar"
//   },
//   {
//     id: "5",
//     name: "Nomad",
//     address: "16 Foster Street, Surry Hills, NSW",
//     lat: "-33.879917",
//     lng: "151.210449",
//     type: "bar"
//   },
//   {
//     id: "6",
//     name: "Three Blue Ducks",
//     address: "43 Macpherson Street, Bronte, NSW",
//     lat: "-33.906357",
//     lng: "151.263763",
//     type: "restaurant"
//   },
//   {
//     id: "7",
//     name: "Single Origin Roasters",
//     address: "60-64 Reservoir Street, Surry Hills, NSW",
//     lat: "-33.881123",
//     lng: "151.209656",
//     type: "restaurant"
//   },
//   {
//     id: "8",
//     name: "Red Lantern",
//     address: "60 Riley Street, Darlinghurst, NSW",
//     lat: "-33.874737",
//     lng: "151.215530",
//     type: "restaurant"
//   }
// ];

app.use("/api/parkingMarker", parkingMarkerRoutes);
app.use("/api/user", userRoutes);

module.exports = app;
