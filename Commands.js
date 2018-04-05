// Commands.js by Bob™#0001
// v 0.0.5 180405


// ——— Recource imports ———————————————————————————————————————————————————————— //

const fs = require("fs");                                                     // FileSave module
const owner = require("./owner.json");                                        // Owner settings
let profiles = JSON.parse(fs.readFileSync("./profiles.json", "utf8"));        // Directory for user profiles

module.exports = function() {


// ——— User commands ––––——————————————————————————————————————————————————————— //

  this.uCmds = function(msg, cmd, args, disbot) {

    if(cmd == 'me' || cmd == 'userinfo' || cmd == 'ui') {
      cmdLog(cmd, args, msg);

      const id = msg.author.id;
      msg.channel.send(`\`\`\`cs\n# your ID: \n\t${id}\n# your Name: \n\t${disbot.users.get(id).username}\n# your Tag: \n\t${disbot.users.get(id).discriminator}\n# user since: \n\t${disbot.users.get(id).createdAt}\`\`\``);
      console.log('\n> success');

      return 1;
    }

    return;
  };


// ——— Owner commands –––——————————————————————————————————————————————————————— //

  this.oCmds = function(msg, cmd, args, disbot) {

    if(msg.author.id !== owner.id)
      return 0;

    if(cmd == 'top' || cmd == 'rank' || cmd == 'tr') {    // top 10 users by given argument
      cmdLog(cmd, args, msg);

      let usrArr = sortArr(gidArrSrch(msg,args[0]),2);
      let topUsers = [];
      if(usrArr.length >= 10)
        count = 10;
      else
        count = usrArr.length;
      for(var i = 0; i < count; i++) {
        topUsers.push(usrArr[i]);
      }
      console.log(`\n> Top 10 on ${msg.guild.name} at ${args[0]}`);
      console.log(topUsers);
      const topList = (topUsers) => {
        let msg = "";
        for(var i = 0; i < topUsers.length; i++) {
          let id = disbot.users.get(topUsers[i][0]);
          msg += `**\n${i+1}:**\t${id.username}#${id.discriminator}`;
        }
        return msg;
      }
      msg.channel.send(topList(topUsers));
      console.log('\n> success');

      return 1;
    }

    return;
  };
  
// END of command section
};


// ——— Functions ––––––––––————————————————————————————————————————————————————— //

function gidArrSrch(msg, search) {  // fetch profiles of all users in current guild
  const gldUsrs = (prfls,glds) =>
    Object.entries(prfls).filter(([user,attrs]) =>
      Object.values(attrs.gld[glds] || {}).length);
  const users = gldUsrs(profiles,msg.guild.id);
  let newArr = [];
  for(var user of users) {
    const id = user[0];
    const data = user[1];
    let srchVal = data.gld[msg.guild.id][search];
    newArr.push([id,srchVal]);
  }
  return newArr;
}

function sortArr(arr, s) {          // sort arr[][] for s. element
  let swapp;
  let n = arr.length - 1;
  s -= 1;
  do {
    swapp = false;
    for(var i = 0; i < n; i++) {
      if(arr[i][s] < arr[i+1][s]) {
        let tmp = arr[i];
        arr[i] = arr[i+1];
        arr[i+1] = tmp;
        swapp = true;
      }
    } n--;
  } while (swapp);
  return arr;
}

function cmdLog(cmd, args, msg) {   // general command log in console
  console.log(`\n> COMMAND [${cmd}] with ARGUMENTS [${args}]\n> called by: ${msg.author.username}#${msg.author.discriminator}`)
}

// ———––––––––––——————————————————————————————————————————————————————————————— //
