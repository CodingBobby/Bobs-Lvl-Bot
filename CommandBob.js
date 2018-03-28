/*
                    _________________________
                   |---|--- Bob's Bot ---|---|
                    ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
                          VERSION 0.0.3
                             180328

>> Project started in 2k17 by Bob Walter with the distag Bob™#0001. <<
     >> All information took from the official documentation. <<
                 >>  https://discord.js.org/ <<

                     Join my Discord server
              >>   http://discord.gg/bobshome   <<

*/

// ——— Recource imports ———————————————————————————————————————————————————————— //

    // Required libaries
const Discord = require("discord.js");                                        // Discord.js libary

    // Required files
const config = require("./config.json");                                      // Imports configuration file
const servers = require("./servers.json");                                    // Server settings
const owner = require("./owner.json");                                        // Owner settings
require("./commands.js")();                                                   // Commands


// ——— Login actions ——————————————————————————————————————————————————————————— //

    // Setting up bot
const version = [`${config.general.version}`, `${config.general.update}`];    // Code version, latest update
const disbot = new Discord.Client();                                          // Creates discord client


    // Starting bot
disbot.login(config.general.token, loginLog());                               // Logs in with token & runs log function

disbot.on("debug", (d) => console.log(`\n[debug]\n\n`, d));                   // Debugs connection
disbot.on("warn", (w) => console.log(`\n[warn]\n\n`, w));                     // Asks for possible issues

disbot.on("ready", () => {                                                    // Actions after successful start
  // Sending feedback to console and log channel
  let readyLog = `\n>\n> ${disbot.readyTimestamp}\n> Here I am! - <@!${disbot.user.id}> \n> Now serving ${disbot.users.size} users on ${disbot.guilds.size} servers with ${disbot.channels.size} channels!`;
  console.log(readyLog);

  const log = disbot.channels.find('id', servers.log);                        // Creates log from ID in servers.json
  if(log)                                                                     // Sends only when log channel was set
    log.send(readyLog);
});


// ——— Global functions ———————————————————————————————————————————————————————— //

function loginLog(error, token) {                                             // Gives login feedback and fetches errors
  if(error) {
    console.log(`\n>\n> There was an error logging in: ${error}`);
    return;
  } else
    console.log(`\n>\n> Logged in. Token: ${config.general.token}`);
}


// ——— Message actions ————————————————————————————————————————————————————————— //

disbot.on("message", msg => {
  if(!msg.content.startsWith(config.general.prefix) || msg.author.bot) return;

  const args = msg.content.toLowerCase().split(/\s+/g);
  const cmd = args.shift().slice(config.general.prefix.length).toLowerCase();

  if(uCmds(msg, cmd, args) !== 1) {                                           // Tries user, then owner commands
    if(oCmds(msg, cmd, args) !== 1) {
      msg.reply("this command doesn't exist or you can't use it.");           // Alerts if no command found
    }
  }

});

// ————————————————————————————————————————————————————————————————————————————— //
