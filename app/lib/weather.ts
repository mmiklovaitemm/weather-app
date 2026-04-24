// app/lib/weather.ts
const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

/**
 * @param city - The name of the city.
 * @param coords - Optional coordinates (latitude and longitude).
 * @param unit - Measurement unit ('metric' for Celsius/m/s, 'imperial' for Fahrenheit/mph).
 */
export async function getWeatherData(
  city: string,
  coords?: { lat: number; lon: number },
  unit: "metric" | "imperial" = "metric",
) {
  try {
    // Construct the query part based on whether we have coordinates or a city name
    const query = coords ? `lat=${coords.lat}&lon=${coords.lon}` : `q=${city}`;

    // We add &units=${unit} to both API calls
    const [currentRes, forecastRes] = await Promise.all([
      fetch(`${BASE_URL}/weather?${query}&units=${unit}&appid=${API_KEY}`),
      fetch(`${BASE_URL}/forecast?${query}&units=${unit}&appid=${API_KEY}`),
    ]);

    if (!currentRes.ok || !forecastRes.ok) {
      throw new Error("Failed to fetch weather data");
    }

    const current = await currentRes.json();
    const forecast = await forecastRes.json();

    return { current, forecast };
  } catch (error) {
    console.error("Error on fetching weather data:", error);
    return null;
  }
}
