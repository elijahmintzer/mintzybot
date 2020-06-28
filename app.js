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
    let args = message.content.toLowerCase().split(" ");
    let cmd = message.content;
    const member = message.author;
//When a user types "!getavatar", the bot gets the avatar of the author.
//When a user types "!getavatar @user", it will get the avatar of that user.
    if(cmd.toLowerCase().startsWith(`${prefix}getavatar`)){
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
        if(!args[1]) return message.reply("please enter a color.");
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
//When a user types "!colorremove blue", it will remove the blue role from that user.
//It will also say that "@user's color has been removed".
    if(cmd.toLowerCase().startsWith(`${prefix}colorremove`)){
        if(!args[1]) return message.reply("please enter a color.");
        if(args[1] === 'blue'){
            message.member.roles.remove(BLUE_ROLE);
            message.channel.send(`${member}'s color has been removed.`);
        }
        if(args[1] === 'red'){
            message.member.roles.remove(RED_ROLE);
            message.channel.send(`${member}'s color has been removed.`);
        }
        if(args[1] === 'green'){
            message.member.roles.remove(GREEN_ROLE);
            message.channel.send(`${member}'s color has been removed.`);
        }
    }
    
    if(cmd.toLowerCase().startsWith(`${prefix}help`)){

        if(args[1] === 'user'){
            const embed = new Discord.MessageEmbed()
            .setColor("69F5F0")
            .setTitle("MintzyBot - User Help Menu")
            .addField("!help", "Displays a list of commands.")
            .addField("!coloradd <red, green, blue>", "Gives a role that has a color.")
            .addField("!colorremove <red, green, blue>", "Removes a role that has a color.")
            .addField("!getavatar <@user>", "Gets the user's avatar.")

            message.channel.send(embed);
        }
        if(args[1] === 'admin'){
            const embed = new Discord.MessageEmbed()
            .setColor("69F5F0")
            .setTitle("MintzyBot - Admin Help Menu")
            .addField("!gag <@user>", "Stops a user from typing in any text channel.")
            .addField("!ungag <@user>", "Allows a user to type in text channels.")
            .addField("!mute <@user>", "Stops a user from using voice.")
            .addField("!unmute <@user>", "Allows a user to talk using voice")
            .addField("!silence <@user>", "Gives mute and gag to the user.")
            .addField("!unsilence <@user>", "Removes mute and gag from the user.")
            .addField("!kick <@user>", "Kicks a member from the Discord server")
            .addField("!ban <@user>", "Bans a user from the Discord server")

            message.channel.send(embed);
        }
        
        if (args[0] === '!help' && args[1] !== 'user' && args[1] !== 'admin' && args.length > 1){
            message.reply("Invalid Arguments.");
            }
        
        if (args[0] === '!help' && args.length === 1) {
            const embed = new Discord.MessageEmbed()
            .setColor("69F5F0")
            .setTitle("MintzyBot - Help Pages")
            .addField("!help user", "Shows all commands that all users can do.")
            .addField("!help admin", "Shows all commands that admins can use.")

            message.channel.send(embed);
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