const express = require("express");

const ParkingMarkerController = require("../controller/parkingMarker");
const checkAuth = require("../middleware/check-auth.js");

const router = express.Router();

router.post("", ParkingMarkerController.createparkingMarker);

router.put("/:id", ParkingMarkerController.editparkingMarker);

router.delete("/:id", ParkingMarkerController.deleteparkingMarker);

router.get("", ParkingMarkerController.getAllparkingMarkers);

router.get("/:id", ParkingMarkerController.getSingleparkingMarker);

module.exports = router;
