const Discord = require('discord.js')
const colors = require('../colors.json')
const { parse } = require("twemoji-parser");
const { MessageEmbed } = require("discord.js");
const Color = `RANDOM`;

module.exports = {
    name: 'addemoji',
    description: 'Adds the emoji to the server',
    usage: 'emoji <emoji>',
    category: 'Utility',
    required: 'MANAGE_EMOJIS',
    guildOnly: true,
    async execute(message, args) {
        if (!message.member.hasPermission("MANAGE_EMOJIS")) {
            return message.channel.send(`¡No tiene permiso para usar este comando (╥﹏╥)! Administrar emojis`)
        }

        const emoji = args[0];
        if (!emoji) return message.channel.send(`¡Por favor, dame un emoji ^^!`);

        let customemoji = Discord.Util.parseEmoji(emoji);

        if (customemoji.id) {
            const Link = `https://cdn.discordapp.com/emojis/${customemoji.id}.${
              customemoji.animated ? "gif" : "png"
            }`;
            const name = args.slice(1).join(" ");
            message.guild.emojis.create(
                `${Link}`,
                `${name || `${customemoji.name}`}`
            ).catch(error => {
                console.log(error)
            })
            const Added = new MessageEmbed()
                .setTitle(`Emoji Agregado`)
                .setColor(`${Color}`)
                .setDescription(
                    `**¡Se ha añadido un emoji!** | **Name:** \`${name || `${customemoji.name}`}\` | **Preview:** [Click Me](${Link})`
                );
            return message.channel.send(Added).catch(e => {
                console.log(e)
            })
        } else {
            let CheckEmoji = parse(emoji, {
                assetType: "png"
            });
            if (!CheckEmoji[0])
                return message.channel.send(`¡Por favor, dame un emoji válido (＞n＜)!`);
            message.channel.send(
                `¡Puede usar emoji normal sin agregar un servidor!`
            );
        }
    }
};