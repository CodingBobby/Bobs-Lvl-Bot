// Commands.js by Bob™#0001
// v 0.0.1 180328


// ——— Recource imports ———————————————————————————————————————————————————————— //

const fs = require("fs");                                                     // FileSave module
const owner = require("./owner.json");                                        // Owner settings
let profiles = JSON.parse(fs.readFileSync("./profiles.json", "utf8"));        // Directory for user profiles

module.exports = function() {


// ——— User commands ––––——————————————————————————————————————————————————————— //

  this.uCmds = function(msg, cmd, args) {

    // command block, if() statement can be dublicated as much as wanted
    if(cmd == "name") {
      // Something happens here
      return 1;                                                               // Must return 1 to success search from main
    }

    return;
  };


// ——— Owner commands –––——————————————————————————————————————————————————————— //

  this.oCmds = function(msg, cmd, args) {

    if(msg.author.id !== owner.id)
      return 0;                                                               // Must return 0 to break search from main

    // command block, if() statement can be dublicated as much as wanted
    if(cmd == "name") {
      // Something happens here
      return 1;                                                               // Must return 1 to success search from main
    }

    return;
  };
};


// ———––––––––––——————————————————————————————————————————————————————————————— //
