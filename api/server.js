const express = require('express'),
      bodyParser = require('body-parser'),
      morgan = require('morgan'),
	  fs = require('file-system'),
	  shortId = require('shortid'),
	  dbFilePath = 'cards.json',
      app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(morgan('common'));
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});

app.get('/api/cards', (req, res) => res.send(getTasksFromDB()));

app.get('/api/card/:id', (req, res) => {
	const cardsData = getTasksFromDB(),
		card = cardsData.find(card => card.id === req.params.id);

    card ? res.send(card) : res.send({});
});

function getTasksFromDB() {
    return JSON.parse(fs.readFileSync(dbFilePath, 'utf8'));
}

function setTasksToDB(cardsData) {
    fs.writeFileSync(dbFilePath, JSON.stringify(cardsData));
}

app.listen(3000, () => console.log('Server has been started...'));
