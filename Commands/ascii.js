const Discord = require('discord.js')
const colors = require('../colors.json')
const client = require('../index.js')
const db = require('quick.db')
const figlet = require('figlet')

module.exports = {
    name: 'ascii',
    description: 'Transform your text to ascii',
    usage: 'ascii <text>',
    category: 'Fun',
    guildOnly: true,
    async execute(message, args){

        let noArgsEmbed = new Discord.MessageEmbed()
            .setColor(colors.red)
            .setDescription("Proporcione un texto")
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))

        if(!args[0]) return message.channel.send(noArgsEmbed);

        msg = args.join(" ");

        figlet.text(msg, function (err, data){
            if(err){
                console.log('Algo salió mal');
                console.dir(err);
            }
            if(data.length > 2000) return message.channel.send('Proporcione un texto de menos de 2000 caracteres.')

            message.channel.send('```' + data + '```')
        })
    }
}