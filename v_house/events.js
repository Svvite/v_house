/**
 * @overview GTA:Multiplayer Default Package: Events
 * @author Jan "Waffle" C.
 * @copyright (c) GTA:Multiplayer [gta-mp.net]
 * @license https://master.gta-mp.net/LICENSE
 */
"use strict";

/**
 * @namespace
 */
let Events = module.exports;
let house = require('./house');


Events.register = () => {
  events.Add("ClientConnected", Events.onClientConnected);
  events.Add("ClientDisconnected", Events.onClientDisconnected);

  events.Add("ChatMessage", Events.onChatMessage);
  events.Add("ChatCommand", Events.onChatCommand);

  events.Add("PlayerCreated", Events.onPlayerCreated);
  events.Add("PlayerDestroyed", Events.onPlayerDestroyed);

  events.Add("PlayerShot", Events.onPlayerShot);
  events.Add("PlayerDeath", Events.onPlayerDeath);
};


Events.onClientConnected = client => {
  
};


Events.onClientDisconnected = (client, reason) => {
  
};


Events.onChatMessage = (player, message) => {
};


Events.onChatCommand = (player, command) => {
  let args = command.split(" ");

  // Let's check if this crazy thing ever happens.
  if (args.length === 0) {
    throw "This should NEVER happen.";
  }
  let commandName = args.splice(0, 1)[0];

  for (const command of house) {
    if (command[0].toLowerCase() === commandName.toLowerCase()) {
      command[1](player, args);
      return true;
    }
  }
  player.SendChatMessage("Unknown command.", new RGB(255, 59, 59));
};

Events.onPlayerCreated = player => {
};

Events.onPlayerDeath = (player, reason, killer) => {
};

Events.onPlayerShot = player => {
};

Events.onPlayerDestroyed = player => {
};
