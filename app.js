const express = require('express');
const app = express();
const Airport = require('./models/airport');

app.get('/api/airport/:iata_code', async (req, res) => {
  const iataCode = req.params.iata_code;
  const airport = await Airport.findOne({
    where: { iata_code: iataCode },
    include: [
      {
        model: City,
        include: [Country]
      }
    ]
  });

  if (!airport) {
    res.status(404).send({ message: 'Airport not found' });
  } else {
    res.json({
      airport: {
        id: airport.id,
        icao_code: airport.icao_code,
        iata_code: airport.iata_code,
        name: airport.name,
        type: airport.type,
        latitude_deg: airport.latitude_deg,
        longitude_deg: airport.longitude_deg,
        elevation_ft: airport.elevation_ft,
        address: {
          city: {
            id: airport.City.id,
            name: airport.City.name,
            country_id: airport.City.country_id,
            is_active: airport.City.is_active,
            lat: airport.City.lat,
            long: airport.City.long
          },
          country: airport.City.Country? {
            id: airport.City.Country.id,
            name: airport.City.Country.name,
            country_code_two: airport.City.Country.country_code_two,
            country_code_three: airport.City.Country.country_code_three,
            mobile_code: airport.City.Country.mobile_code,
            continent_id: airport.City.Country.continent_id
          } : null
        }
      }
    });
  }
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});