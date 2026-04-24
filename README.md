# 🌤️ Weather Now - Modern Weather Forecast App

A sleek, responsive, and highly interactive weather application built with **Next.js 15**, **TypeScript**, and **Tailwind CSS**. This app provides real-time weather data, hourly forecasts for any day of the week, and a beautiful UI designed for the best user experience.

🔗 **Live Demo:** [mmiklovaitemm.github.io/weather-app/](https://mmiklovaitemm.github.io/weather-app/)

---

## Features

* **Real-time Weather:** Get current conditions including temperature, "feels like", humidity, wind speed, and precipitation.
* **Dynamic Search:** Search for any city worldwide with smart suggestions for major global hubs.
* **Interactive Hourly Forecast:** A unique day-selector allows you to view hourly weather predictions for every day of the week.
* **5-Day Daily Forecast:** High and low temperatures for the upcoming week at a glance.
* **Unit Switching:** Seamlessly toggle between **Metric** (Celsius, m/s, mm) and **Imperial** (Fahrenheit, mph, inches) systems.
* **UI/UX:** Features custom-designed glassmorphism cards, smooth Framer Motion animations, and specialized weather icons.
* **Error Handling:** Custom "No results found" and full-screen API error states with retry functionality.
* **Loaders:** Professional loading states (skeletons) ensure a smooth visual experience while data is being fetched.

---

## Tech Stack

* **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
* **Language:** [TypeScript](https://www.typescriptlang.org/)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Animations:** [Framer Motion](https://www.framer.com/motion/)
* **API:** [OpenWeatherMap API](https://openweathermap.org/api)
* **Deployment:** GitHub Pages

---

## Getting Started

### Prerequisites

* Node.js 18.x or later
* An API Key from [OpenWeatherMap](https://home.openweathermap.org/users/sign_up)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/mmiklovaitemm/weather-app.git](https://github.com/mmiklovaitemm/weather-app.git)
    cd weather-app
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env.local` file in the root directory and add your API key:
    ```env
    NEXT_PUBLIC_OPENWEATHER_API_KEY=your_api_key_here
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

Developed with ❤️ by [mmiklovaitemm](https://github.com/mmiklovaitemm)
