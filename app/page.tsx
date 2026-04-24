"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import CurrentWeather from "./components/CurrentWeather";
import WeatherDetails from "./components/WeatherDetails";
import DailyForecast from "./components/DailyForecast";
import HourlyForecast from "./components/HourlyForecast";
import { getWeatherData } from "./lib/weather";

export default function Home() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");

  const handleSearch = useCallback(
    async (
      city: string,
      coords?: { lat: number; lon: number },
      currentUnit?: "metric" | "imperial",
    ) => {
      setLoading(true);
      setError(null);
      const activeUnit = currentUnit || unit;

      try {
        const data = await getWeatherData(city, coords, activeUnit);
        if (data) {
          setWeatherData(data);
        } else {
          setError("Location not found or API key is still activating.");
        }
      } catch (err) {
        console.error(err);
        setError("An error occurred while fetching weather data.");
      } finally {
        setLoading(false);
      }
    },
    [unit],
  );

  const toggleUnit = (newUnit: "metric" | "imperial") => {
    if (newUnit === unit) return;
    setUnit(newUnit);
    if (weatherData) {
      handleSearch(weatherData.current.name, undefined, newUnit);
    }
  };

  useEffect(() => {
    let isMounted = true;
    const initializeWeather = () => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            if (isMounted) {
              handleSearch("", {
                lat: position.coords.latitude,
                lon: position.coords.longitude,
              });
            }
          },
          (geoError) => {
            console.warn("Geolocation error:", geoError.message);
            if (isMounted) handleSearch("London");
          },
          { timeout: 10000 },
        );
      } else {
        handleSearch("London");
      }
    };
    initializeWeather();
    return () => {
      isMounted = false;
    };
  }, [handleSearch]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <main className="max-w-[1280px] mx-auto px-4 md:px-6 py-6 md:py-10 flex flex-col gap-8 md:gap-10 overflow-x-hidden">
      <Header unit={unit} onUnitChange={toggleUnit} />

      <SearchBar onSearch={(city) => handleSearch(city)} />

      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex justify-center py-20 text-brand-white"
          >
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-brand-blue"></div>
              <p className="font-medium opacity-70 px-4">
                Detecting location and fetching weather...
              </p>
            </div>
          </motion.div>
        ) : error ? (
          <motion.div
            key="error"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20 text-red-400 font-medium bg-brand-card rounded-3xl border border-brand-border px-6 mx-2"
          >
            <p>{error}</p>
            <button
              onClick={() => handleSearch("London")}
              className="block mx-auto mt-4 text-brand-blue hover:text-brand-blue-dark underline text-sm transition-colors"
            >
              Show weather for London instead
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
          >
            {/* Left side on desktop, top on mobile */}
            <div className="col-span-1 lg:col-span-8 flex flex-col gap-8">
              <motion.div variants={itemVariants}>
                <CurrentWeather data={weatherData.current} />
              </motion.div>

              <motion.div variants={itemVariants}>
                <WeatherDetails data={weatherData.current} unit={unit} />
              </motion.div>

              <motion.div variants={itemVariants}>
                <DailyForecast data={weatherData.forecast} />
              </motion.div>
            </div>

            {/* Right side on desktop, bottom on mobile */}
            <motion.div
              variants={itemVariants}
              className="col-span-1 lg:col-span-4"
            >
              <HourlyForecast data={weatherData.forecast} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
