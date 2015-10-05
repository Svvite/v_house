"use strict";
let hclass = module.exports;

hclass.House = class House {

    constructor(id, cx, cy, cz, price, rentboolean, rentcost, level, powercost, cashbox, owner, renter, forbidden, lockstate, inventory) {
        this.id = id;
        this.x = cx;
        this.y = cy;
        this.z = cz;
        this.price = price;
        this.rentable = rentboolean;
        this.rentcost = rentcost;
        this.level = level;
        this.powercost = price * (CURRENT_POWER_RATE / 1000) + ((price * (CURRENT_POWER_RATE / 1000)) * renter);
        this.cashbox = cashbox;
        this.owner = owner;
        this.renter = renter;
        this.forbidden = forbidden;
        this.lock = lockstate;
        this.homeblip = -1;

        this.inventory = {
        	lightarmor: inventory.lightarmor,
        	heavyarmor: inventory.heavyarmor,
        	tv: inventory.tv
        };
    }

    rentToPlayer(houseid, player) {
        if (this.rentable == 1) {
            if (this.forbidden.match(player.name)) return player.SendChatMessage(languages.rent_error_banned);
            if (player.stats.money >= this.rentcost) {
                PlayerInfo[player.name].rent = this.id;
                player.stats.money = player.stats.money - this.rentcost;
                this.cashbox = this.cashbox + this.rentcost;
                this.renter = this.renter + 1;
                this.powercost = this.price * (CURRENT_POWER_RATE / 1000) + ((this.price * (CURRENT_POWER_RATE / 1000)) * this.renter);
                player.SendChatMessage(languages.rent_success + this.rentcost + "$!");
                player.SendChatMessage(languages.rent_info1);
                player.SendChatMessage(languages.rent_info2);
                player.SendChatMessage(languages.rent_info3);
                console.log("Player: " + player.name + " rent a room in the house with the id: " + this.id + "!");
            } else return player.SendChatMessage(languages.rent_error_money);
        } else return player.SendChatMessage(languages.rent_error_rentable);
    }

    unrentToPlayer(houseid, player) {
        PlayerInfo[player.name].rent = "";
        this.renter = this.renter - 1;
        this.powercost = this.price * (CURRENT_POWER_RATE / 1000) + ((this.price * (CURRENT_POWER_RATE / 1000)) * this.renter);
        player.SendChatMessage(languages.unrent_success);
        player.SendChatMessage(languages.unrent_info1);
        console.log("Player: " + player.name + " unrented his room of the house with the id: " + this.id + "!");
    }

    buyToPlayer(player) {
        let connection = gm.utility.dbConnect();
        connection.connect();
        let query = "UPDATE houses SET owner = ? WHERE id = " + this.id;
        connection.query(query, player.name, function(err, result) {
            if (err) throw err;
            this.owner = player.name;
            player.stats.money = player.stats.money - this.price;
            PlayerInfo[player.name].howner = this.id;
            player.SendChatMessage(languages.housebuy_success + this.price + "$!");
            player.SendChatMessage(languages.housebuy_info1);
            player.SendChatMessage(languages.housebuy_info2);
            player.SendChatMessage(languages.housebuy_info3);
            console.log("Player: " + player.name + " bought the house with the id: " + this.id);
            return 1;
        });
    }

    sellFromPlayer(player) {
        let connection = gm.utility.dbConnect();
        connection.connect();
        let query = 'UPDATE houses SET owner = "Nobody" WHERE id = ' + this.id;
        connection.query(query, function(err, result) {
            if (err) throw err;
            this.owner = "Nobody";
            player.stats.money = player.stats.money + (this.price / 100) * 80;
            PlayerInfo[player.name].howner = "";
            player.SendChatMessage(languages.housesell_success + (this.price / 100) * 80 + "$!");
            player.SendChatMessage(languages.housesell_info1);
            console.log("Player: " + player.name + " sold his house with the id: " + this.id + " for the amount of: " + (this.price / 100) * 80 + "$!");
        });
    }

    cashboxWithdraw(player, amount) {
        if (player.name == this.owner) {
            if (!isNaN(amount)) {
                if (amount <= this.cashbox) {
                    this.cashbox = this.cashbox - Number(amount);
                    player.stats.money = player.stats.money + Number(amount);
                    player.SendChatMessage(languages.cashbox_withdraw_success1 + amount + languages.cashbox_withdraw_success2 + this.cashbox + "$.");
                } else return player.SendChatMessage(languages.cashbox_withdraw_error_money);
            } else return player.SendChatMessage(languages.cashbox_withdraw_error_valid);
        } else return player.SendChatMessage(languages.cashbox_withdraw_error_notowner);
    }

    cashboxDeposit(player, amount) {
        if (!isNaN(amount)) {
            if (player.stats.money >= amount) {
                this.cashbox = this.cashbox + Number(amount);
                player.stats.money -= Number(amount);
                player.SendChatMessage(languages.cashbox_deposit_success1 + amount + languages.cashbox_deposit_success2 + this.cashbox + "$.");
            } else return player.SendChatMessage(languages.cashbox_deposit_error_money);
        } else return player.SendChatMessage(languages.cashbox_deposit_error_valid);
    }
 
    lockHouse(player)
    {
        if(this.lock == false) {
        this.lock = true;
        player.SendChatMessage(languages.lock_success_lock); }
        else if(this.lock == true) {
        this.lock == false;
        player.SendChatMessage(languages.lock_success_unlock); }
    }

    homeToPlayer(player)
    {
    this.homeblip = new Blip(417, new Vector3f(this.x, this.y, this.z) );
    this.homeblip.SetNameForPlayer(player, "Home");
    this.homeblip.SetColorForPlayer(player, rgb(0, 143, 0) );
    this.homeblip.SetRouteForPlayer(player, true);
    this.homeblip.SetRouteColorForPlayer(player, rgb(0, 143, 0));
    this.homeblip.SetVisibleForPlayer(player, true);
    this.homeblip.SetShortRangeForPlayer(player, false);
    player.SendChatMessage(languages.home_success);
    }

   houseshop(player, item, amount)
    {
   	let playerstatsmoney = 1400;
   	if(this.inventory[item] >= gm.hshop[item].amount) return player.SendChatMessage(languages.houseshop_error_amount);
   	if((Number(amount) + this.inventory[item]) > gm.hshop[item].amount) return player.SendChatMessage(languages.houseshop_error_notfit + (gm.hshop[item].amount - this.inventory[item]));
   	let price = gm.hshop[item].cost * amount;
    if(playerstatsmoney >= price) {
    playerstatsmoney = playerstatsmoney - gm.hshop[item].cost;
    player.SendChatMessage(languages.houseshop_success.one + gm.hshop[item].name + languages.houseshop_success.two + price + "$!");

    this.inventory[item] += Number(amount);
    console.log(this.inventory[item]);
    } else return player.SendChatMessage(languages.houseshop_error_money);
	}
}


hclass.loadHouses = function() 
	{
    let connection = gm.utility.dbConnect();
    connection.connect();
    connection.query("SELECT MAX(id) AS id FROM houses WHERE id != 9999", function(err, houseid) 
    	{
        if (err) throw err;
        let max_house = houseid[0].id;
        for (let i = 0; i < max_house + 1; i++) 
        	{
            let Query = "SELECT * FROM houses WHERE id = ?";
            connection.query(Query, i, function(err, results) 
            	{
                if (results.length) {
                    if (err) {
                        throw err;
                    } else 
                    	{
                    	let invquery = "SELECT * FROM houses_inv WHERE id = ?";
                   		 connection.query(invquery, i, function(err2, results2) 
                   		 	{
                    		if(err) 
                    			{
                    			throw err;
                    			} 
                    		else 
                    			{
                    			let inventory = results2[0];
                        		HouseInfo[i] = new hclass.House(results[0].id, results[0].cx, results[0].cy, results[0].cz, results[0].price, results[0].rentbool, results[0].rentcost, results[0].level, results[0].powercost, results[0].cashbox, results[0].owner, results[0].renter, results[0].forbidden,true,inventory);
                    			};
                    console.log("House loaded (ID: " + HouseInfo[i].id + ")");
                    		});
                		}
                } 
                else 
                	{
                    HouseInfo[i] = new hclass.House(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1);
                	}
            	});
        	}
    	});
	}
