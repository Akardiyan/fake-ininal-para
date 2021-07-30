const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
const ayarlar = require('./ayarlar.json');

client.on("message", async message => {
	let prefix = ayarlar.prefix
	const messageArray = message.content.split(" ");
	const cmd = messageArray[0].toLowerCase();
	const args = messageArray.slice(1);
	if (!message.content.startsWith(prefix)) return;
	const commandfile =
	  client.commands.get(cmd.slice(prefix.length)) ||
	  client.commands.get(client.aliases.get(cmd.slice(prefix.length)));
	if (commandfile) commandfile.run(client, message, args);
  });
  
  client.commands = new Discord.Collection();
  client.aliases = new Discord.Collection();
  
  fs.readdir("./komutlar/", (err, files) => {
	const jsfiles = files.filter(f => f.split(".").pop() === "js");
	if (jsfiles.length <= 0) {
	  return console.log("Herhangi bir komut bulunamadı!");
	}
	jsfiles.forEach(file => {
	  console.log(`${file} Komutu Hazır`);
	  const command = require(`./komutlar/${file}`);
	  client.commands.set(command.config.name, command);
	  command.config.aliases.forEach(alias => {
		client.aliases.set(alias, command.config.name);
	  });
	});
  });
  
  //------------- Discord'a Giriş ---------------\\
  
  client.login(ayarlar.token).then(
	function() {
	  console.log("Tüm Sistemler Çalışır Durumda Bot Başlatılıyor...");
	},
	function(err) {
	  console.log("Malesef Tüm Sistemler Çalışır Değil Tekrar Deneniyor...");
	  setInterval(function() {
		process.exit(0);
	  }, 20000);
	}
  );