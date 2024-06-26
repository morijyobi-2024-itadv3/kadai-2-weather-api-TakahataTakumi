export type TypeResponse = {
  pref: string;
  area: string;
  today: {
    weather: string;
    tempHigh: string;
    tempLow: string | "-";
    timeDefined: string;
  };
  tomorrow: {
    weather: string;
    tempHigh: string;
    tempLow: string;
    timeDefined: string;
  };
};
