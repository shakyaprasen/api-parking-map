const ParkingMarker = require("../models/parkingMarker");

exports.getAllparkingMarkers = (req, res, next) => {
  // const pageSize = +req.query.pageSize;
  // const currentPage = +req.query.page;
  const parkingMarkerQuery = ParkingMarker.find();

  let fetchedparkingMarkers;
  // if (pageSize && currentPage) {
  //   parkingMarkerQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  // }
  parkingMarkerQuery
    .find()
    .then(documents => {
      fetchedparkingMarkers = documents;
      return ParkingMarker.countDocuments();
    })
    .then(count => {
      return res.status(200).json({
        message: "ParkingMarkers Fetched Successfully",
        parkingMarkers: fetchedparkingMarkers,
        maxparkingMarkers: count
      });
    })
    .catch(error => {
      return res
        .status(500)
        .json({ message: "Fetcing ParkingMarkers Failed!" });
    });
};

exports.getSingleparkingMarker = (req, res, next) => {
  ParkingMarker.findById(req.params.id)
    .then(parkingMarkerData => {
      if (parkingMarkerData) {
        return res.status(200).json({
          message: "ParkingMarker fetched successfully",
          parkingMarker: parkingMarkerData
        });
      } else {
        return res.status(404).json({ message: "ParkingMarker not found" });
      }
    })
    .catch(error => {
      return res.status(500).json({ message: "Fetcing ParkingMarker Failed!" });
    });
};

exports.createparkingMarker = (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
  const parkingMarker = new ParkingMarker({
    name: req.body.name,
    address: req.body.address,
    type: req.body.type,
    lat: req.body.lat,
    lng: req.body.lng
  });
  parkingMarker
    .save()
    .then(createdParkingMarker => {
      return res.status(201).json({
        message: "ParkingMarker Added Successfully",
        parkingMarker: {
          ...createdParkingMarker._doc,
          id: createdParkingMarker._id
        }
      });
    })
    .catch(error => {
      return res
        .status(500)
        .json({ message: "Creating a ParkingMarker Failed!", error });
    });
};

exports.editparkingMarker = (req, res, next) => {
  let imagePath = req.body.imagePath;

  const parkingMarker = new ParkingMarker({
    _id: req.body.id,
    name: req.body.name,
    address: req.body.address,
    type: req.body.type,
    lat: req.body.lat,
    lng: req.body.lng
  });
  ParkingMarker.updateOne({ _id: req.params.id }, parkingMarker)
    .then(parkingMarkerData => {
      if (parkingMarkerData.n > 0) {
        return res.status(200).json({
          message: "Update Successful",
          updatedParkingMarker: parkingMarker
        });
      } else {
        return res.status(401).json({
          message: "Not authorized!"
        });
      }
    })
    .catch(error => {
      return res
        .status(500)
        .json({ message: "Couldn't update ParkingMarker!" });
    });
};

exports.deleteparkingMarker = (req, res, next) => {
  ParkingMarker.deleteOne({ _id: req.params.id })
    .then(result => {
      if (result.n > 0) {
        return res.status(200).json({
          message: "Deletion Successful"
        });
      } else {
        return res.status(401).json({
          message: "Not authorized!"
        });
      }
    })
    .catch(error => {
      return res
        .status(500)
        .json({ message: "Deleting ParkingMarker Failed!" });
    });
};
