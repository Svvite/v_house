// House system for GTA V:MP by Svvite
// This house system is a free-to-use mysql house-system script
// Open-Source - Feel free to add or delete features you would like
// You can share your additions and or improvements under:
// Please let the credits remain as a sign of respect, thank you, have fun and good luck on your GTA-MP adventure =)
"use strict";
let house = module.exports = new Map();
let hcurrentcommands = "/househelp, /housesettings, /housebuy, /housesell [-20% of purchase amount], /rent, /unrent, /housekick";
let hadmincommands = "/housecreate, /housedelete, /housesettings"
    /** @function househelp
     * @desc Sends all current commands to the user.
     */
house.set("househelp", function(player) {
    //if(PlayerInfo[player.name].admin > 1)
    //{
    player.SendChatMessage("Housesystem-Info:");
    //player.SendChatMessage(hadmincommands);
    player.SendChatMessage(hcurrentcommands);
    //}
    //else player.SendChatMessage(hcurrentcommands);
});
/** @function housebuy
 * @desc Allows the user to buy the house he'll be at.
 */
house.set("housebuy", function(player) {
    if (PlayerInfo[player.name].howner.length == "" && PlayerInfo[player.name].rent.length == "") {
        AtWhichHouse(player, function(res) {
            if (HouseInfo[res].owner == "Nobody") {
                if (player.stats.money >= HouseInfo[res].price) {
                    HouseInfo[res].buyToPlayer(player);
                } else return player.SendChatMessage(languages.housebuy_error_money);
            } else return player.SendChatMessage(languages.housebuy_error_owned);
        });
    } else return player.SendChatMessage(languages.housebuy_error_already);
});
/** @function housesell
 * @desc Allows the user to sell his current house.
 */
house.set("housesell", function(player) {
    if (PlayerInfo[player.name].howner.length == "") return player.SendChatMessage(languages.housesell_error_nohouse);
    else {
        AtWhichHouse(player, function(res) {
            if (HouseInfo[res].owner == player.name && HouseInfo[res].id == PlayerInfo[player.name].howner) {
                HouseInfo[res].sellFromPlayer(player);
            } else return player.SendChatMessage(languages.housesell_error_notowner);
        });
    }
});
/** @function rent
 * @desc Allows an user to rent into a house, assumed the house is rentable (see: housecreate or housesettings).
 */
house.set("rent", function(player) {
    if (PlayerInfo[player.name].howner.length == "" && PlayerInfo[player.name].rent.length == "") {
        AtWhichHouse(player, function(res) {
            HouseInfo[res].rentToPlayer(res, player);
            console.log(HouseInfo[res].id);
        });
    } else return player.SendChatMessage(languages.rent_error_already);
});
/** @function unrent
 * @desc Allows an user to cancel his current rental contract and sets his homeless again.
 */
house.set("unrent", function(player) {
    if (PlayerInfo[player.name].rent.length != "") {
        AtWhichHouse(player, function(res) {
            if (HouseInfo[res].id == PlayerInfo[player.name].rent) {
                HouseInfo[res].unrentToPlayer(res, player);
            } else return player.SendChatMessage(languages.unrent_error_wronghouse);
        });
    } else return player.SendChatMessage(languages.unrent_error_norent);
});
/** @function cashbox
 * @desc Current command to access the house cashbox. Allows the renters + owner to check the actual balance or deposit a defined value into it. The owner can withdraw a defined amount from it.
 * @param {string} deposit/withdraw/balance - The first argument to specify the command-use.
 * @param {integer} value - The desired value that is going to be withdrawn/deposited.
 */
house.set("cashbox", function(player, args) {
    if (args.length == 2) {
        if (PlayerInfo[player.name].rent.length == "" && PlayerInfo[player.name].howner.length == "") return player.SendChatMessage(languages.cashbox_withdraw_error_nohouse);
        AtWhichHouse(player, function(res) {
            if (PlayerInfo[player.name].rent == HouseInfo[res].id || player.name == HouseInfo[res].owner) {
                if (args[0] == 'withdraw') {
                    HouseInfo[res].cashboxWithdraw(player, args[1]);
                }
                if (args[0] == 'deposit') {
                    HouseInfo[res].cashboxDeposit(player, args[1]);
                }
            }
        });
    } else if (args.length == 1) {
        if (args[0] == 'withdraw' || args[0] == 'deposit') return player.SendChatMessage(languages.cashbox_error_dw_use);
        if (PlayerInfo[player.name].rent.length == "" && PlayerInfo[player.name].howner.length == "") return player.SendChatMessage(languages.cashbox_error_nohouse);
        if (args[0] == 'balance') {
            AtWhichHouse(player, function(res) {
                if (PlayerInfo[player.name].rent == HouseInfo[res].id || player.name == HouseInfo[res].owner) {
                    if (HouseInfo[res].cashbox == "") {
                        player.SendChatMessage(languages.cashbox_balance_error_empty);
                    } else player.SendChatMessage(languages.cashbox_balance_success + HouseInfo[res].cashbox + "$!");
                } else return player.SendChatMessage(languages.cashbox_balance_error_notowner);
            });
        }
    } else return player.SendChatMessage(languages.cashbox_error_use);
});
/** @function lock
 * @desc Allows the player to change the state of his doorlock (lock/unlock), depending on its current state. (lock <-> unlock)
 */
house.set("lock", function(player) {
    if (PlayerInfo[player.name].rent.length == "" && PlayerInfo[player.name].howner.length == "") return player.SendChatMessage(languages.lock_error_nohouse);
    AtWhichHouse(player, function(res) {
        if (PlayerInfo[player.name].rent == HouseInfo[res].id || player.name == HouseInfo[res].owner) {
            HouseInfo[res].lockHouse(player);
        } else return player.SendChatMessage(languages.lock_error_notowner);
    });
});
/** @function home
 * @desc Enables the player to set a marker (blip) at the location of his house and sets a route on the minimap to it.
 */
house.set("home", function(player) {
    if (PlayerInfo[player.name].rent == "" && PlayerInfo[player.name].howner == "") return player.SendChatMessage(languages.home_error_nohome);
    if (PlayerInfo[player.name].howner == "") {
        let id = PlayerInfo[player.name].rent;
    } else if (PlayerInfo[player.name].rent == "") {
        let id = PlayerInfo[player.name].howner;
    }
    if (HouseInfo[id].homeblip != -1) return player.SendChatMessage(languages.home_error_already);
    HouseInfo[id].homeToPlayer(player);
});
house.set("houseshop", function(player, args) {
    PlayerInfo[player.name] = {
        howner: 1
    };
    if (PlayerInfo[player.name].howner == "") return player.SendChatMessage(languages.houseshop_general_error_nohouse);
    if (!args.length) return player.SendChatMessage(languages.houseshop_general_error_noargs);
    if (args[0] == 'list') {
        player.SendChatMessage(languages.houseshop_list);
    }
    if (args.length >= 2 && args[0] == 'buy') {
        if (args[1] in gm.hshop) {
            let item = args[1];
            let house = PlayerInfo[player.name].howner;
            if (args.length == 3) {
                if (isNaN(args[2])) return player.SendChatMessage(languages.houseshop_general_error_valid);
                let amount = args[2];
                HouseInfo[house].houseshop(player, item, amount);
            } else if (args.length == 2) {
                HouseInfo[house].houseshop(player, item, 1);
            }
        } else {
            player.SendChatMessage(languages.houseshop_general_error_notitem);
        }
    }
});
/*house.set("housekick", function(player, args) {
PlayerInfo[player.name].rent = PlayerInfo[player.name].howner;
if (PlayerInfo[player.name].howner.length == "") return player.SendChatMessage("ERROR: You do not have access to this command, since you do not own a house!");
if (args.length == 1) {
let targets = gm.utility.getPlayer(args[0], true);
if (targets.length === 0) return player.SendChatMessage("ERROR: The target player you entered is currently unknown!");
else if (targets.length > 1) {
let msg = "ERROR: Found multiple targets: ";
for (let i of targets) {
msg += i.name + ", ";
}
msg = msg.slice(0, msg.length - 2);
return player.SendChatMessage(msg);
}
let target = targets[0];
if (PlayerInfo[target.name].rent == PlayerInfo[player.name].howner) {
PlayerInfo[target.name].rent = "";
let house = PlayerInfo[player.name].howner;
HouseInfo[house].forbidden = HouseInfo[house].forbidden.concat(" " + target.name);
let connection = gm.utility.dbConnect();
connection.connect();
connection.query("UPDATE houses SET forbidden = 'HouseInfo[house].forbidden' WHERE id = ?", house, function(err) {
if (err) throw err;
});
target.SendChatMessage("HOUSE: The owner of your current home cancelled the rental contract. You were banned from the house!");
player.SendChatMessage("HOUSE: You successfully kicked player " + target.name + " out of the house! He is now banned from this house!");
player.SendChatMessage("HOUSE: Therefore, he won't be able to apply a rental contract again!");
} else return player.SendChatMessage("ERROR: This player is not a lodger of your house!");
} else return player.SendChatMessage("EROR: Use /housekick [player name or ID]");
});*/
//              House - Settings  -  House - Settings  -  House - Settings                //
//              House - Settings  -  House - Settings  -  House - Settings                //
//              House - Settings  -  House - Settings  -  House - Settings                //
//              House - Settings  -  House - Settings  -  House - Settings                //
//              House - Settings  -  House - Settings  -  House - Settings                //
/** @function housecreate
 * @desc Allows an admin to create a new house in-game.
 * @arg {integer} price - The initial price of what the new house should cost.
 * @arg {boolean} rentable - Allows the admin to set the house into a rentable or non-rentable state.
 * @arg {integer} rent cost - Determines the costs a user has to pay for his rent.
 */
house.set("housecreate", function(player, args) {
    //if(PlayerInfo[player.name].admin < 3)
    //{
    if (args.length > 2) {
        var price = args[0];
        var rentcost = args[2];
        var powercost = price * (CURRENT_POWER_RATE / 1000);
        if (isNaN(args[0])) {
            return player.SendChatMessage("ERROR: Use a valid value for the price!");
        }
        if (args[1] == "1") {
            var rentboolean = 1;
        } else if (args[1] == "0") {
            var rentboolean = 0;
        } else return player.SendChatMessage("ERROR: Use a valid boolean for the rent status!");
        if (isNaN(args[2])) {
            return player.SendChatMessage("ERROR: Use a valid value for the rent cost!");
        }
        var coordx = 12.0; //player.position.x;
        var coordy = 12.0; //player.position.y;
        var coordz = 12.0; //player.position.z;
        let connection = gm.utility.dbConnect(); // Thanks to "Daranix" and "Waffle"
        connection.connect();
        connection.query("SELECT house_index FROM houses WHERE id = 9999", function(err, results) {
            let houseid = results[0].house_index;
            let query = "INSERT INTO houses (`id`,`price`,`rentbool`,`rentcost`, `cx`, `cy`, `cz`, `owner`, `powercost`) VALUES ('" + results[0].house_index + "','" + price + "','" + rentboolean + "','" + rentcost + "','" + coordx + "','" + coordy + "','" + coordz + "','Nobody', '" + powercost + "')";
            connection.query(query, function(err2) {
                if (!err2) {
                    player.SendChatMessage("The house was successfully created!");
                    console.log("house creation successful! (ID: " + houseid + ")");
                    connection.query("UPDATE houses SET house_index = (house_index + 1) WHERE id = 9999");
                    HouseInfo[houseid] = new gm.hclass.House(houseid, coordx, coordy, coordz, price, rentboolean, rentcost, 0, powercost, 0, "Nobody", 0, "", true);
                }
                if (err2) {
                    console.log(err2);
                }
            });
            connection.query("INSERT INTO houses_inv (`id`) VALUES ('" + houseid + "')", function(err3) {
                if (err3) throw err;
                else {
                    console.log("house inventory creation successful! (ID: " + houseid + ")");
                }
            });
        });
    } else return player.SendChatMessage("ERROR: Use /housecreate [price] [rentable 0/1] [rent cost]");
    //}
    //else player.SendChatMessage(error_message);*/
});
/** @function housesettings
 * @desc Allows the user/admin to change the current settings of a house.
 * @args {string} price/rentable/level/rentcost/maxrenters - The first argument to specify the command-use.
 * @args {string} value - Represents the desired value the settings should be changed in.
 */
house.set("housesettings", function(player, args) {
    if (args.length < 1 || args.length > 3) {
        if (PlayerInfo[player.name].admin >= 3) {
            return player.SendChatMessage("ERROR: Use /housesettings price/rentable/level/rentcost/maxrenters [new value]");
        } else return player.SendChatMessage("ERROR: Use /housesettings rentable/level/rentcost/maxrenters [new value]");
    }
    AtWhichHouse(player, function(res) {
        house = res[0].id;
        let connection = gm.utility.dbConnect();
        connection.connect();
        if (args[0] == 'price') {
            if (PlayerInfo[player.name].admin >= 3) {
                if (isNaN(args[1]) == false) {
                    let newprice = args[1];
                    let query = "UPDATE houses SET price = ? WHERE id = " + house;
                    connection.query(query, args[1], function(err) {
                        if (!err) {
                            player.SendChatMessage("You have successfully changed the price of the house to " + args[1] + "$!");
                            HouseInfo[house].price = newprice;
                        } else throw err;
                    });
                } else player.SendChatMessage("ERROR: Use a valid number for the new house price! (/housesettings price [$]");
            } else player.SendChatMessage("ERROR: You do not have the required rights to access this command!");
        }
        if (HouseInfo[house].owner == player.name || PlayerInfo[player.name].admin >= 3) {
            if (args[0] == 'rentable') {
                if (args[1] == '1' || '0' || 'true' || 'false') {
                    if (args[1] == 'true') {
                        args[1] = 1;
                    } else if (args[1] == 'false') {
                        args[1] = 0;
                    }
                    let query = "UPDATE houses SET rentbool = ? WHERE id = " + house;
                    connection.query(query, args[1], function(err) {
                        if (!err) {
                            player.SendChatMessage("You have successfully changed the rent status of the house to: " + args[1]);
                            HouseInfo[house].rentable = args[1];
                        } else throw err;
                    });
                } else player.SendChatMessage("ERROR: Use a valid boolean for the new rent status (/housesettings rentable [true/false])");
            }
            if (args[0] == 'level') {
                if (!isNaN(args[1])) {
                    let query = "UPDATE houses SET level = ? WHERE id = " + house;
                    connection.query(query, args[1], function(err) {
                        if (!err) {
                            player.SendChatMessage("You have successfully changed the required level of the house to Level " + args[1]);
                            HouseInfo[house].level = args[1];
                        } else throw err;
                    });
                } else player.SendChatMessage("ERROR: Use a valid number for the new house level (/housesettings level [0-...]");
            }
            if (args[0] == 'rentcost') {
                if (!isNaN(args[1])) {
                    let query = "UPDATE houses SET rentcost = ? WHERE id = " + house;
                    connection.query(query, args[1], function(err) {
                        if (!err) {
                            player.SendChatMessage("You have successfully changed the rent costs of the house to " + args[1] + "$!");
                            HouseInfo[house].rentcost = args[1];
                        } else throw err;
                    });
                } else player.SendChatMessage("ERROR: Use a valid number for the new rent costs (/housesettings rentcost [$]");
            }
            if (args[0] == 'maxrenters') {
                if (!isNaN(args[1])) {
                    let query = "UPDATE houses SET maxrenters = ? WHERE id = " + house;
                    connection.query(query, args[1], function(err) {
                        if (err) throw err;
                        player.SendChatMessage("You have successfully changed the maximum amount of renters of the house to " + args[1] + "!");
                        HouseInfo[house].maxrenters = args[1];
                    });
                } else return player.SendChatMessage("ERROR: Use a valid number for the new maximum amount of renters! (/housesettings maxrenters [amount]");
            }
        } // If(is_owner)
        else return player.SendChatMessage("ERROR: You are not the owner of this house!");
    }); // AtWhichHouse
});
/** @function housedelete
 * @desc Allows an admin to delete the house he is currently at.
 */
house.set("housedelete", function(player) {
    //let house = AtWhichHouse(player);
    AtWhichHouse(player, function(res) {
        let house = res[0].id;
        let connection = gm.utility.dbConnect();
        connection.connect();
        let Query = "DELETE FROM houses WHERE id = " + house;
        connection.query(Query, function(err) {
            if (err) throw err;
            else player.SendChatMessage("You successfully deleted the house entry from the database!");
        });
        HouseInfo[house] = {
            id: -1,
            x: -1,
            y: -1,
            z: -1,
            price: -1,
            rentable: -1,
            rentcost: -1,
            level: -1,
            powercost: -1,
            cashbox: -1,
            owner: -1,
            renter: -1,
            forbidden: "",
            lock: -1,
            homeblip: -1
        };
    });
});
/** Gets the highest House ID out of the mysQL database. */
function getHighestHouseID() {
    let connection = gm.utility.dbConnect();
    connection.connect();
    connection.query("SELECT MAX(id) AS id FROM houses WHERE id != 9999", function(err, res) {
        if (!err) {
            return res[0].id;
        } else throw err;
    });
}
/**
 * Returns the ID of the house the player is currently at, assumed he is near a house entrance.
 * @returns {houseID}
 * @requires utility.housesphere
 */
function AtWhichHouse(player, callback) {
    let housesphere;
    let con = gm.utility.dbConnect();
    con.connect();
    con.query("SELECT MAX(id) AS id FROM houses WHERE id != 9999", function(err, res) {
        let max_house = res[0].id;
        for (let i = 0; i < max_house + 1; i++) {
            if (HouseInfo[i].id > -1) {
                housesphere = new gm.utility.housesphere(HouseInfo[i].x, HouseInfo[i].y, HouseInfo[i].z, 2);
                if (housesphere.inRangeOfPoint(player.position)) {
                    if (callback) {
                        return callback(HouseInfo[i].id);
                    } else return false;
                }
            }
        }
    });
}