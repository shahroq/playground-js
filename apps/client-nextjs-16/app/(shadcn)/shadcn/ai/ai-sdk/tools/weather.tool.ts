import { tool } from "ai";
import { z } from "zod";

// Schema
const weatherInputSchema = z.object({
  location: z
    .string()
    .describe("City name to get the weather for, e.g. 'London' or 'Tokyo'."),
});

type WeatherInput = z.infer<typeof weatherInputSchema>;

const weatherInputExamples = [
  { input: { location: "London" } },
  { input: { location: "Tokyo" } },
] satisfies { input: WeatherInput }[];

// Types for the external API responses
type GeocodeResult = {
  results?: {
    name: string;
    latitude: number;
    longitude: number;
    country: string;
  }[];
};

type ForecastResult = {
  current: {
    temperature_2m: number;
    apparent_temperature: number;
    weather_code: number;
    wind_speed_10m: number;
  };
};

// --- Tool
export const weatherTool = tool({
  description:
    "Get the current weather for a city. Use this tool whenever the user asks about weather, temperature, whether it's raining/sunny/cold, or what to wear outside for a specific place.",

  inputSchema: weatherInputSchema,
  inputExamples: weatherInputExamples,
  strict: true,

  execute: async (input) => {
    try {
      return await getWeather(input);
    } catch (error) {
      return {
        location: input.location,
        found: false as const,
        note: error instanceof Error ? error.message : "Weather lookup failed.",
      };
    }
  },
});

// Fetch logic
async function geocodeLocation(location: string) {
  const url = new URL("https://geocoding-api.open-meteo.com/v1/search");
  url.searchParams.set("name", location);
  url.searchParams.set("count", "1");

  const res = await fetch(url);
  if (!res.ok) throw new Error(`Geocoding failed: ${res.status}`);

  const data = (await res.json()) as GeocodeResult;
  const match = data.results?.[0];
  if (!match) return null;

  return {
    name: match.name,
    country: match.country,
    lat: match.latitude,
    lon: match.longitude,
  };
}

async function fetchCurrentWeather(lat: number, lon: number) {
  const url = new URL("https://api.open-meteo.com/v1/forecast");
  url.searchParams.set("latitude", String(lat));
  url.searchParams.set("longitude", String(lon));
  url.searchParams.set(
    "current",
    "temperature_2m,apparent_temperature,weather_code,wind_speed_10m",
  );

  const res = await fetch(url);
  if (!res.ok) throw new Error(`Forecast fetch failed: ${res.status}`);

  const data = (await res.json()) as ForecastResult;
  return data.current;
}

async function getWeather({ location }: WeatherInput) {
  const place = await geocodeLocation(location);
  if (!place) {
    return { location, found: false as const, note: "Location not found." };
  }

  const current = await fetchCurrentWeather(place.lat, place.lon);

  return {
    location: `${place.name}, ${place.country}`,
    found: true as const,
    temperatureC: current.temperature_2m,
    feelsLikeC: current.apparent_temperature,
    windSpeedKmh: current.wind_speed_10m,
    weatherCode: current.weather_code,
  };
}
