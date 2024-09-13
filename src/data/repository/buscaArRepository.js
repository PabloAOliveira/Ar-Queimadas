import axios from "axios";

async function getUserLocation() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          reject(error);
        }
      );
    } else {
      reject(new Error("Geolocation is not supported by this browser."));
    }
  });
}

export async function fetchAirQuality() {
  try {
    const { latitude, longitude } = await getUserLocation();

    const API_URL = `https://api.waqi.info/feed/geo:${latitude};${longitude}?token=c50c5b2ddc17825d22da9d55e39ea54287a840fc`;

    const response = await axios.get(API_URL);

    return response.data.data;
  } catch (error) {
    throw error;
  }
}
