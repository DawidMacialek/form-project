const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 4000;
const routes = require('./routes/api');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', routes);
// app.use(express.static(path.resolve(__dirname, '../build')));
// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, '../build', 'index.html'));
// });

// app.get('/api', (req, res) => {
//   res.json({ message: 'Hello from server' });
//   console.log('dziala');
// });

const server = app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

const portNumber = server.address().port;
console.log(`server is working on ${portNumber}`);