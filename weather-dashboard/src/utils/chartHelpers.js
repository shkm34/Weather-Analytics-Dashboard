/**
 * transform forecast data for temp line chart
 * params- forecastDays from api, tempUnit
 * return array - chat data
 */

export const prepareTempData = (forecastDays, tempUnit) => {
    return forecastDays.map((day) => {
        const date = new Date(day.date)
        const dayName = date.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
        });

        return {
            date: dayName,
            high: Math.round(tempUnit === 'C' ? day.day.maxtemp_c : day.day.maxtemp_f),
            low: Math.round(tempUnit === 'C' ? day.day.mintemp_c : day.day.mintemp_f),
            avg: Math.round(tempUnit === 'C' ? day.day.avgtemp_c : day.day.avgtemp_f),
        };
    })
}

/**
 * transform hourly data
 * oarams - hourlyData from API
 * returns - [{}]
 */
export const preparePrecipitationData = (hourlyData) => {
  return hourlyData.map((hour) => {
    const time = new Date(hour.time).toLocaleTimeString('en-US', { 
      hour: 'numeric',
      hour12: true 
    });

    return {
      time,
      precipitation: hour.precip_mm,
      chanceOfRain: hour.chance_of_rain,
    };
  });
};

// for WindSpeed data
export const prepareWindData = (hourlyData) => {
  return hourlyData.map((hour) => {
    const time = new Date(hour.time).toLocaleTimeString('en-US', { 
      hour: 'numeric',
      hour12: true 
    });

    return {
      time,
      windSpeed: hour.wind_kph,
      gustSpeed: hour.gust_kph,
    };
  });
};