require('dotenv').config()
const app = require('./app')

const port = process.env.PORT || 3000

// Server listening on port
app.listen(port, () => {
  console.log(`Listening on port ${process.env.PORT}.`);
});