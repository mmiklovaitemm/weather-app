// app/components/CurrentWeather.tsx

interface CurrentWeatherProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
}

export default function CurrentWeather({ data }: CurrentWeatherProps) {
  if (!data) return null;

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const temp = Math.round(data.main.temp);

  const getWeatherIcon = (main: string) => {
    switch (main.toLowerCase()) {
      case "clouds":
        return "/weather-app/images/icon-partly-cloudy.webp";
      case "rain":
        return "/weather-app/images/icon-rain.webp";
      case "snow":
        return "/weather-app/images/icon-snow.webp";
      case "clear":
        return "/weather-app/images/icon-sunny.webp";
      case "thunderstorm":
        return "/weather-app/images/icon-storm.webp";
      case "drizzle":
        return "/weather-app/images/icon-rain.webp";
      default:
        return "/weather-app/images/icon-fog.webp";
    }
  };

  const weatherIcon = getWeatherIcon(data.weather[0].main);

  return (
    <section className="relative overflow-hidden bg-brand-blue rounded-[32px] p-8 md:p-10 text-brand-white min-h-[280px] md:min-h-[320px] flex items-center shadow-xl w-full max-w-full">
      <img
        src="/weather-app/images/bg-today-large.svg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />

      <div className="relative z-10 w-full flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-6 md:gap-0 px-2">
        <div className="flex flex-col gap-1">
          <h2 className="font-heading text-2xl md:text-3xl font-bold">
            {data.name}, {data.sys.country}
          </h2>
          <p className="text-sm md:text-base opacity-80">{today}</p>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6">
          <img
            src={weatherIcon}
            alt={data.weather[0].description}
            className="w-24 h-24 md:w-36 md:h-36 drop-shadow-xl object-contain"
          />
          <div className="relative">
            <span className="text-6xl md:text-[110px] font-bold leading-none tracking-tighter">
              {temp}
            </span>
            <span className="absolute top-0 md:top-4 -right-4 md:-right-8 text-2xl md:text-4xl font-light">
              °
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
