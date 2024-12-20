import { Router, type Request, type Response } from 'express';
const router = Router();

// import HistoryService from '../../service/historyService.js';
// import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', (req: Request, res: Response) => {
  const cityName = req.body.city; // Extract city name from request body

    if (!cityName) {
        return res.status(400).json({ error: 'City name is required' });
    }

    try {
        // Make a request to the OpenWeather API
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch weather data');
        }

        const weatherData = await response.json(); // Parse the JSON response
        res.json(weatherData); // Send the weather data back to the client
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching weather data' });
    }
    if (err) {
      return res.status(500).json({ error: 'Failed to read history file' });
  }

  const cities = JSON.parse(data || '[]'); // Parse existing cities or initialize an empty array

  // Check if the city already exists
  const cityExists = cities.find(city => city.name === newCity);
  if (cityExists) {
      return res.status(400).json({ error: 'City already exists in history' });
  }

  // Create a new city object
  const cityToSave = { id: cities.length + 1, name: newCity }; // Simple ID generation

  // Add the new city to the list
  cities.push(cityToSave);

  // Write the updated list back to the file
  fs.writeFile(historyFilePath, JSON.stringify(cities, null, 2), (err) => {
      if (err) {
          return res.status(500).json({ error: 'Failed to save city' });
      }
      res.status(201).json(cityToSave); // Respond with the saved city
  });
});

  // TODO: save city to search history;

// TODO: GET search history
router.get('/history', async (req: Request, res: Response) => {try {
  // Read the search history from the JSON file
  const data = await fs.promises.readFile(historyFilePath, 'utf8');
  
  // Parse the JSON data
  const searchHistory = JSON.parse(data || '[]'); // Default to an empty array if no data

  // Send the search history as a JSON response
  res.status(200).json(searchHistory);
} catch (error) {
  console.error('Error reading search history:', error);
  res.status(500).json({ error: 'Failed to retrieve search history' });
}});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req: Request, res: Response) => {});

export default router;
