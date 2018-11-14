const mongoose = require("mongoose");
require("mongoose-double")(mongoose);

const SchemaTypes = mongoose.Schema.Types;
const parkingMarkerSchema = mongoose.Schema({
  name: { type: String, required: true, maxlength: 60 },
  address: { type: String, required: true, maxlength: 80 },
  lng: { type: SchemaTypes.Double, required: true },
  lat: { type: SchemaTypes.Double, required: true },
  type: { type: String, required: true }
  //creator: { type: mongoose.SchemaTypes.ObjectId, ref: "User", required: true }
});

module.exports = mongoose.model("ParkingMarker", parkingMarkerSchema);
