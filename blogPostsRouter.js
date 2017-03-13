const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const {BlogPosts} = require('./models');

//ahseed some recipes
BlogPosts.create('The book on nodejs', 'This is the node.js content', 'thinkful', '2017');
BlogPosts.create('The book on javaScript', 'this is the javascript content', 'Full Stack Academy', '2016');

router.post('/', jsonParser, function(req, res) {
	const requiredFields = ['title', 'content', 'author', 'publishDate'];
	for (var i=0; i<requiredFields.length; i++) {
		if (!(requiredFields[i] in req.body)) {
			const message = 'Missing ' + requiredFields[i] + ' in request body';
			console.error(message);
			return res.status(400).send(message);
		}
	}
	const item = BlogPosts.create(req.body.title, req.body.content, req.body.author, req.body.publishDate);
	res.status(201).json(item);
});

router.get('/', function(req, res) {
	res.json(BlogPosts.get());
});

router.delete('/:id', function(req, res) {
	BlogPosts.delete(req.params.id);
	console.log('Deleted BlogPosts ' + req.params.id);
	res.status(204).end();
});

router.put('/:id', jsonParser, function(req, res) {
	const requiredFields = ['title', 'content', 'author', 'publishDate'];
	for (var i=0; i<requiredFields.length; i++) {
		if (!(requiredFields[i] in req.body)) {
			const message = 'Missing ' + requiredFields[i] + ' in request body';
			console.error(message);
			return res.status(400).send(message);
		}
	}

	if (req.params.id !== req.body.id) {
    const message = ("id does not match");
    console.error(message);
    return res.status(400).send(message);
  }
	
	const updatedItem = BlogPosts.update({
		id: req.params.id,
		title: req.body.title,
		content: req.body.content,
		author: req.body.author,
		publishDate: req.body.publishDate
	})
	res.status(204).json(updatedItem);
});

module.exports = router;

