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


export const getShop = async (req, res) => {
  try {
    const { latitude, longitude } = req.query;

    if (!latitude || !longitude) {
      return res.status(400).json({
        message: "Latitude and Longitude required",
        error: true,
      });
    }

    const lat = Number(latitude);
    const lng = Number(longitude);

    const shops = await Location.find(); // 🔥 no city filter

    const shopsWithDistance = shops.map(shop => {
      const distance = Math.sqrt(
        Math.pow(shop.latitude - lat, 2) +
        Math.pow(shop.longitude - lng, 2)
      );

      return {
        ...shop._doc,
        distance,
      };
    });

    shopsWithDistance.sort((a, b) => a.distance - b.distance);

    return res.status(200).json({
      success: true,
      data: shopsWithDistance.slice(0, 1),
    });
  } catch (error) {
    console.log("GET SHOP ERROR =>", error);
    return res.status(500).json({
      message: "Server error",
      error: true,
    });
  }
};