const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Priority serve static files.
app.use(express.static(path.resolve(__dirname, '../front-end/build')));

// API requests.
app.get('/api', (req, res) => {
  res.set('Content-Type', 'application/json');
  res.send('{"message":"Hello from the custom server!"}');
});

// For everything else return React so it can route.
app.get('*', (request, response) => {
  response.sendFile(path.resolve(__dirname, '../front-end/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
