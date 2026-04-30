import { Location } from "../model/location.modal.js";

export const getLocations = async (req, res) => {
  try {
    const locations = await Location.find();

    return res.status(200).json({
      success: true,
      count: locations.length,
      data: locations,
    });
  } catch (error) {
    console.error("getLocations error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch locations",
    });
  }
};