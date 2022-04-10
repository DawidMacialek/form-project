const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4000;
const routes = require('./routes/api');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', routes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, '../build')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../build', 'index.html'));
  });
}

const server = app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

const portNumber = server.address().port;
console.log(`server is working on ${portNumber}`);
