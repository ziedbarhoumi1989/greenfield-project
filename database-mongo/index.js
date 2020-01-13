const mongoose = require('mongoose');

//Promise
mongoose.Promise = global.Promise;

// create connection
var dbName = 'eventsmanager';
mongoose.connect(`mongodb://localhost/${dbName}`, { useUnifiedTopology: true, useNewUrlParser: true }, function(
	err,
	db
) {
	if (err) throw err;
	console.log(`database ${dbName} was created`);
});

// add event open the connection and handle the error
mongoose.connection
	.once('open', () => {
		console.log('the connection was made');
	})
	.on('error', (error) => {
		console.log('faild to connect to database');
	});
