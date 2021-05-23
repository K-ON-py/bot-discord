const Discord = require('discord.js')
const colors = require('../colors.json')
const client = require('../index.js')
const db = require('quick.db')

module.exports = {
    name: 'invite',
    description: 'Invite this bot to your server!',
    usage: 'invite',
    category: 'Utility',
    guildOnly: true,
    async execute(message, args) {
        let tosEmbed = new Discord.MessageEmbed()
            .setColor(colors.orange)
            .setTimestamp()
            .setFooter(message.client.user.username, message.client.user.displayAvatarURL())
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setDescription("Al utilizar este bot en su servidor, acepta nuestros términos de servicio que se indican a continuación\n:**advertencia: ** Si no está de acuerdo con esto, su servidor y usuario serán incluidos en la lista negra de este bot.**")
            .addField('**1.** Este bot no formará parte de ninguna incursión o ataque nuclear en ningún servidor.')
            .addField('**2.** Discord ToS', 'No debe abusar de ninguna regla del [Discord ToS.](https://discord.com/terms)')
            .addField('**3.** Comandos personalizados', 'Algunos comandos que puedes ver en nuestro [support server]()')
            .addField('Confirmando su entrada:', '```\nPara confirmar que está de acuerdo con nuestras Condiciones de servicio, reaccione con ✅\nIf no ve la reacción, por favor espere 10 segundos\n```')
        message.channel.send(tosEmbed).then(sMessage => {
            setTimeout(() => {
                sMessage.react('✅')
            }, 5000)

            const filter = (reaction, user) => {
                return ['✅', '❌'].includes(reaction.emoji.name) && user.id === message.author.id;
            };

            sMessage.awaitReactions(filter, {
                max: 1,
                time: 30000,
                errors: ['time']
            }).then(async collected => {
                const reaction = collected.first();
                if (reaction.emoji.name === "✅") {
                    
                    let userReactions = (sMessage.reactions.cache.filter(reaction => reaction.users.cache.has(message.author.id)))
                    for (const reaction of userReactions.values()) {
                        await reaction.users.remove(message.author.id);
                    }
                    reaction.users.remove(message.client.user.id)

                    let editEmbed = new Discord.MessageEmbed()
                        .setTitle(`${message.client.user.username} Bot Invite + Support`)
                        .setColor(colors.orange)
                        .setTimestamp()
                        .setFooter(message.client.user.username, message.client.user.displayAvatarURL())
                        .setThumbnail(message.client.user.avatarURL())
                        .setDescription(`Discord: Proximamente, Invite:https://discord.com/api/oauth2/authorize?client_id=828991297116700682&permissions=8&scope=bot`)
                    sMessage.edit(editEmbed)
                }
            })
        })
    }
}