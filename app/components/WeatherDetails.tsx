// app/components/WeatherDetails.tsx

interface WeatherDetailsProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  unit: "metric" | "imperial";
}

export default function WeatherDetails({ data, unit }: WeatherDetailsProps) {
  if (!data) return null;

  const windUnit = unit === "metric" ? "m/s" : "mph";

  const precipValue = data.rain?.["1h"] || data.snow?.["1h"] || 0;

  const displayPrecip =
    unit === "metric"
      ? `${precipValue} mm`
      : `${(precipValue * 0.03937).toFixed(2)} in`;

  const details = [
    {
      label: "Feels Like",
      value: `${Math.round(data.main.feels_like)}°`,
    },
    {
      label: "Humidity",
      value: `${data.main.humidity}%`,
    },
    {
      label: "Wind",
      value: `${Math.round(data.wind.speed)} ${windUnit}`,
    },
    {
      label: "Precipitation",
      value: displayPrecip,
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 w-full">
      {details.map((detail, index) => (
        <div
          key={index}
          className="bg-brand-card border border-brand-border rounded-[24px] md:rounded-[32px] p-4 md:p-6 flex flex-col gap-2 md:gap-4 hover:border-brand-blue transition-colors cursor-default min-w-0"
        >
          <span className="text-brand-muted text-[10px] md:text-sm font-medium uppercase tracking-wider">
            {detail.label}
          </span>
          <span className="text-xl md:text-3xl font-bold text-brand-white truncate">
            {detail.value}
          </span>
        </div>
      ))}
    </div>
  );
}
