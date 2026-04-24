"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface SearchBarProps {
  onSearch: (city: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
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
    <section className="flex justify-center w-full px-1">
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
            src="/images/icon-search.svg"
            alt=""
            className="absolute left-3 md:left-5 top-1/2 -translate-y-1/2 w-5 h-5 md:w-6 md:h-6 opacity-40 group-focus-within:opacity-100 transition-opacity"
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.05, backgroundColor: "#3b82f6" }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="bg-brand-blue text-brand-white px-6 md:px-10 py-3 md:py-4 rounded-2xl font-bold text-base md:text-lg transition-all shadow-lg shadow-brand-blue/20"
        >
          Search
        </motion.button>
      </motion.form>
    </section>
  );
}
