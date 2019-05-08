const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const app = express();

app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/api/stats', function(req, res) {
  const data = JSON.parse(fs.readFileSync('stats.json'));
  return res.send(data);
});

// componentDidMount() -> is going to call the api asynchronously and grab the statistics data
// then once a game is over a post request will be sent to the server to modify the total wins and losses
// locally on the react side it will just modify the state instead of making another api call
// SHOULD THIS BE STORED IN BOARD OR GAME BECAUSE OF UNIDIRECTIONAL DATA

app.put('/api/stats/:result', function(req, res) {
  const data = JSON.parse(fs.readFileSync('stats.json'));

  if (req.params.result === 'tie') {
    console.log(data.ties);
    data.ties++;
  }
  if (req.params.result === 'loss') {
    console.log(data.losses);
    data.losses++;
  }

  fs.writeFileSync('stats.json', JSON.stringify(data));

  res.send();
});

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 8080);
