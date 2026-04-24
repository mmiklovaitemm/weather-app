"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SearchBarProps {
  onSearch: (city: string) => void;
  loading?: boolean;
}

export default function SearchBar({ onSearch, loading }: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedQuery = query.trim();

    if (trimmedQuery) {
      onSearch(trimmedQuery);
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
    }
  };

  return (
    <section className="flex flex-col items-center w-full px-1 relative z-50">
      <motion.form
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        onSubmit={handleSubmit}
        className="flex flex-row gap-2 md:gap-4 w-full max-w-[700px]"
      >
        <div className="relative flex-1 group">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a place..."
            className="w-full bg-brand-card border border-brand-border rounded-2xl py-3 px-10 md:py-4 md:px-14 focus:outline-none focus:border-brand-blue transition-all placeholder:text-brand-muted text-base md:text-lg text-brand-white shadow-inner"
          />
          <img
            src="/weather-app/images/icon-search.svg"
            alt=""
            className="absolute left-3 md:left-5 top-1/2 -translate-y-1/2 w-5 h-5 md:w-6 md:h-6 opacity-40 group-focus-within:opacity-100 transition-opacity"
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.05, backgroundColor: "#3b82f6" }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          disabled={loading}
          className={`bg-brand-blue text-brand-white px-6 md:px-10 py-3 md:py-4 rounded-2xl font-bold text-base md:text-lg transition-all shadow-lg shadow-brand-blue/20 ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          Search
        </motion.button>
      </motion.form>

      {/* SEARCH IN PROGRESS DROPDOWN  */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-[100%] mt-2 w-full max-w-[700px] bg-[#21212c] border border-brand-border rounded-xl p-3 flex items-center gap-3 shadow-2xl"
          >
            <img
              src="/weather-app/images/icon-loading.svg"
              alt=""
              className="w-5 h-5 animate-spin"
            />
            <span className="text-brand-white text-sm font-medium">
              Search in progress
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
