const Discord = require("discord.js");
const { parse } = require("twemoji-parser");
const { MessageEmbed } = require("discord.js");
const Color = `RANDOM`;

module.exports = {
    name: 'delemoji',
    description: 'Deletes an emoji from the server',
    usage: 'delemoji <emoji>',
    category: 'Utility',
    required: 'MANAGE_EMOJIS',
    guildOnly: true,
    execute(message, args){
        if (!message.member.hasPermission(`MANAGE_EMOJIS`)) {
            return message.channel.send(`¡No tiene permiso para usar este comando! Administrar emojis`)
          }
          
          const emoji = args[0];
          if (!emoji) return message.channel.send(`¡Por favor, dame un emoji!`);
      
          let customemoji = Discord.Util.parseEmoji(emoji);
      
          if (customemoji.id) {
            const Link = `https://cdn.discordapp.com/emojis/${customemoji.id}.${
              customemoji.animated ? "gif" : "png"
            }`;
            const name = args.slice(1).join(" ");
            message.guild.emojis.resolve(customemoji.id).delete();
      
            const Added = new MessageEmbed()
              .setTitle(`Emoji eliminado`)
              .setColor(`${Color}`)
              .setDescription(
                `¡Emoji ha sido eliminado!`
              );
            return message.channel.send(Added);
          } else {
            let CheckEmoji = parse(emoji, { assetType: "png" });
            if (!CheckEmoji[0])
              return message.channel.send(`¡Por favor, dame un emoji válido!`);
            message.channel.send(
              `¡Puede usar emoji normal sin agregar un servidor!`
            );
          }
    }
}