"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface HeaderProps {
  unit: "metric" | "imperial";
  onUnitChange: (newUnit: "metric" | "imperial") => void;
}

export default function Header({ unit, onUnitChange }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleUnitSelect = (newUnit: "metric" | "imperial") => {
    onUnitChange(newUnit);
    setIsOpen(false);
  };

  return (
    <header className="w-full flex flex-col gap-10 md:gap-16">
      {/* Top nav */}
      <div className="flex justify-between items-center w-full relative">
        <div className="flex items-center gap-3">
          <img
            src="/weather-app/images/logo.svg"
            alt="Weather Now Logo"
            className="w-40 h-8 md:w-60 md:h-10 object-contain"
          />
        </div>

        <div className="relative">
          {/* Units Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 bg-brand-card border border-brand-border px-4 py-2 md:px-5 md:py-2.5 rounded-2xl hover:border-brand-blue transition-colors group"
          >
            <img
              src="/weather-app/images/icon-units.svg"
              alt=""
              className="w-4 h-4 md:w-5 md:h-5 opacity-70 group-hover:opacity-100 transition-opacity"
            />
            <span className="font-semibold text-brand-white text-sm md:text-base">
              Units
            </span>
            <motion.img
              animate={{ rotate: isOpen ? 180 : 0 }}
              src="/weather-app/images/icon-dropdown.svg"
              alt=""
              className="w-2.5 h-2.5 md:w-3 md:h-3 ml-1"
            />
          </motion.button>

          {/* Animated Dropdown Menu */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute right-0 mt-3 w-56 md:w-64 bg-brand-card border border-brand-border rounded-3xl p-2 z-[100] shadow-[0_20px_50px_rgba(0,0,0,0.5)] origin-top-right"
              >
                <button
                  onClick={() =>
                    handleUnitSelect(unit === "metric" ? "imperial" : "metric")
                  }
                  className="w-full text-left px-4 py-3 hover:bg-brand-border/30 rounded-2xl transition-colors font-medium text-brand-white text-sm md:text-base"
                >
                  Switch to {unit === "metric" ? "Imperial" : "Metric"}
                </button>

                <div className="h-[1px] bg-brand-border my-1" />

                {/* Temperature Section */}
                <div className="px-4 py-2">
                  <p className="text-[10px] md:text-xs font-bold text-brand-muted uppercase tracking-wider mb-2">
                    Temperature
                  </p>
                  <div className="flex flex-col gap-1 text-xs md:text-sm">
                    <div
                      onClick={() => handleUnitSelect("metric")}
                      className={`flex justify-between items-center py-2 px-2 cursor-pointer transition-colors rounded-lg -mx-2 ${
                        unit === "metric"
                          ? "text-brand-white bg-brand-border/10"
                          : "text-brand-muted hover:text-brand-white"
                      }`}
                    >
                      <span>Celsius (°C)</span>
                      {unit === "metric" && (
                        <img
                          src="/weather-app/images/icon-checkmark.svg"
                          className="w-4 h-4"
                          alt=""
                        />
                      )}
                    </div>
                    <div
                      onClick={() => handleUnitSelect("imperial")}
                      className={`flex justify-between items-center py-2 px-2 cursor-pointer transition-colors rounded-lg -mx-2 ${
                        unit === "imperial"
                          ? "text-brand-white bg-brand-border/10"
                          : "text-brand-muted hover:text-brand-white"
                      }`}
                    >
                      <span>Fahrenheit (°F)</span>
                      {unit === "imperial" && (
                        <img
                          src="/weather-app/images/icon-checkmark.svg"
                          className="w-4 h-4"
                          alt=""
                        />
                      )}
                    </div>
                  </div>
                </div>

                <div className="h-[1px] bg-brand-border my-1" />

                {/* Wind Speed Section */}
                <div className="px-4 py-2">
                  <p className="text-[10px] md:text-xs font-bold text-brand-muted uppercase tracking-wider mb-2">
                    Wind Speed
                  </p>
                  <div className="flex flex-col gap-1 text-xs md:text-sm">
                    <div
                      onClick={() => handleUnitSelect("metric")}
                      className={`flex justify-between items-center py-2 px-2 cursor-pointer rounded-lg -mx-2 ${unit === "metric" ? "text-brand-white" : "text-brand-muted"}`}
                    >
                      <span>km/h</span>
                      {unit === "metric" && (
                        <img
                          src="/weather-app/images/icon-checkmark.svg"
                          className="w-4 h-4"
                          alt=""
                        />
                      )}
                    </div>
                    <div
                      onClick={() => handleUnitSelect("imperial")}
                      className={`flex justify-between items-center py-2 px-2 cursor-pointer rounded-lg -mx-2 ${unit === "imperial" ? "text-brand-white" : "text-brand-muted"}`}
                    >
                      <span>mph</span>
                      {unit === "imperial" && (
                        <img
                          src="/weather-app/images/icon-checkmark.svg"
                          className="w-4 h-4"
                          alt=""
                        />
                      )}
                    </div>
                  </div>
                </div>

                <div className="h-[1px] bg-brand-border my-1" />

                {/* Precipitation Section */}
                <div className="px-4 py-2">
                  <p className="text-[10px] md:text-xs font-bold text-brand-muted uppercase tracking-wider mb-2">
                    Precipitation
                  </p>
                  <div className="flex flex-col gap-1 text-xs md:text-sm">
                    <div
                      onClick={() => handleUnitSelect("metric")}
                      className={`flex justify-between items-center py-2 px-2 cursor-pointer rounded-lg -mx-2 ${unit === "metric" ? "text-brand-white" : "text-brand-muted"}`}
                    >
                      <span>Millimeters (mm)</span>
                      {unit === "metric" && (
                        <img
                          src="/weather-app/images/icon-checkmark.svg"
                          className="w-4 h-4"
                          alt=""
                        />
                      )}
                    </div>
                    <div
                      onClick={() => handleUnitSelect("imperial")}
                      className={`flex justify-between items-center py-2 px-2 cursor-pointer rounded-lg -mx-2 ${unit === "imperial" ? "text-brand-white" : "text-brand-muted"}`}
                    >
                      <span>Inches (in)</span>
                      {unit === "imperial" && (
                        <img
                          src="/weather-app/images/icon-checkmark.svg"
                          className="w-4 h-4"
                          alt=""
                        />
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="text-center text-brand-white px-2">
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-heading text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-tight"
        >
          How’s the sky <br className="sm:hidden" /> looking today?
        </motion.h1>
      </div>
    </header>
  );
}
