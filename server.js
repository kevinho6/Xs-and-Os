const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const app = express();

app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/api/stats', function(req, res) {
  const data = JSON.parse(fs.readFileSync('stats.json'));
  res.send(data);
});

app.put('/api/stats/:result', function(req, res) {
  const data = JSON.parse(fs.readFileSync('stats.json'));

  if (req.params.result === 'tie') {
    data.ties++;
  }
  if (req.params.result === 'loss') {
    data.losses++;
  }

  fs.writeFileSync('stats.json', JSON.stringify(data));
  res.send(data);
});

app.listen(process.env.PORT || 8080);
