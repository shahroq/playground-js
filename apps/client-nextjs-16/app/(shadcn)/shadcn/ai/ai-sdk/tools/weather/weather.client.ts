/**
 * client.ts has zero business logic — it's a dumb wrapper around fetch.
 * If Open-Meteo's API shape changes, or you swap providers
 * (OpenWeatherMap, WeatherAPI), you touch only this file.
 */

export type GeocodeResult = {
  results?: {
    name: string;
    latitude: number;
    longitude: number;
    country: string;
  }[];
};

export type ForecastResult = {
  current: {
    temperature_2m: number;
    apparent_temperature: number;
    weather_code: number;
    wind_speed_10m: number;
  };
};

export async function fetchGeocode(location: string): Promise<GeocodeResult> {
  const url = new URL("https://geocoding-api.open-meteo.com/v1/search");
  url.searchParams.set("name", location);
  url.searchParams.set("count", "1");

  const res = await fetch(url);
  if (!res.ok) throw new Error(`Geocoding failed: ${res.status}`);
  return res.json();
}

export async function fetchForecast(
  lat: number,
  lon: number,
): Promise<ForecastResult> {
  const url = new URL("https://api.open-meteo.com/v1/forecast");
  url.searchParams.set("latitude", String(lat));
  url.searchParams.set("longitude", String(lon));
  url.searchParams.set(
    "current",
    "temperature_2m,apparent_temperature,weather_code,wind_speed_10m",
  );

  const res = await fetch(url);
  if (!res.ok) throw new Error(`Forecast fetch failed: ${res.status}`);
  return res.json();
}
