const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

let groceryItems = [
	{ id: 1, name: 'Apples' },
	{ id: 2, name: 'Bananas' },
	{ id: 3, name: 'Milk' },
];

app.get('/api/grocery-items', (req, res) => {
	res.json(groceryItems);
});

app.post('/api/grocery-items', (req, res) => {
	const newItem = { id: groceryItems.length + 1, name: req.body.name };
	groceryItems.push(newItem);
	res.json(newItem);
});

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
