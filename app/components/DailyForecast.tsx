// app/components/DailyForecast.tsx

interface DailyForecastProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
}

export default function DailyForecast({ data }: DailyForecastProps) {
  if (!data) return null;

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

  const days = data.list
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .filter((item: any) => item.dt_txt.includes("12:00:00"))
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .map((item: any) => {
      const date = new Date(item.dt * 1000);
      return {
        day: date.toLocaleDateString("en-US", { weekday: "short" }),
        high: `${Math.round(item.main.temp_max)}°`,
        low: `${Math.round(item.main.temp_min)}°`,
        icon: getWeatherIcon(item.weather[0].main),
        description: item.weather[0].description,
      };
    });

  return (
    <div className="mt-4">
      <h3 className="font-heading text-xl font-bold mb-6 text-brand-white px-1">
        Daily forecast
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-4">
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {days.map((item: any, index: number) => (
          <div
            key={index}
            className="bg-brand-card border border-brand-border rounded-3xl p-4 md:p-5 flex flex-col items-center gap-3 md:gap-4 transition-all hover:border-brand-blue group cursor-pointer"
          >
            <span className="text-brand-muted font-medium text-xs md:text-sm">
              {item.day}
            </span>
            <img
              src={`/weather-app/images/${item.icon}`}
              alt={item.description}
              className="w-10 h-10 md:w-12 md:h-12 drop-shadow-md group-hover:scale-110 transition-transform"
              title={item.description}
            />
            <div className="flex flex-col items-center">
              <span className="text-brand-white font-bold text-sm md:text-base">
                {item.high}
              </span>
              <span className="text-brand-muted text-xs md:text-sm">
                {item.low}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
