// v_house utility file with functions from Jan 'Waffle' C.
// v_house mysql house-system by @Svvite for GTA-MP: gta-mp.net
"use strict";
let Utility = module.exports;
Utility.broadcastMessage = (message, opt_color) => {
    for (let player of g_players) {
        player.SendChatMessage(message, opt_color);
    }
};
Utility.getPlayer = (idOrName, opt_allowDuplicates, opt_caseSensitive) => {
    let allowDuplicates = opt_allowDuplicates || false;
    let caseSensitive = opt_caseSensitive || false;
    let id = parseInt(idOrName);
    let fnCheck;
    if (isNaN(id)) {
        if (caseSensitive === false) {
            idOrName = idOrName.toLowerCase();
        }
        // define fnCheck to check the players name
        fnCheck = target => {
            let targetName;
            if (caseSensitive === false) {
                //ignore capital letters
                targetName = target.name.toLowerCase();
            } else {
                // do not ignore capital letters
                targetName = target.name;
            }
            if (targetName.indexOf(idOrName) === 0) {
                return true;
            }
            return false;
        };
    } else {
        fnCheck = target => target.client.networkId === id;
    }
    let playerArray = [];
    for (let tempPlayer of g_players) {
        if (fnCheck(tempPlayer)) {
            playerArray.push(tempPlayer);
            if (allowDuplicates === false) {
                // exit the loop, because we just return the first player found
                break;
            }
        }
    }
    return playerArray;
};
Utility.dbConnect = () => {
    return gm.mysql.createConnection({
        host: gm.config.mysql.host,
        user: gm.config.mysql.user,
        password: gm.config.mysql.password,
        database: gm.config.mysql.database
    });
};
Utility.getIndex = (callback) => {
    connection.query('SELECT `house_index` FROM houses WHERE `id` = 9999', function(err, result) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result[0].house_index);
        }
    });
}
Utility.housesphere = class Sphere { // Thanks to Tirus
    constructor(x, y, z, opt_radius) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.radius = opt_radius || 2;
    }
};
Utility.housesphere.prototype.inRangeOfPoint = function(position) { // Thanks to Tirus (initial utility: containsPosition() )
    return (Math.pow((position.x - this.x), 2) + Math.pow((position.y - this.y), 2) + Math.pow((position.z - this.z), 2) < Math.pow(this.radius, 2));
}