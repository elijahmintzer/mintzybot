const Discord = require('discord.js');
require('dotenv-flow').config();
const client = new Discord.Client();

//Config files
const config = {
    token: process.env.TOKEN,
    owner: process.env.OWNER,
    prefix: process.env.PREFIX
}

//Color Roles
const BLUE_ROLE = '726512954949894186';
const RED_ROLE = '726615170948005928';
const GREEN_ROLE = '726615209409511444';

//When index.js is executed, then the terminal logs that the bot is connected.
//It will also get the activity of the bot to "I'm being Built!".
client.on('ready', ()=> {
    console.log('Bot is now connected to Discord Services.');
    console.log(`Logged in as ${client.user.username}`);
    client.user.setActivity("I'm Being Built!");
});


client.on('message', message => {

    const prefix = config.prefix;
    var args = message.content.toLowerCase().split(" ");
    var cmd = message.content;
    const member = message.author;

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
//When a user types "!color blue", it will give them a role that has the color of blue.
//It will also say that "@user's color has been added".
    if(cmd.toLowerCase().startsWith(`${prefix}coloradd`)){
        if(args[1] === 'blue'){
            message.member.roles.add(BLUE_ROLE);
            message.channel.send(`${member}'s color has been added.`);
        }
        if(args[1] === 'red'){
            message.member.roles.add(RED_ROLE);
            message.channel.send(`${member}'s color has been added.`);
        }
        if(args[1] === 'green'){
            message.member.roles.add(GREEN_ROLE);
            message.channel.send(`${member}'s color has been added.`);
        }
    }
});

//When a user joins the server, the bot says "Welcome, @user." in #welcome chat.
client.on('guildMemberAdd', member => {
    const welcomechannel = member.guild.channels.cache.find(ch => ch.name === 'welcome');

    if(!welcomechannel) return;

    channel.send(`Welcome, ${member}`);
});

client.login(config.token);