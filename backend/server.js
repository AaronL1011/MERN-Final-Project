const app = require('./app');

// Define port for server to listen on
const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Listening on port ${PORT}`));
