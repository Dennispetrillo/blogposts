const express = require('express');
const morgan = require('morgan');
const app = express();
const blogPostsRouter = require('./blogPostsRouter');

//log http layer
app.use(morgan('common'));
app.use(express.static('public'));
app.use('/blogPosts', blogPostsRouter);

app.listen(process.env.PORT || 8080, () => {
	console.log('Your app is listening on port ${process.env.PORT || 8080}')
});
