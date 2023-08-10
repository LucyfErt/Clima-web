import React from 'react';
import { render, fireEvent, screen,findByText, waitFor } from '@testing-library/react';
import LocationSearch from '../../src/components/Location/LocationSearch';
import '@testing-library/jest-dom';

describe('Pruebas en LocationSearch', () => {
  // Tests changing the input value
  it('updates city value when input changes', () => {
    const { getByPlaceholderText } = render(<LocationSearch />);
    const input = getByPlaceholderText('Change Location');
    fireEvent.change(input, { target: { value: 'London' }});
    // Asserts the value changed
    expect(input.value).toBe('London');
  });

 
  // Tests rendering weather data 
  it('displays weather data when available', async () => {

 // Mock datos de clima
  const mockData = {
    name: 'Buenos Aires',
    temp: 20,
  };
render(<LocationSearch data={mockData} />);

    // Finds elements with text from mock data
    const city = screen.findByText('Buenos Aires');
    const temp = screen.queryByText('Temperatura: 20°C');
    
   waitFor(()=> expect(city).toBeInTheDocument());
    waitFor(()=> expect(city).toHaveTextContent('Buenos Aires'));
    
    waitFor(()=>expect(temp).toBeInTheDocument());
    waitFor(()=> expect(temp).toHaveTextContent('Temperatura: 20°C'));
  });
});
