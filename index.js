const Discord = require('discord.js');
require('dotenv-flow').config();
const client = new Discord.Client();

const config = {
    token: process.env.TOKEN,
    owner: process.env.OWNER,
    prefix: process.env.PREFIX
}
client.on('ready', ()=> {
    console.log('Bot is now connected');
    client.user.setActivity("I'm Being Built!");
});

client.on('message', message => {
    if(message.content.startsWith('!getavatar')){
        if(!message.mentions.users.size){
            return message.channel.send(`Your avatar: ${message.author.displayAvatarURL()}`);
        }
        const avatarList = message.mentions.users.map(user => {
            return `${user.username}\'s avatar: ${user.displayAvatarURL()}`;
        });
        message.channel.send(avatarList);
    }
});

client.on('guildMemberAdd', member => {
    const channel = member.guild.channels.cache.find(ch => ch.name === 'welcome');

    if(!channel) return;

    channel.send(`Welcome, ${member}`);
});

client.login(config.token);