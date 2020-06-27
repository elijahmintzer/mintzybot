const Discord = require('discord.js');
require('dotenv-flow').config();
const client = new Discord.Client();

//Config files
const config = {
    token: process.env.TOKEN,
    owner: process.env.OWNER
}

const BLUE_ROLE = '726506610578423990';

//When index.js is executed, then the terminal logs that the bot is connected.
//It will also get the activity of the bot to "I'm being Built!".
client.on('ready', ()=> {
    console.log('Bot is now connected');
    client.user.setActivity("I'm Being Built!");
});


client.on('message', message => {
//When a user types "!getavatar", the bot gets the avatar of the author.
//When a user types "!getavatar @user", it will get the avatar of that user.
    if(message.content.startsWith('!getavatar')){
        if(!message.mentions.users.size){
            return message.channel.send(`Your avatar: ${message.author.displayAvatarURL()}`);
        }
        const avatarList = message.mentions.users.map(user => {
            return `${user.username}\'s avatar: ${user.displayAvatarURL()}`;
        });
        message.channel.send(avatarList);
    }
//When a user types "!role blue", it will give them a role that has the color of blue.
//It will also say that "@user has been given the blue role".
    if(message.content == '!role blue'){
        message.member.roles.add(BLUE_ROLE);
        message.channel.send(`${message.author} has been given the blue role`);
    }
});

//When a user joins the server, the bot says "Welcome, @user." in #welcome chat.
client.on('guildMemberAdd', member => {
    const welcomechannel = member.guild.channels.cache.find(ch => ch.name === 'welcome');

    if(!welcomechannel) return;

    channel.send(`Welcome, ${member}`);
});

client.login(config.token);