const { convertKelvinToCelsius } = require('../src/utils/conversionUtils');


test('Temperature conversion from Kelvin to Celsius', () => {
    const kelvin = 300;
    const expectedCelsius = 26.85;
    
    expect(convertKelvinToCelsius(kelvin)).toBeCloseTo(expectedCelsius, 2);
});