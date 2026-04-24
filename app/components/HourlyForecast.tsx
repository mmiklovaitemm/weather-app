"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface HourlyForecastProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  loading?: boolean;
}

export default function HourlyForecast({ data, loading }: HourlyForecastProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState(
    new Date().toLocaleDateString("en-US", { weekday: "long" }),
  );

  const isDataLoading = loading || !data;
  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const getWeatherIcon = (main: string) => {
    switch (main.toLowerCase()) {
      case "clouds":
        return "icon-partly-cloudy.webp";
      case "rain":
        return "icon-rain.webp";
      case "snow":
        return "icon-snow.webp";
      case "clear":
        return "icon-sunny.webp";
      case "thunderstorm":
        return "icon-storm.webp";
      case "drizzle":
        return "icon-rain.webp";
      default:
        return "icon-fog.webp";
    }
  };

  const filteredHours = isDataLoading
    ? Array(8).fill(null)
    : data.list
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .filter((item: any) => {
          const itemDay = new Date(item.dt * 1000).toLocaleDateString("en-US", {
            weekday: "long",
          });
          return itemDay === selectedDay;
        })
        .slice(0, 8)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .map((item: any) => ({
          time: new Date(item.dt * 1000).toLocaleTimeString("en-US", {
            hour: "numeric",
            hour12: true,
          }),
          temp: `${Math.round(item.main.temp)}°`,
          icon: getWeatherIcon(item.weather[0].main),
        }));

  return (
    <aside className="bg-brand-card border border-brand-border rounded-[32px] md:rounded-[40px] p-6 md:p-8 flex flex-col h-full w-full relative">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-heading text-lg md:text-xl font-bold text-brand-white">
          Hourly forecast
        </h3>

        {/* DAY SELECTOR DROPDOWN */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="bg-brand-border/30 px-3 py-1.5 rounded-xl text-[10px] md:text-xs font-bold border border-brand-border text-brand-white flex items-center gap-2 hover:bg-brand-border/50 transition-all"
          >
            {selectedDay}
            <motion.img
              animate={{ rotate: isDropdownOpen ? 180 : 0 }}
              src="/weather-app/images/icon-dropdown.svg"
              className="w-2 h-2"
              alt=""
            />
          </button>

          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="absolute right-0 mt-2 w-32 bg-[#21212c] border border-brand-border rounded-xl shadow-2xl z-50 overflow-hidden"
              >
                {daysOfWeek.map((day) => (
                  <button
                    key={day}
                    onClick={() => {
                      setSelectedDay(day);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-xs font-medium transition-colors ${
                      selectedDay === day
                        ? "text-brand-white bg-brand-blue/20"
                        : "text-brand-muted hover:text-brand-white hover:bg-brand-border/30"
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {filteredHours.map((item: any, index: number) => (
          <div
            key={index}
            className={`flex items-center justify-between py-3 px-5 rounded-[20px] bg-brand-dark/40 border border-brand-border/20 ${isDataLoading ? "animate-pulse opacity-40" : ""}`}
          >
            {isDataLoading || !item ? (
              <div className="w-full h-8 bg-brand-muted/10 rounded-lg" />
            ) : (
              <>
                <div className="flex items-center gap-4">
                  <img
                    src={`/weather-app/images/${item.icon}`}
                    className="w-8 h-8"
                    alt=""
                  />
                  <span className="text-brand-white font-bold text-sm">
                    {item.time}
                  </span>
                </div>
                <span className="text-brand-white font-bold text-base">
                  {item.temp}
                </span>
              </>
            )}
          </div>
        ))}
        {!isDataLoading && filteredHours.length === 0 && (
          <p className="text-center text-brand-muted text-xs py-10">
            No data available for this day.
          </p>
        )}
      </div>
    </aside>
  );
}
