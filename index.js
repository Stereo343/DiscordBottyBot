require('dotenv').config();
const Discord = require('discord.js');
const mysql = require('mysql');

const client = new Discord.Client();
let connection = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	pasword: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	charset: 'utf8mb4_general_ci'
});

connection.connect((err) => {
	if (err) throw err;
	console.log("Connected!")
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === 'is America safe yet ?') {
    msg.reply('Nope');
  }
  else {
  	let sql = "INSERT INTO messages (user, content, time) VALUES ?";
  	let date = new Date();
  	let values = [
  		[msg.author, msg.content, date]
  	]
  	connection.query(sql, [values], function (err, result) {
	    if (err) throw err;
	    console.log("1 record inserted");
	});
  }
});

client.login(process.env.DISCORD_TOKEN);