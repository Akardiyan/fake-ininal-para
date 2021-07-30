const { Client, MessageAttachment } = require("discord.js");
const moment = require('moment');
const Canvas = require('canvas');
const db = require("quick.db")
Canvas.registerFont('OpenSans-Regular.otf', { family: 'newFont' })
moment.locale("tr");

exports.run = async (client, message, args) => {

    function rowyCharacter() {
        var text = "";
        var possible = "0123456789";
        var possible2 = "abcdefghijklmnopqrstuvwxyz";
        var possible3 = "0123456789";
        var possible4 = "-";
        var possible5 = "abcdefghijklmnopqrstuvwxyz";
        var possible6 = "...";
      
        for (var i = 0; i < 4; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
        for (var i = 0; i < 1; i++)
        text += possible2.charAt(Math.floor(Math.random() * possible2.length));
        for (var i = 0; i < 2; i++)
        text += possible3.charAt(Math.floor(Math.random() * possible3.length));
        for (var i = 0; i < 1; i++)
        text += possible4.charAt(Math.floor(Math.random() * possible4.length));
        for (var i = 0; i < 2; i++)
        text += possible5.charAt(Math.floor(Math.random() * possible5.length));
        for (var i = 0; i < 3; i++)
        text += possible6.charAt(Math.floor(Math.random() * possible6.length));
    
        return text;
        
      }

const rowyTarih = moment().format("DD/MM/YYYY")
if(!args[0])return;
if(args[0] > 1000) return;
const canvas = Canvas.createCanvas(770, 125);
const ctx = canvas.getContext('2d');

const background = await Canvas.loadImage('https://i.hizliresim.com/5bco9wh.png');
ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
ctx.fillStyle = '#2b2b2b';
ctx.font = '14px "newFont"';

let rowyRefNO = rowyCharacter()

 ctx.fillText(`${args[0]} TRY`, 425, 110);
 ctx.fillText(`${rowyTarih}`, 20, 70);
 ctx.fillText(`${rowyTarih}`, 20, 110);
 ctx.fillText(`${rowyRefNO}`, 658, 110);
 ctx.fillText(`${rowyRefNO}`, 658, 70);

 let psayiCheck = db.get(`rowyData.${message.author.id}.ininal`)
 message.delete({ timeout: 30000 }) 
 
ctx.strokeRect(0, 0, canvas.width, canvas.height);
const attachment = new MessageAttachment(canvas.toBuffer(), `ininal_${psayiCheck}.png`);
message.channel.send(attachment)

};

exports.config = {
    name: "ininal",
    aliases: ["ininal"],
  };
  
   