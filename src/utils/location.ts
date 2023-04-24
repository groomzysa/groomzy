import { Geolocation } from "@capacitor/geolocation";
import Geocode from "react-geocode";

import { ILatLng } from "./types";

/**
 *
 * Configuration
 *
 */

// set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
Geocode.setApiKey(process.env.REACT_APP_GROOMZY_GOOGLE_API_KEY || "");

// set response language. Defaults to english.
Geocode.setLanguage("en");

// set response region. Its optional.
Geocode.setRegion("za");

// set location_type filter (optional).  ROOFTOP param returns the most accurate result.
Geocode.setLocationType("ROOFTOP");

export const getCurrentPosition = async (): Promise<ILatLng | undefined> => {
  try {
    const coordinates = await Geolocation.getCurrentPosition();

    return {
      lat: coordinates.coords.latitude,
      lng: coordinates.coords.longitude,
    };
  } catch (e) {
    console.error("Error", e);
  }
};

export const getAddressPosition = async (
  address: string
): Promise<ILatLng | undefined> => {
  try {
    const response = await Geocode.fromAddress(address);

    if (response.results[0].geometry.location) {
      return response.results[0].geometry.location;
    }
  } catch (e) {
    console.error("Error", e);
  }
};
