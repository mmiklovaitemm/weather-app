// app/components/HourlyForecast.tsx

interface HourlyForecastProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
}

export default function HourlyForecast({ data }: HourlyForecastProps) {
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const hours = data.list.slice(0, 8).map((item: any) => {
    const date = new Date(item.dt * 1000);
    return {
      time: date.toLocaleTimeString("en-US", { hour: "numeric", hour12: true }),
      temp: `${Math.round(item.main.temp)}°`,
      icon: getWeatherIcon(item.weather[0].main),
    };
  });

  return (
    <aside className="bg-brand-card border border-brand-border rounded-[32px] md:rounded-[40px] p-6 md:p-8 flex flex-col h-full w-full max-w-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-heading text-lg md:text-xl font-bold text-brand-white">
          Hourly forecast
        </h3>
        <div className="bg-brand-border/30 px-3 py-1.5 rounded-xl text-[10px] md:text-xs font-bold border border-brand-border text-brand-white capitalize">
          {new Date().toLocaleDateString("en-US", { weekday: "long" })}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {hours.map((item: any, index: number) => (
          <div
            key={index}
            className="flex items-center justify-between py-3 px-5 md:px-6 rounded-[20px] md:rounded-[24px] bg-brand-dark/40 border border-brand-border/20 group transition-all"
          >
            <div className="flex items-center gap-4">
              <img
                src={`/images/${item.icon}`}
                alt=""
                className="w-8 h-8 md:w-10 md:h-10 drop-shadow-md group-hover:scale-110 transition-transform"
              />
              <span className="text-brand-white font-bold text-sm md:text-base tracking-wide">
                {item.time}
              </span>
            </div>
            <span className="text-brand-white font-bold text-base md:text-lg">
              {item.temp}
            </span>
          </div>
        ))}
      </div>
    </aside>
  );
}
