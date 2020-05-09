const chatbot = require('../chatbot/chatbot');
const config = require('../config/keys');

const twilioAccountID = config.twilioAccountID;
const twilioAuthToken = config.twilioAuthToken;
const myPhoneNumber = config.myPhoneNumber;

const client = require('twilio')(twilioAccountID,twilioAuthToken);


module.exports = app => {

	app.get('/', (req,res) => {
		res.send('hi')
	});

	app.post('/api/df_text_query', async (req,res) => {
		let responses = await chatbot.textQuery(req.body.text, req.body.parameters);		
		res.send(responses[0].queryResult);
	});

	app.post('/api/df_event_query', async (req,res) => {
		let responses = await chatbot.eventQuery(req.body.event, req.body.parameters);		
		res.send(responses[0].queryResult);
	});
	app.get('/api/whatsapp_query', async (req, res) =>{
		let message = await chatbot.textQuery(req.body.Body, req.body.parameters);
		res.send(message[0].queryResult);
	});
}

