// v_house main file
// based on the default package main file by Jan 'Waffle' C.
// v_house mysql house system by @Svvite
// For GTA-Multiplayer (GTA V) on: http://gta-mp.net
"use strict";
global.gm = {
    config: require('./config.js'),
    events: require('./events.js'),
    utility: require('./utility.js'),
    loadsave: require('./loadsave.js'),
    mysql: require('./node_modules/mysql')
};
global.HouseInfo = [];
global.CURRENT_POWER_RATE = 0.175; // 17,5% of a 1/1000 of the house price (e.g. 1.000.000$ / 1000 = 1000$ => 175$ of power costs per person)  /// Only the house-owner will pay the total of powercosts, so the 175$ have to be included in to the rent to receive profit out of the renting as a owner.
function main() {
    console.log("Server started!");
    gm.events.register();
    let testconnect = gm.utility.dbConnect();
    testconnect.connect(function(err) {
        if (err) {
            console.log("ERROR: An error occured while connecting to the database!")
            throw err;
        } else {
            console.log("SUCCESS: Database successfully connected!");
        }
    });
    gm.loadsave.LoadHouses();
    testconnect.end();
}
main();