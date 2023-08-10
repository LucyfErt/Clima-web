import { render, waitFor } from '@testing-library/react';
import DailyForecast from '../../src/components/DailyForecast/DailyForecast';
import {screen} from '@testing-library/react';

describe('DailyForecast', () => {
  it('displays forecast data', () => {

    const forecastData = {

            city: 'London',
          
            list: [
              {
                dt: 1674594400, // epoch timestamp 
                main: {
                  temp: 10,
                  feels_like: 8,
                 humidity: 70  
                }
              },
              {
                dt: 1674603600,
                main: {
                  temp: 12,
                  feels_like: 10,
                  humidity: 75
                }
              }
            ]
          
    }; 

    render(<DailyForecast data={forecastData} />);


    // Verifica condicional de carga
    waitFor(()=> expect(screen.queryByText('Loading...')).not.toBeInTheDocument());

    // Verifica formato de fecha
    waitFor(()=> expect(screen.getByText('Date: MM/DD/YYYY')).toBeInTheDocument());

    // Verifica renderizado de items
    waitFor(()=> expect(screen.getAllByText('12:00 PM')).toHaveLength(5)); //5 items

    // Verifica datos dinámicos
    waitFor(()=> expect(screen.getByText('10°C')).toBeInTheDocument());

  });
});