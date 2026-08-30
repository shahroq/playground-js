/**
 * service.ts has zero AI SDK knowledge — getWeather is a plain
 * async function you could unit test, call from a REST route,
 * or reuse in a cron job, completely independent of tool().
 */

import { fetchGeocode, fetchForecast } from "./weather.client";
import type { WeatherInput } from "./weather.schema";

export type WeatherResult =
  | {
      location: string;
      found: true;
      temperatureC: number;
      feelsLikeC: number;
      windSpeedKmh: number;
      weatherCode: number;
    }
  | { location: string; found: false; note: string };

export async function getWeather({
  location,
}: WeatherInput): Promise<WeatherResult> {
  const geo = await fetchGeocode(location);
  const match = geo.results?.[0];

  if (!match) {
    return { location, found: false, note: "Location not found." };
  }

  const forecast = await fetchForecast(match.latitude, match.longitude);

  return {
    location: `${match.name}, ${match.country}`,
    found: true,
    temperatureC: forecast.current.temperature_2m,
    feelsLikeC: forecast.current.apparent_temperature,
    windSpeedKmh: forecast.current.wind_speed_10m,
    weatherCode: forecast.current.weather_code,
  };
}
