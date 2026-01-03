const { request } = require("node:http");
const path = require('path'); 

const setinggs = {
    token : '', //Token Bot Telegram Anda
    adminid : '', //ID Telegram Anda
    pp: 'https://files.catbox.moe/s6oxnk.jpg', //Profile Picture Bot Telegram Anda
    qris_folder: path.join(__dirname, 'qris'), // path folder qris
    domainpanel : '', //Domain Panel Pterodactyl Anda
    plta : '', //Api Dari Pterodactyl
    pltc : '', //Client Api Dari Pterodactyl
    loc : '', //Lokasi Yang anda gunakan
    eggs : '', //Eggs yang anda gunakan
};

module.exports = setinggs;