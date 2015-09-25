# v_house
*v_house - mySQL House system for GTA-MP*

**v_house** is a mySQl house system project for GTA-MP (gta-mp.net) that allows you to dynamically create, modify and delete houses from the in-game client. Included are various house features that will allow players to have a unique experience with housing in GTA-MP. It also features several house properties that will enable new gameplay exception (e.g. house-individual power costs per payday). Still in early development, changes will follow weekly!



##Requirements:
*	[node-mysql](https://github.com/felixge/node-mysql/)
*	GTA-MP Script Test Application (if you want to import it already)


######Things you need to add into your player-data system: 
*	PlayerInfo[player.name].admin
*	PlayerInfo[player.name].howner
*	PlayerInfo[player.name].rent   

*If you do not have a player system similar to this, you have to adjust these three   
objects in the files to your actual system and add the vars - admin - howner and rent to it.*

##Current functions and commands:
Current commands:
*	househelp 
*	housecreate
*	housedelete
*	housesettings
*	housebuy
*	housesell
*	housekick
*	rent
*	unrent
*	cashbox
  
    
*/househelp* - Lists all current commands


*/housecreate* - Creates a house and adds it into the database (**Only available for admins**)
```
[price] (integer)
[rentable] (boolean -> 1/0 or true/false)
[rent cost] (integer)
```



*/housedelete* - Deletes the house and removes it from the database (**Only available for admins**)

*/housesettings* - Allows the owner to change the current house settings
```
[setting] (text)
[value] (integer)
settings: rentable/level/rentcost/maxrenters
adminsetting: houseprice
```

*/housebuy* - Allows the player to buy the house if he has enough money

*/housesell* - Allows the player to sell his house to regain 80% of the initial buy-price

*/housekick* - Allows the house owner to kick out a lodger and ban him for future rental contracts.
```
[playername or id] (text)
/housesettings [playername or id]
```

*/rent* - Allows the player to rent into a house that is rentable (rent boolean = 1)

*/unrent* - Cancels the current rental contract of a player

*/cashbox* - Lodgers pay their rent into the cashbox per payday + more functions
```
[setting] (text)
[value] (integer) 
setting: deposit/balance
owner setting: withdraw
```  
##Additional Features
**Power costs:**  
Every house has its individual power costs: The price of a house (e.g. 1.000.000$) determines the basic power cost a owner has to pay. With every additional member of the house (renter), the owner has to pay the basic cost again. Therefore, the owner has to defray his costs through the rent price. The rate that determines the basic power cost is dynamically changeable, so the rate could change even in active server sessions.
The current equation:  
 *(houseprice/1000) * power_rate + ((houseprice/1000) * power_rate) * amount_of_renters*  
  
##Multilingual support  
 You can change between different languagepacks to change the language of all messages users will receive.  
 If your desired language isn't in the standard pack right now, feel free to add your own languagepack:  
 Simply modify the original 'en' languagepack and translate every line into your requested language.  
 Make sure to share your pack with me, if you want me to add it to the standard-pack. I'd be very thankful =).
      How to change the languagepack:
      Simply change the languagepack in the 'config.js' of v_house to your desired language.
      Note: If your package is called "fr.js", you have to change the languagepack config to: 'fr'.
