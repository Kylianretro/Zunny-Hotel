const figlet = require('figlet');
const colors = require('colors');
const Discord = require('discord.js');
const mysql = require('mysql');
const bot = new Discord.Client();

var database = mysql.createConnection({
	host: "db1.free-h.org",
	user: "freeh_100345_59",
	password: "z3LYo85E",
	database: "freeh_db_100345",
	charset: "utf8mb4",
});


database.connect(function(err) {
    if(err) throw err;
	console.log(`[Zunny Hotel]`.yellow + ` Base de données => ` + `En ligne`.green )
});

var prefix = ("?");

figlet.text('HCord', {
	font: 'Ghost',
	horizontalLayout: 'default',
	verticalLayout: 'default'
	}, function(err, data) {
	if (err) {
		console.log('[HabboCord]'.yellow + ' Une erreur est survenue...');
        console.dir(err);
        return;
    }
    console.log(data.yellow + "\n");
});

bot.on('ready', function() {
	console.log(`[HabboCord]`.yellow + ` BOT => ` + `En ligne`.green);
})

bot.login("NTkwNDYxNjIwODIwMzc3NjEx.XQikgQ.z3zD_IPnRIUFt8Ye094b6n729Mw");

bot.on('message', message => {
	if(message.content === prefix + "commands") {
		message.reply("voici la liste des commandes disponible : \n\n ?commands -> Voir la liste des commandes\n ?about -> Voir les informations sur le BOT \n ?online -> Voir le nombre de connectés sur l'hôtel \n ?mostcredits -> Voir qui a le plus de crédits\n ?mostdiamants -> Voir qui a le plus de diamants \n ?staffs -> Voir la liste des staffs");
	}
	
	if(message.content === prefix + "online") {
		database.query('SELECT online FROM users WHERE online = ?', ['1'], function(err, about) {
			message.reply(`il y a ${about.length} connectés dans l'hôtel.`);
		})
	}
	
	if(message.content === prefix + "mostcredits") {
		database.query('SELECT credits, username FROM users ORDER BY credits DESC LIMIT 1', function(err, credits) {
			message.reply(`celui qui a le plus de crédits dans l'hôtel est ${credits[0].username} avec ${credits[0].credits} crédits.`);
		})
	}
	
	if(message.content === prefix + "mostdiamants") {
		database.query('SELECT activity_points, username FROM users ORDER BY activity_points DESC LIMIT 1', function(err, activity) {
			message.reply(`celui qui a le plus de crédits dans l'hôtel est ${activity[0].username} avec ${activity[0].activity_points} diamants.`);
		})
	}
	
	if(message.content === prefix + "about") {
		message.channel.send('Développeur: KylianR\nDate de création: 18/06/2019\nVersion: 1.0');
	}
	
	if(message.content === prefix + "staffs") {
		database.query('SELECT rank, username FROM users WHERE rank >= 5', function(err, staffs) {
			var staffs_list = [];
			var staff = "";
			
			Object.keys(staffs).forEach(function(key) {
				staffs_list.push(staffs[key]);
			});
			
			for(var i=0; i < staffs_list.length; i++) { 
				staff += staffs_list[i].username + '\n';							  
			};

			message.reply(`voici la liste des staffs: \n\n${staff}`);
		})
	}
})