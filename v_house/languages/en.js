"use strict";

module.exports = {

housebuy_success: "SUCCESS: You have successfully bought this house for ",
housebuy_info1: "HOUSE: As a house owner, you can change all settings under the command: /housesettings",
housebuy_info2: "HOUSE: The rents of your lodgers will be deposited in the house cashbox: /cashbox",
housebuy_info3: "HOUSE: If you ever forget a house command, just look it up under the cmd: /househelp",
housebuy_error_money: "ERROR: You do not have enough money to buy this house!",
housebuy_error_owned: "ERROR: You cannot buy a house that is already been owned by someone else!",
housebuy_error_already: "ERROR: You already own a house or rental contract of a room somewhere else!",

housesell_success: "SUCCESS: You have successfully sold your house for ",
housesell_info1: "HOUSE: You can now buy a new house or take lodgings with someone else!",
housesell_error_nohouse: "ERROR: You do not own a house you can sell!",
housesell_error_notowner: "ERROR: You do not own this house!",

rent_success: "SUCESS: You have successfully rented a room in this house for ",
rent_info1: "HOUSE: You can now enter the house when ever you want.",
rent_info2: "HOUSE: You will pay your rent into the house cashbox with every coming payday!",
rent_info3: "HOUSE: You can find everything you have to now under the command: /househelp!",
rent_error_money: "ERROR: You do not carry enough money with you to rent a room at the moment!",
rent_error_rentable: "ERROR: You can not rent a room at this house!",
rent_error_already: "ERROR: You already own a house or rented a room somewhere else!",
rent_error_banned: "ERROR: You were banned from this house, therefore you cannot rent a room again!",

unrent_success: "SUCCESS: You have successfully quit your rental contract for your room in this house!",
unrent_info1: "HOUSE: You are now able to purchase a house or rent a room somewhere else.",
unrent_error_wronghouse: "ERROR: You do not have a rental contract with this house!",
unrent_error_norent: "ERROR: You do not own a rental contract of a house!",

cashbox_withdraw_success1: "SUCCESS: You successfully withdrawed ",
cashbox_withdraw_success2: "$ out of your house cashbox! New balance: ",
cashbox_withdraw_error_money: "ERROR: The amount you entered is above the current balance of your cashbox!",
cashbox_withdraw_error_valid: "ERROR: Use a valid value for your withdraw (/cashbox withdraw [$])",
cashbox_withdraw_error_notowner: "ERROR: You are not the owner of this house, therefore you can not withdraw money out of the cashbox!",

cashbox_deposit_success1: "SUCCESS: You successfully deposited ",
cashbox_deposit_success2: "$ into your house cashbox! New balance: ",
cashbox_deposit_error_money: "ERROR: The amount you entered is above your own money balance!",
cashbox_deposit_error_valid: "ERROR: Use a valid value for your deposit (/cashbox deposit [$]",

cashbox_balance_success: "HOUSE: The current cashbox balance is: ",
cashbox_balance_error_empty: "HOUSE: The cashbox is currently empty!",
cashbox_balance_error_notowner: "ERROR: You are neither the owner of this house nor rent a room here!",

cashbox_error_nohouse: "ERROR: You do not have access to this command, since you do not own a house/rent a room!",
cashbox_error_dw_use: "ERROR: Use /cashbox [deposit/withdraw/] (amount)",
cashbox_error_use: "ERROR: Use /cashbox [deposit/withdraw/balance] (amount)",

lock_success_lock: "HOUSE: You locked the house!",
lock_success_unlock: "HOUSE: You unlocked the house!",
lock_error_nohouse: "ERROR: You do not have access to this command, since you do not own a house/rent a room!",
lock_error_notowner: "ERROR: You are neither the owner of this house nor rent a room here!",

home_success: "HOUSE: A route to your home got set on your minimap!",
home_error_nohome: "ERROR: You do not have access to this command, since you do not own a house/rent a room!",
home_error_already: "ERROR: You have already activated the GPS route to your home!",

error_message: "You do not have the permission to use this command!"
}