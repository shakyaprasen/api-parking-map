const mongoose = require("mongoose");
require("mongoose-double")(mongoose);

const SchemaTypes = mongoose.Schema.Types;
const parkingMarkerSchema = mongoose.Schema({
  name: { type: String, required: true, maxlength: 60 },
  address: { type: String, required: true, maxlength: 80 },
  lng: { type: Number, required: true,
  	validate: [
	  	(v) => {
	  		const lngValidator = /^[+-]?((180\.?0*$)|(((1[0-7][0-9])|([0-9]{0,2}))\.?[0-9]*$))/;
	  		return lngValidator.test(v);
	  	},
	  	'{VALUE} is not a valid longitude'
	  ] 
	},
  lat: { type: Number, required: true,
  	validate: [
	  	(v) => {
	  		const latValidator = /^[+-]?((90\.?0*$)|(([0-8]?[0-9])\.?[0-9]*$))/;
	  		return latValidator.test(v);
	  	},
	  	'{VALUE} is not a valid latitude'
	   ]
  },
  type: { type: String, required: true }
  //creator: { type: mongoose.SchemaTypes.ObjectId, ref: "User", required: true }
});

module.exports = mongoose.model("ParkingMarker", parkingMarkerSchema);
