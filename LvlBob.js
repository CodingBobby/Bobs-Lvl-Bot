/*
                    _________________________
                   |---|--- Bob's Bot ---|---|
                    ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
                          VERSION 0.0.4
                             180319

>> Project started in 2k17 by Bob Walter with the distag Bob™#0001. <<
     >> All information took from the official documentation. <<
                 >>  https://discord.js.org/ <<

                     Join my Discord server
              >>   http://discord.gg/bobshome   <<

*/


// ——— Recource imports ———————————————————————————————————————————————————————— //

// Required libaries
const Discord = require("discord.js");                                        // Discord.js libary
const fs = require("fs");                                                     // FileSave module
const ms = require("ms");                                                     // MS module for time savings
const os = require("os");                                                     // OS module for SystemInfo
const cpuStat = require("cpu-stat");                                          // Module for cpu statistics

// Required files
const config = require("./config.json");                                      // Imports configuration file
const owner = require("./owner.json");                                        // Owner settings
const servers = require("./servers.json");                                    // Server settings

// Required data
let profiles = JSON.parse(fs.readFileSync("./profiles.json", "utf8"));        // Directory for user profiles


// ——— Login actions ——————————————————————————————————————————————————————————— //

// Setting up bot
const version = [`${config.general.version}`, `${config.general.update}`];    // Code version, latest update
const disbot = new Discord.Client();                                          // Creates discord client

// Starting bot
disbot.login(config.general.token, loginLog());                               // Logs in with token & runs log function

disbot.on("debug", (m) => console.log(`\n[debug]\n\n`, m));                   // Debugs connection
disbot.on("warn", (m) => console.log(`\n[warn]\n\n`, m));                     // Asks for possible issues

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

function user(msg) {                                                          // Creates array for user db
  // Sets profile if not set already
  if(!profiles[msg.author]) {                   // sent messages, average length, times mentioned, reps, points, level, rank, credits, guilds
    profiles[msg.author] = {msg: 0, avg: 0, tag: 0, rep: 0, pts: 0, lvl: 0, rnk: 0, crd: 0, gld: {}};
  }
  let usrData = profiles[msg.author];           // Shorter var for author ID

  if(!usrData.gld[msg.guild]) {
    usrData.gld[msg.guild] = {msg: 0, tag: 0, rep: 0, pts: 0, lvl: 0, rnk: 0, crd: 0};
  }
  let gldData = usrData.gld[msg.guild];         // Shorter var for messaged guild ID

  var data = {usr: usrData, gld: gldData};
  return data;
}

function level(msg) {                                                         // Users profile 
  let data = user(msg);                         // Calls user function to define user data  

  data.usr.msg++;                               // Message counter
  data.gld.msg++;

  data.usr.avg = Math.floor(((data.usr.avg*data.usr.msg)+msg.content.length)/(data.usr.msg + 1));

  let pts = msg.content.length;                 // Calculates gained points
  pts = Math.floor(Math.sqrt(pts/2)*Math.sqrt(Math.log(pts/2))*pts);
  if(!pts) pts = 0.5;

  data.usr.pts += pts;                          // Adds points
  data.gld.pts += pts;

  // Saves changes
  fs.writeFile("./profiles.json", JSON.stringify(profiles), (err) => {
    if(err) console.error(err);
  });
}


// ——— Message actions ————————————————————————————————————————————————————————— //

// Logbook actions
disbot.on("message", msg => {                   // Not stable yet
  const guildTag = msg.channel.type === 'text' ? `[${msg.guild.name}]` : '[DM]';
  const channelTag = msg.channel.type === 'text' ? `[#${msg.channel.name}]` : '';

  if(servers.blacklist.indexOf(msg.channel.id)) return;                       // Prevents logging log itself

  let msgLog = `\n>\n> ${msg.createdAt}\n> ${guildTag}${channelTag} ${msg.author.tag}\n> \"${msg.content}\"`;
  console.log(msgLog);                                                        // Sends log to terminal

  const log = disbot.channels.find('id', servers.log);                        // Creates log from ID in servers.json

  if(log) {
    msgLog = `\n>\n> ${msg.createdAt}\n> **${guildTag}**${channelTag} **${msg.author.tag}**\n> \"${msg.content}\"`;
    log.send(msgLog);                                                         // Sends only when log channel was set
  }
});

// Level actions
disbot.on("message", msg => {
  if(message.author.bot || msg.channel.type === "dm")
    return;                                                                   // Prevents acting on log, bots or dms

  var message = {                                                             // Creates array from message details
    id: msg.id,
    author: msg.author.id,
    time: msg.createdTimestamp,
    channel: msg.channel.id,
    guild: msg.guild.id,
    content: msg.content
  };

  level(message);                                                             // Calls user function and imports message details

});

// ————————————————————————————————————————————————————————————————————————————— //
