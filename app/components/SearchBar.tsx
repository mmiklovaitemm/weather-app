"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SearchBarProps {
  onSearch: (city: string) => void;
  loading?: boolean;
  error?: string | null;
}

export default function SearchBar({
  onSearch,
  loading,
  error,
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isUserSearching, setIsUserSearching] = useState(false); // Naujas flag'as
  const containerRef = useRef<HTMLDivElement>(null);

  const suggestions = ["London", "New York", "Tokyo", "Paris"];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setIsUserSearching(true);
      onSearch(query.trim());
      setShowSuggestions(false);
      (document.activeElement as HTMLElement)?.blur();
    }
  };

  return (
    <section
      className="flex flex-col items-center w-full px-1 relative z-[60]"
      ref={containerRef}
    >
      <motion.form
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        onSubmit={handleSubmit}
        className="flex flex-row gap-2 md:gap-4 w-full max-w-[700px] relative"
      >
        <div className="relative flex-1 group">
          <input
            type="text"
            value={query}
            onFocus={() => setShowSuggestions(true)}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a place..."
            className="w-full bg-brand-card border border-brand-border rounded-2xl py-3 px-10 md:py-4 md:px-14 focus:outline-none focus:border-brand-blue transition-all placeholder:text-brand-muted text-base md:text-lg text-brand-white shadow-inner"
          />
          <img
            src="/weather-app/images/icon-search.svg"
            alt=""
            className="absolute left-3 md:left-5 top-1/2 -translate-y-1/2 w-5 h-5 md:w-6 md:h-6 opacity-40 group-focus-within:opacity-100 transition-opacity"
          />

          <AnimatePresence>
            {showSuggestions && !loading && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                className="absolute top-[110%] left-0 w-full bg-[#21212c] border border-brand-border rounded-2xl overflow-hidden shadow-2xl z-[70]"
              >
                {suggestions.map((city) => (
                  <button
                    key={city}
                    type="button"
                    onClick={() => {
                      setQuery(city);
                      setIsUserSearching(true);
                      onSearch(city);
                      setShowSuggestions(false);
                    }}
                    className="w-full text-left px-6 py-3 text-brand-muted hover:text-brand-white hover:bg-brand-border/30 transition-colors border-b border-brand-border/50 last:border-0"
                  >
                    {city}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
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

      <div className="w-full max-w-[700px] relative">
        <AnimatePresence mode="wait">
          {/* Rodyti tik tada, kai vartotojas paspaudė paiešką */}
          {loading && isUserSearching ? (
            <motion.div
              key="loading-dropdown"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-0 mt-2 w-full bg-[#21212c] border border-brand-border rounded-xl p-3 flex items-center gap-3 shadow-2xl z-[65]"
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
          ) : error ? (
            <motion.div
              key="error-message"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-8 flex flex-col items-center justify-center w-full"
            >
              <span className="text-brand-white text-lg md:text-xl font-bold tracking-tight">
                No search result found!
              </span>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </section>
  );
}
