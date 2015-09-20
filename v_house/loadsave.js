"use strict";

let loadsave = module.exports;


loadsave.LoadHouses = function()
	{
	let connection = gm.utility.dbConnect();
	connection.connect();

	connection.query("SELECT MAX(id) AS id FROM houses WHERE id != 9999", function(err, res)
		{
		if(err) throw err;
		let max_house = res[0].id;

		for(let i=0; i< max_house + 1; i++)
			{
			let Query = "SELECT * FROM houses WHERE id = ?";
			connection.query(Query, i, function(err,results)
				{
				if(results.length)
					{
					if (err) { throw err; }
					else 	{
					HouseInfo[i] = 			{
						id: results[0].id,
          				x: results[0].cx,
          				y: results[0].cy,
          				z: results[0].cz,
          				price: results[0].price,
          				rentable: results[0].rentbool,
          				rentcost: results[0].rentcost,
          				level: results[0].level,
          				powercost: results[0].price *(CURRENT_POWER_RATE/1000) + ((results[0].price * (CURRENT_POWER_RATE/1000)) * results[0].renter),
          				cashbox: results[0].cashbox,
          				owner: results[0].owner,
          				renter: results[0].renter,
          				forbidden: results[0].forbidden
										}
						console.log("House loaded (ID: " + i + ")");
						console.log("House " + i + ": " + HouseInfo[i].powercost);
											}
					}
				else 	
					{
					HouseInfo[i] = 			{
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
          				forbidden: ""
											}
					}
				});
			}
		});
	}


/*loadsave.UpdateHouseColumn = function(house, column, value)
	{
	let connection = gm.utility.dbConnect();
	connection.connect();
	let query = 'UPDATE houses SET ? = ' + value + 'WHERE id = ' + house;
	connection.query(query, column , function(err)
		{
		if(err) throw err;
		else console.log("House update of house id " + house + " of " + column + " to " + value + " successful!");
		});
	}*/

/*loadsave.UpdateAllHouses = function()
	{
	let connection = gm.utility.dbConnect();
	connection.connect();

	connection.query("SELECT MAX(id) AS id FROM houses WHERE id != 9999", function(err, res)
		{
		if(err) { throw err; }
		let max_house = res[0].id;
		for(let i=0; i<max_house +1; i++)
			{
			let id = HouseInfo[i].id;
			let price = HouseInfo[i].price;
			let rentboolean = HouseInfo[i].rentable;
			let rentcost = HouseInfo[i].rentcost;
			let coordx = HouseInfo[i].cx;
			let coordy = HouseInfo[i].cy;
			let coordz = HouseInfo[i].cz;
			let owner = HouseInfo[i].owner;
			let level = HouseInfo[i].level;
			let powercost = HouseInfo[i].powercost;

			connection.query('UPDATE houses SET price = "price", rentbool = "rentboolean", rentcost = "rentcost", cx = "coordx", cy = "coordy", cz = "coordz", owner = "owner", level = "level", powercost = "powercost" WHERE id = ?',i,function(err,res)
				{
				if(err) throw err;
				});
			}
		console.log("All houses updated!");
		});
	}*/

