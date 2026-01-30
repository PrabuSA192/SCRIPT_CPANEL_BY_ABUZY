/*
╔══════════════════════════════════════════════╗
║ ⚠️  PERINGATAN PENTING                       ║
║ ❌ Script ini TIDAK BOLEH DIPERJUALBELIKAN!  ║
╠══════════════════════════════════════════════╣
║ 🛠️ Version   : 2.0                           ║
║ 👨‍💻 Developer : AbuZy Creative                ║
║ 🌐 Website   : t.me/abuzycreative            ║
║ 💻 GitHub    : github.com/PrabuSA192/        ║
╠══════════════════════════════════════════════╣
║ 📌 Open Source mulai 3 Januari 2026          ║
║ 🔗 Bisa digunakan GRATIS & untuk edukasi     ║
╚══════════════════════════════════════════════╝
*/


const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
const fs = require('fs');
const os = require('os');
const chalk = require('chalk');
const figlet = require('figlet');
const FormData = require('form-data');
const path = require('path');
const settings = require('./settings');
const botToken = settings.token;
const owner = settings.adminid;
const adminfile = 'adminID.json';
const premiumUsersFile = 'premiumUsers.json';
const domain = settings.domainpanel;
const plta = settings.plta;
const pltc = settings.pltc;

// TAMBAHIN INI! (baris 20)
const bot = new TelegramBot(botToken, { polling: true });

try {
    premiumUsers = JSON.parse(fs.readFileSync(premiumUsersFile));
} catch (error) {
    console.error('Error reading premiumUsers file:', error);
}

// ====================
// STARTUP DISPLAY
// ====================
const TERMINAL_WIDTH = process.stdout.columns || 45;
const horizontalLine = (length = TERMINAL_WIDTH, char = "=") => char.repeat(length);
let cachedIP = null;

const getPublicIP = async () => {
    if (cachedIP) return cachedIP;
    const ipServices = ["https://api.ipify.org?format=json", "https://ipv4.icanhazip.com", "https://ifconfig.me/ip"];
    for (const url of ipServices) {
        try {
            const response = await axios.get(url, { timeout: 5000 });
            let ip = response.data?.ip || (typeof response.data === "string" ? response.data.trim() : null);
            if (ip) { cachedIP = ip; return cachedIP; }
        } catch (error) { continue; }
    }
    return "Unable to fetch";
};

const getServerSpecs = async () => {
    const totalMem = (os.totalmem() / 1024 ** 3).toFixed(2);
    const freeMem = (os.freemem() / 1024 ** 3).toFixed(2);
    const usedMem = (totalMem - freeMem).toFixed(2);
    const uptime = os.uptime();
    const days = Math.floor(uptime / 86400);
    const hours = Math.floor((uptime % 86400) / 3600);
    const minutes = Math.floor((uptime % 3600) / 60);
    return {
        totalMemory: `${totalMem} GB`,
        usedMemory: `${usedMem} GB`,
        uptime: `${days}d ${hours}h ${minutes}m`,
        publicIp: await getPublicIP(),
    };
};

async function showBotInfo() {
    const specs = await getServerSpecs();
    console.log(`\n${chalk.cyan(horizontalLine(TERMINAL_WIDTH, "="))}`);
    try {
        console.log(chalk.cyan(figlet.textSync("BOT ABU", { horizontalLayout: "default", width: 50 })));
    } catch (error) {
        console.log(chalk.cyan.bold("\n    BOT ABU\n"));
    }
    console.log(chalk.cyan(horizontalLine(TERMINAL_WIDTH, "=")));
    console.log(`\n${chalk.yellow.bold("◧ Bot Information:")}`);
    console.log(`${chalk.green("Version      :")} 2.0`);
    console.log(`${chalk.green("Author       :")} AbuZy Creative`);
    console.log(`${chalk.green("GitHub       :")} github.com/PrabuSA192`);
    console.log(`${chalk.green("Telegram     :")} t.me/abuzycreative`);
    console.log(`${chalk.green("Memory       :")} ${specs.usedMemory} / ${specs.totalMemory}`);
    console.log(`${chalk.green("Uptime       :")} ${specs.uptime}`);
    console.log(`${chalk.green("Public IP    :")} ${specs.publicIp}`);
    console.log(`\n${chalk.cyan(horizontalLine(TERMINAL_WIDTH, "="))}`);
    console.log(chalk.cyan.bold("    ◧ Bot is running successfully! ◧"));
    console.log(`${chalk.cyan(horizontalLine(TERMINAL_WIDTH, "="))}\n`);
}

(async () => {
    await showBotInfo();
    
    bot.on('polling_error', (err) => {
        console.log(chalk.red("[AbuZy Creative]: Waduh gagal konek bre lu ubah kode nya ya?"));
        console.error(err);
    });

    bot.getMe()
        .then(() => {
            console.log(chalk.green("[AbuZy Creative]: Bot Dah Aktif Bro sung gaasss"));
        })
        .catch(() => {
            console.log(chalk.red("[AbuZy Creative]: Waduh gagal konek bre lu ubah kode nya ya?"));
        });
})();

try {
    adminUsers = JSON.parse(fs.readFileSync(adminfile));
} catch (error) {
    console.error('Error reading adminUsers file:', error);
}

function getRunDuration(startTime) {
    const uptime = process.uptime();
    const hours = Math.floor(uptime / 3600);
    const minutes = Math.floor((uptime % 3600) / 60);
    const seconds = Math.floor(uptime % 60);
    return `${hours} Jam ${minutes} Menit ${seconds} Detik`;
}

const nama = 'AbuZy Creative';
const author = 'AbuZy Creative';
const versi = '2.0.';

const startTime = Date.now();
//▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰//
//          STARTBOT         //
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const sender = msg.from.username || msg.from.first_name;

    const text11 = `
👋 Halo <b>@${sender}</b>!

┏━━━💠 <b>PILIH MENU</b> 💠━━━┓
│
│ 📌 /cekid       - Cek ID kamu
│ 📌 /listcpanel  - Lihat list panel
│ 📌 /ownermenu   - Menu Owner
│ 📌 /payment     - Info Pembayaran
│ 📌 /ping        - Cek respons bot
│ 📌 /vpsinfo     - Cek spesifikasi VPS
│
┗━━━━━━━━━━━━━━━━━━━┛
`;

    bot.sendPhoto(chatId, settings.pp, { 
        caption: text11,
        parse_mode: 'HTML',
        reply_markup: {
            inline_keyboard: [
                [
                    { text: '📺 CHANNEL', url: 'https://t.me/abuzytesti' },
                    { text: '👤 OWNER', url: 'https://t.me/abuzycreative' }
                ]
            ]
        }
    });
});


// ====================
// COMMAND: /addprem
// ====================
bot.onText(/^\/addprem(?:\s+(.+))?$/, (msg, match) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;

    if (!isOwner(userId)) {
        return bot.sendMessage(chatId, '❌ Only owner can perform this action.');
    }

    const targetUserId = match[1];
    if (!targetUserId) {
        return bot.sendMessage(chatId, 
            `❌ Format salah!\n\n` +
            `📝 Contoh:\n` +
            `/addprem 123456789`
        );
    }

    // Validasi apakah input adalah angka (ID Telegram)
    if (!/^\d+$/.test(targetUserId)) {
        return bot.sendMessage(chatId, '❌ ID Telegram harus berupa angka!');
    }

    // Validasi panjang ID (biasanya 5-15 digit)
    if (targetUserId.length < 5 || targetUserId.length > 15) {
        return bot.sendMessage(chatId, '❌ ID Telegram tidak valid! (5-15 digit)');
    }

    if (!fs.existsSync(premiumUsersFile)) {
        fs.writeFileSync(premiumUsersFile, JSON.stringify([]));
    }

    const premiumUsers = JSON.parse(fs.readFileSync(premiumUsersFile));

    if (premiumUsers.includes(targetUserId)) {
        return bot.sendMessage(chatId, `⚠️ User ${targetUserId} sudah premium!`);
    }

    premiumUsers.push(targetUserId);
    fs.writeFileSync(premiumUsersFile, JSON.stringify(premiumUsers, null, 2));
    
    bot.sendMessage(chatId, `✅ User ${targetUserId} berhasil ditambahkan ke premium users!`);
});

// ====================
// COMMAND: /delprem
// ====================
bot.onText(/^\/delprem(?:\s+(.+))?$/, (msg, match) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;

    if (!isOwner(userId)) {
        return bot.sendMessage(chatId, '❌ Only owner can perform this action.');
    }

    const targetUserId = match[1];
    if (!targetUserId) {
        return bot.sendMessage(chatId, 
            `❌ Format salah!\n\n` +
            `📝 Contoh:\n` +
            `/delprem 123456789`
        );
    }

    // Validasi apakah input adalah angka (ID Telegram)
    if (!/^\d+$/.test(targetUserId)) {
        return bot.sendMessage(chatId, '❌ ID Telegram harus berupa angka!');
    }

    // Validasi panjang ID (biasanya 5-15 digit)
    if (targetUserId.length < 5 || targetUserId.length > 15) {
        return bot.sendMessage(chatId, '❌ ID Telegram tidak valid! (5-15 digit)');
    }

    if (!fs.existsSync(premiumUsersFile)) {
        fs.writeFileSync(premiumUsersFile, JSON.stringify([]));
    }

    let premiumUsers = JSON.parse(fs.readFileSync(premiumUsersFile));

    if (!premiumUsers.includes(targetUserId)) {
        return bot.sendMessage(chatId, `⚠️ User ${targetUserId} tidak ada di premium users!`);
    }

    premiumUsers = premiumUsers.filter(id => id !== targetUserId);
    fs.writeFileSync(premiumUsersFile, JSON.stringify(premiumUsers, null, 2));
    
    bot.sendMessage(chatId, `✅ User ${targetUserId} berhasil dihapus dari premium users!`);
});

// ====================
// HELPER FUNCTIONS
// ====================
function isOwner(userId) {
    if (!fs.existsSync(adminfile)) {
        // Kalau file belum ada, bikin baru dengan main owner
        fs.writeFileSync(adminfile, JSON.stringify([owner]));
    }
    
    let data = JSON.parse(fs.readFileSync(adminfile));
    
    // Cek apakah format lama (array) atau baru (object)
    if (Array.isArray(data)) {
        // Format lama: ["123", "456"]
        return data.includes(String(userId));
    } else {
        // Format baru: {owners: ["123"], admins: ["456"]}
        return data.owners && data.owners.includes(String(userId));
    }
}

// ====================
// COMMAND: /addowner
// ====================
bot.onText(/^\/addowner(?:\s+(.+))?$/, (msg, match) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;

    if (!isOwner(userId)) {
        return bot.sendMessage(chatId, '❌ Only owner can perform this action.');
    }

    const targetUserId = match[1];
    if (!targetUserId) {
        return bot.sendMessage(chatId, 
            `❌ Format salah!\n\n` +
            `📝 Contoh:\n` +
            `/addowner 123456789`
        );
    }

    // Validasi apakah input adalah angka (ID Telegram)
    if (!/^\d+$/.test(targetUserId)) {
        return bot.sendMessage(chatId, '❌ ID Telegram harus berupa angka!');
    }

    // Validasi panjang ID (biasanya 8-10 digit)
    if (targetUserId.length < 5 || targetUserId.length > 15) {
        return bot.sendMessage(chatId, '❌ ID Telegram tidak valid! (5-15 digit)');
    }

    if (!fs.existsSync(adminfile)) {
        fs.writeFileSync(adminfile, JSON.stringify([owner]));
    }

    let data = JSON.parse(fs.readFileSync(adminfile));
    
    // Cek format file
    if (Array.isArray(data)) {
        // Format lama (array)
        if (data.includes(targetUserId)) {
            return bot.sendMessage(chatId, `⚠️ User ${targetUserId} sudah owner!`);
        }
        data.push(targetUserId);
    } else {
        // Format baru (object)
        if (!data.owners) data.owners = [];
        if (data.owners.includes(targetUserId)) {
            return bot.sendMessage(chatId, `⚠️ User ${targetUserId} sudah owner!`);
        }
        data.owners.push(targetUserId);
    }
    
    fs.writeFileSync(adminfile, JSON.stringify(data, null, 2));
    bot.sendMessage(chatId, `✅ User ${targetUserId} berhasil ditambahkan ke owner!`);
});

// ====================
// COMMAND: /delowner
// ====================
bot.onText(/^\/delowner(?:\s+(.+))?$/, (msg, match) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;

    if (!isOwner(userId)) {
        return bot.sendMessage(chatId, '❌ Only owner can perform this action.');
    }

    const targetUserId = match[1];
    if (!targetUserId) {
        return bot.sendMessage(chatId, 
            `❌ Format salah!\n\n` +
            `📝 Contoh:\n` +
            `/delowner 123456789`
        );
    }

    // Validasi apakah input adalah angka (ID Telegram)
    if (!/^\d+$/.test(targetUserId)) {
        return bot.sendMessage(chatId, '❌ ID Telegram harus berupa angka!');
    }

    // Validasi panjang ID (biasanya 5-15 digit)
    if (targetUserId.length < 5 || targetUserId.length > 15) {
        return bot.sendMessage(chatId, '❌ ID Telegram tidak valid! (5-15 digit)');
    }

    if (targetUserId === owner) {
        return bot.sendMessage(chatId, '❌ Tidak bisa hapus main owner dari settings!');
    }

    if (!fs.existsSync(adminfile)) {
        fs.writeFileSync(adminfile, JSON.stringify([owner]));
    }

    let data = JSON.parse(fs.readFileSync(adminfile));
    
    // Cek format file
    if (Array.isArray(data)) {
        // Format lama (array)
        if (!data.includes(targetUserId)) {
            return bot.sendMessage(chatId, `⚠️ User ${targetUserId} bukan owner!`);
        }
        if (data.length === 1) {
            return bot.sendMessage(chatId, '❌ Tidak bisa hapus owner terakhir!');
        }
        data = data.filter(id => id !== targetUserId);
    } else {
        // Format baru (object)
        if (!data.owners) data.owners = [];
        if (!data.owners.includes(targetUserId)) {
            return bot.sendMessage(chatId, `⚠️ User ${targetUserId} bukan owner!`);
        }
        if (data.owners.length === 1) {
            return bot.sendMessage(chatId, '❌ Tidak bisa hapus owner terakhir!');
        }
        data.owners = data.owners.filter(id => id !== targetUserId);
    }
    
    fs.writeFileSync(adminfile, JSON.stringify(data, null, 2));
    bot.sendMessage(chatId, `✅ User ${targetUserId} berhasil dihapus dari owner!`);
});

// ====================
// COMMAND: /listowner
// ====================
bot.onText(/^\/listowner$/, (msg) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;

    if (!isOwner(userId)) {
        return bot.sendMessage(chatId, '❌ Only owner can perform this action.');
    }

    if (!fs.existsSync(adminfile)) {
        fs.writeFileSync(adminfile, JSON.stringify([owner]));
    }

    let data = JSON.parse(fs.readFileSync(adminfile));
    let owners = [];
    
    // Cek format file
    if (Array.isArray(data)) {
        // Format lama (array)
        owners = data;
    } else {
        // Format baru (object)
        owners = data.owners || [];
    }

    if (owners.length === 0) {
        return bot.sendMessage(chatId, '📋 Tidak ada owner.');
    }

    let message = `👑 *OWNER LIST* (${owners.length})\n\n`;
    
    owners.forEach((id, index) => {
        const isMainOwner = id === owner;
        message += `${index + 1}. \`${id}\` ${isMainOwner ? 'OWNER BOT' : ''}\n`;
    });

    bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
});

//▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰//
//          OWNERMENU          //
bot.onText(/\/ownermenu/, (msg) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;

    // Validasi owner
    if (!isOwner(userId)) {
        return bot.sendMessage(chatId, '❌ Command ini hanya untuk owner!');
    }

    bot.sendMessage(chatId, 
`👑 𝐌𝐄𝐍𝐔 𝐎𝐖𝐍𝐄𝐑 👑

┏━━━🛠 𝐀𝐂𝐓𝐈𝐎𝐍 ━━━┓
│ ➤ /addowner  - Tambah owner
│ ➤ /delowner  - Hapus owner
│ ➤ /listowner - Lihat daftar owner
│ ➤ /addprem   - Tambah premium user
│ ➤ /delprem   - Hapus premium user
│ ➤ /listprem  - Lihat daftar premium
│ ➤ /listsrv   - Lihat server aktif
│ ➤ /listusr   - Lihat daftar user
│ ➤ /delsrv    - Hapus server
│ ➤ /delusr    - Hapus user
┗━━━━━━━━━━━━━━━━━┛`, 
    {
        parse_mode: 'HTML',
        reply_markup: {
            inline_keyboard: [
                [
                    { text: '📺 CHANNEL', url: 'https://t.me/abuzytesti' },
                    { text: '👤 OWNER', url: 'https://t.me/abuzycreative' }
                ]
            ]
        }
    });
});

// ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰//
//        LIST CREATE PANEL        //
bot.onText(/\/listcpanel/, (msg) => {
    const chatId = msg.chat.id;

    const message = `
📋 <b>𝐋𝐈𝐒𝐓 𝐂𝐑𝐄𝐀𝐓𝐄 𝐏𝐀𝐍𝐄𝐋</b>

┏━━━🖥 𝐏𝐀𝐍𝐄𝐋 𝐀𝐕𝐀𝐈𝐋𝐀𝐁𝐋𝐄 ━━━┓
│ 1️⃣  1GB  - user,idtele
│ 2️⃣  2GB  - user,idtele
│ 3️⃣  3GB  - user,idtele
│ 4️⃣  4GB  - user,idtele
│ 5️⃣  5GB  - user,idtele
│ 6️⃣  6GB  - user,idtele
│ 7️⃣  7GB  - userz,idtele
│ 8️⃣  8GB  - user,idtele
│ 9️⃣  9GB  - user,idtele
│ 🔟 10GB  - user,idtele
│ ♾️  UNLIMITED  - user,idtele
┗━━━━━━━━━━━━━━━━━━━━┛
`;

    bot.sendMessage(chatId, message, {
        parse_mode: 'HTML',
        reply_markup: {
            inline_keyboard: [
                [
                    { text: '📺 CHANNEL', url: 'https://t.me/abuzytesti' },
                    { text: '👤 OWNER', url: 'https://t.me/abuzycreative' }
                ]
            ]
        }
    });
});

//▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰//
//        lIST SERVER PANEL      //
bot.onText(/\/listsrv/, async (msg) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;
    const adminUsers = JSON.parse(fs.readFileSync(adminfile));
    const isAdmin = adminUsers.includes(String(userId));

    if (!isAdmin) {
        bot.sendMessage(chatId, 'ᴘᴇʀɪɴᴛᴀʜ ʜᴀɴʏᴀ ᴜɴᴛᴜᴋ ᴏᴡɴᴇʀ...', {
            reply_markup: {
                inline_keyboard: [[
                    { text: 'OWNER', url: 'https://t.me/abuzycreative' }
                ]]
            }
        });
        return;
    }

    let page = 1;

    try {
        const domain = settings.domainpanel;
        const plta = settings.plta;
        const pltc = settings.pltc;

        let f = await fetch(`${domain}/api/application/servers?page=${page}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${plta}`
            }
        });

        let res = await f.json();
        let servers = res.data;
        let messageText = "📋 *Daftar Server Aktif*\n━━━━━━━━━━━━━\n\n";

        for (let server of servers) {
            let s = server.attributes;

            let f3 = await fetch(`${domain}/api/client/servers/${s.uuid}/resources`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${pltc}`
                }
            });

            let data = await f3.json();
            let status = data.attributes?.current_state || s.status;

            messageText += `🆔 *ID Server:* ${s.id}\n`;
            messageText += `📝 *Nama Server:* ${s.name}\n`;
            messageText += `⚡ *Status:* ${status}\n`;
            messageText += `──────────────────\n`;
        }

        bot.sendMessage(chatId, messageText, { parse_mode: 'Markdown' });

    } catch (error) {
        console.error(error);
        bot.sendMessage(chatId, '❌ Terjadi kesalahan dalam memproses permintaan.');
    }
});




//▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰//
//        lIST USER PANEL      //
bot.onText(/\/listusr/, async (msg) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;

    // cek admin
    const adminUsers = JSON.parse(fs.readFileSync(adminfile));
    const isAdmin = adminUsers.includes(String(userId));
    if (!isAdmin) {
        return bot.sendMessage(chatId, 'ᴘᴇʀɪɴᴛᴀʜ ʜᴀɴʏᴀ ᴜɴᴛᴜᴋ ᴏᴡɴᴇʀ...', {
            reply_markup: {
                inline_keyboard: [[
                    { text: 'OWNER', url: 'https://t.me/RunzyNglz' }
                ]]
            }
        });
    }

    let page = 1; // default page

    try {
        const f = await fetch(`${domain}/api/application/users?page=${page}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${plta}`
            }
        });

        const res = await f.json();

        if (!res.data || res.data.length === 0) {
            return bot.sendMessage(chatId, '❌ Tidak ada user ditemukan.');
        }

        let messageText = "👥 Berikut daftar users aktif:\n\n";

        for (let user of res.data) {
            const u = user.attributes;
            messageText += `ID User: ${u.id}\n`;
            messageText += `Username: ${u.username}\n`;
            messageText += `Email: ${u.email || '-'}\n\n`;
        }

        // Pagination info
        const pagination = res.meta?.pagination;
        if (pagination) {
            messageText += `Halaman: ${pagination.current_page}/${pagination.total_pages}\n`;
            messageText += `Total User: ${pagination.count}`;
        }

        bot.sendMessage(chatId, messageText);

    } catch (error) {
        console.error(error);
        bot.sendMessage(chatId, '❌ Terjadi kesalahan dalam memproses permintaan.');
    }
});

//▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰//
//        DELETE SERVER PANEL      //
bot.onText(/\/delsrv(.*)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const srv = match[1].trim();

    const adminUsers = JSON.parse(fs.readFileSync(adminfile));
    const isAdmin = adminUsers.includes(String(msg.from.id));

    if (!isAdmin) {
        bot.sendMessage(chatId, 'ᴘᴇʀɪɴᴛᴀʜ ʜᴀɴʏᴀ ᴜɴᴛᴜᴋ ᴏᴡɴᴇʀ...', {
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: 'OWNER', url: 'https://t.me/RunzyNglz' }
                    ]
                ]
            }
        });
        return;
    }

    if (!srv) {
        bot.sendMessage(chatId, 'Mohon masukkan ID server yang ingin dihapus, contoh: /delsrv 1');
        return;
    }

    try {
        let f = await fetch(`${domain}/api/application/servers/${srv}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${plta}`
            }
        });

        let res = f.ok ? { errors: null } : await f.json();

        if (res.errors) {
            bot.sendMessage(chatId, 'SERVER NOT FOUND');
        } else {
            bot.sendMessage(chatId, 'SUCCESSFULLY DELETE THE SERVER');
        }
    } catch (error) {
        console.error(error);
        bot.sendMessage(chatId, 'Terjadi kesalahan saat menghapus server.');
    }
});

//▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰//
//     DELETE USER PANEL      //
bot.onText(/\/delusr(.*)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const usr = match[1].trim();

    const adminUsers = JSON.parse(fs.readFileSync(adminfile));
    const isAdmin = adminUsers.includes(String(msg.from.id));

    if (!isAdmin) {
        bot.sendMessage(chatId, 'ᴘᴇʀɪɴᴛᴀʜ ʜᴀɴʏᴀ ᴜɴᴛᴜᴋ ᴏᴡɴᴇʀ..', {
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: 'OWNER', url: 'https://t.me/RunzyNglz' }
                    ]
                ]
            }
        });
        return;
    }

    if (!usr) {
        bot.sendMessage(chatId, 'Mohon masukkan ID server yang ingin dihapus, contoh: /delusr 1');
        return;
    }

try {
        let f = await fetch(`${domain}/api/application/users/${usr}`, {
	            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${plta}`
            }
        });

        let res = f.ok ? { errors: null } : await f.json();

        if (res.errors) {
            bot.sendMessage(chatId, 'USER NOT FOUND');
        } else {
            bot.sendMessage(chatId, 'SUCCESSFULLY DELETE THE USER');
        }
    } catch (error) {
        console.error(error);
        bot.sendMessage(chatId, 'Terjadi kesalahan saat menghapus server.');
    }
});

// //▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰//
// //     LISTADMIN      //
bot.onText(/\/listadmin/, async (msg) => {
    const chatId = msg.chat.id;
    let text = "👑 *Daftar Admin Saat Ini*\n━━━━━━━━━━━━━\n\n";

    for (let i = 0; i < adminUsers.length; i++) {
        try {
            const user = await bot.getChat(adminUsers[i]);
            const name = user.username ? `@${user.username}` : user.first_name;
            
            // Nama dan ID di samping
            text += `${i + 1}. *${name}* (ID: ${adminUsers[i]})\n`;
        } catch (err) {
            // Kalau gagal ambil username, tetap tampil ID
            text += `${i + 1}. (ID: ${adminUsers[i]})\n`;
        }
    }

    text += `\nTotal Admin: ${adminUsers.length}`;

    bot.sendMessage(chatId, text, { parse_mode: 'Markdown' });
});
// ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰//
//    KICK MENU      //
bot.onText(/\/kick/, async (msg) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;

    // Cek kalau user admin
    const isAdmin = adminUsers.includes(String(userId));
    if (!isAdmin) {
        return bot.sendMessage(chatId, '❌ Hanya admin yang bisa mengakses menu ini.');
    }

    bot.sendMessage(chatId, "👥 Pilih user untuk dikick (ketik perintah /kick <id>)\nContoh: /kick 123456789", {
        reply_markup: {
            inline_keyboard: [
                [{ text: "OWNER", url: "https://t.me/abuzycreative" }]
            ]
        }
    });
});

// Perintah kick user
bot.onText(/\/kick (\d+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const targetId = parseInt(match[1]);
    const userId = msg.from.id;

    const isAdmin = adminUsers.includes(String(userId));
    if (!isAdmin) {
        return bot.sendMessage(chatId, '❌ Hanya admin yang bisa melakukan kick.');
    }

    try {
        await bot.kickChatMember(chatId, targetId);
        bot.sendMessage(chatId, `✅ User dengan ID ${targetId} berhasil dikick dari grup.`);
    } catch (error) {
        console.error(error);
        bot.sendMessage(chatId, `❌ Gagal kick user ID ${targetId}. Pastikan bot admin dan ID benar.`);
    }
});

// ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰//
//    CEK VPS SPEC MENU     //
bot.onText(/\/vpsinfo/, async (msg) => {
    const chatId = msg.chat.id;
    
    try {
        const os = require('os');
        
        // CPU Info
        const cpus = os.cpus();
        const cpuCore = cpus.length;
        const cpuModel = cpus[0].model;
        
        // RAM Info
        const ramTotal = Math.round(os.totalmem() / 1024 / 1024); // MB
        const freeRAM = Math.round(os.freemem() / 1024 / 1024); // MB
        const ramUsed = ramTotal - freeRAM;
        
        // System Info
        const platform = os.platform();
        const release = os.release();
        const hostname = os.hostname();
        
        // Uptime
        const uptimeSeconds = os.uptime();
        const days = Math.floor(uptimeSeconds / 86400);
        const hours = Math.floor((uptimeSeconds % 86400) / 3600);
        const minutes = Math.floor((uptimeSeconds % 3600) / 60);
        const uptime = `${days}d ${hours}h ${minutes}m`;

        const message = `🖥️ *LIVE VPS SPEC*
━━━━━━━━━━━━━━━
🧠 *CPU Core* : ${cpuCore}
⚙️ *CPU Model* : ${cpuModel}
💾 *RAM* : ${ramUsed}/${ramTotal} MB
🖥️ *OS* : ${platform} ${release}
🏷️ *Host* : ${hostname}
⏱️ *Uptime* : ${uptime}
⚠️ _Data dari environment container_`;

        bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });

    } catch (err) {
        console.error('Error getting specs:', err);
        bot.sendMessage(chatId, '❌ Gagal mengambil informasi VPS');
    }
});




//▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰//
//     LIST MEMBER GRUP      //
bot.onText(/\/listmember/, async (msg) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;

    // cek admin
    const isAdmin = adminUsers.includes(String(userId));
    if (!isAdmin) {
        return bot.sendMessage(chatId, '❌ Hanya admin yang bisa melihat daftar member.');
    }

    try {
        // Ambil daftar admin dulu
        const admins = await bot.getChatAdministrators(chatId);

        let text = `👥 Daftar Admin & Member Grup:\n\n`;

        admins.forEach((admin, index) => {
            text += `🛡 ${admin.user.first_name} - ID: ${admin.user.id}\n`;
        });

        text += `\n⚡ Catatan: Bot hanya bisa menampilkan admin dan member yang diketahui (tidak semua member grup besar).\n`;

        bot.sendMessage(chatId, text, { parse_mode: 'HTML' });

    } catch (err) {
        console.error(err);
        bot.sendMessage(chatId, '❌ Gagal mengambil daftar member. Pastikan bot adalah admin grup.');
    }
});


//▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰//
// PING BOT //
bot.onText(/\/ping/, async (msg) => {
    const chatId = msg.chat.id;

    const start = Date.now();
    const sent = await bot.sendMessage(chatId, '🏓 Ping...');
    const delay = Date.now() - start;

    let status;
    if (delay < 100) {
        status = '🚀 Lancar';
    } else if (delay < 300) {
        status = '✅ Normal';
    } else {
        status = '⚠️ Lag';
    }

    const text = `
🏓 <b>PiNG</b>

⏱ Delay : <code>${delay} ms</code>
📊 Status: ${status}
`;

    bot.editMessageText(text, {
        chat_id: chatId,
        message_id: sent.message_id,
        parse_mode: 'HTML'
    });
});

//▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰//
// CEK ID //
bot.onText(/\/cekid/, (msg) => {
    const chatId = msg.chat.id;
    const sender = msg.from.username || msg.from.first_name || 'Pengguna';
    const id = msg.from.id;
    const fullName = `${msg.from.first_name || ''} ${msg.from.last_name || ''}`.trim() || sender;

    const text12 = `
👤 <b>Info Akun Telegram Anda</b>
┏━━━━━━━━━━━━━━━┓
│
│ ✨ Username : @${sender}
│ 🆔 ID       : <code>${id}</code>
│ 📝 Nama     : ${fullName}
│
┗━━━━━━━━━━━━━━━┛
`;

    const keyboard = {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: '📺 CHANNEL', url: 'https://t.me/abuzytesti' },
                    { text: '👤 OWNER', url: 'https://t.me/abuzycreative' }
                ]
            ]
        }
    };

    bot.sendPhoto(chatId, settings.pp, { 
        caption: text12,
        parse_mode: 'HTML',
        reply_markup: keyboard
    });
});


//▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰//
//      PAYMENT      //
bot.onText(/\/payment/, (msg) => {
    const chatId = msg.chat.id;

    const textPayment = `
💰 <b>PILIH METODE PAYMENT</b>
┏━━━━━━━━━━━━━━┓
│
│ 1️⃣ /gopay
│ 2️⃣ /dana
│ 3️⃣ /qris
│
┗━━━━━━━━━━━━━━┛
Silahkan pilih metode pembayaran yang kamu inginkan.
`;

    const keyboard = {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: '📺 CHANNEL', url: 'https://t.me/abuzytesti' },
                    { text: '👤 OWNER', url: 'https://t.me/abuzycreative' }
                ]
            ]
        }
    };

    bot.sendMessage(chatId, textPayment, { parse_mode: 'HTML', reply_markup: keyboard });
});


// DANA
bot.onText(/\/dana/, (msg) => {
    const chatId = msg.chat.id;

    const textDana = `
💳 <b>PAYMENT VIA DANA</b>
┏━━━━━━━━━━━━━━┓
│ Nomor: <code>085888120719</code>
│ Atas Nama: <b>AbuZy Creative</b>
│
│ ⚠️ Setelah transfer, harap kirim bukti pembayaran
│     ke owner untuk memproses transaksi.
┗━━━━━━━━━━━━━━┛
`;

    const keyboard = {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: '📺 CHANNEL', url: 'https://t.me/abuzytesti' },
                    { text: '👤 OWNER', url: 'https://t.me/abuzycreative' }
                ]
            ]
        }
    };

    bot.sendMessage(chatId, textDana, { parse_mode: 'HTML', reply_markup: keyboard });
});


// GOPAY
bot.onText(/\/gopay/, (msg) => {
    const chatId = msg.chat.id;

    const textGopay = `
💳 <b>PAYMENT VIA GOPAY</b>
┏━━━━━━━━━━━━━━┓
│ Nomor: <code>085888120719</code>
│ Atas Nama: <b>AbuZy Creative</b>
│
│ ⚠️ Setelah transfer, harap kirim bukti pembayaran
│     ke owner untuk memproses transaksi.
┗━━━━━━━━━━━━━━┛
`;

    const keyboard = {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: '📺 CHANNEL', url: 'https://t.me/abuzytesti' },
                    { text: '👤 OWNER', url: 'https://t.me/abuzycreative' }
                ]
            ]
        }
    };

    bot.sendMessage(chatId, textGopay, { parse_mode: 'HTML', reply_markup: keyboard });
});


// QRIS
bot.onText(/\/qris/, (msg) => {
    const chatId = msg.chat.id;

    try {
        if (!fs.existsSync(settings.qris_folder)) {
            return bot.sendMessage(chatId, "❌ Folder QRIS tidak ditemukan!");
        }

        const files = fs.readdirSync(settings.qris_folder);
        const imageFiles = files.filter(file => {
            const ext = path.extname(file).toLowerCase();
            return ['.jpg', '.jpeg', '.png', '.gif'].includes(ext);
        });

        if (imageFiles.length === 0) {
            return bot.sendMessage(chatId, "❌ Tidak ada gambar QRIS di folder!");
        }

        const filePath = path.join(settings.qris_folder, imageFiles[0]);

        const captionText = `
💳 <b>PAYMENT VIA QRIS</b>
┏━━━━━━━━━━━━━━┓
│ Scan QRIS ini untuk membayar
│ ke <b>AbuZy Creative</b>.
│
│ ⚠️ Setelah transfer, harap kirim bukti
│     ke owner untuk memproses transaksi.
┗━━━━━━━━━━━━━━┛
`;

        // Kirim langsung dengan path (tanpa createReadStream)
        bot.sendPhoto(chatId, filePath, {
            caption: captionText,
            parse_mode: 'HTML',
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: '📺 CHANNEL', url: 'https://t.me/abuzytesti' },
                        { text: '👤 OWNER', url: 'https://t.me/abuzycreative' }
                    ]
                ]
            }
        });

    } catch (err) {
        console.error('Error loading QRIS:', err);
        bot.sendMessage(chatId, '❌ Gagal memuat QRIS. Hubungi owner!');
    }
});
//          PENUTUP PAYMENT          //
//▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰//


//▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰//
//          CREATE PANEL         //// 

// ====================
// HELPER FUNCTIONS
// ====================
function sanitizeUsername(name) {
    return name.toLowerCase()
        .replace(/[^a-z0-9]/g, '')
        .substring(0, 20);
}

function generateEmail(username) {
    return `${username}@panel.com`;
}

function isPremiumUser(userId) {
    if (!fs.existsSync(premiumUsersFile)) {
        fs.writeFileSync(premiumUsersFile, JSON.stringify([]));
    }
    const premiumUsers = JSON.parse(fs.readFileSync(premiumUsersFile));
    return premiumUsers.includes(String(userId));
}

function isAdmin(userId) {
    if (!fs.existsSync(adminfile)) {
        fs.writeFileSync(adminfile, JSON.stringify([owner]));
    }
    const admins = JSON.parse(fs.readFileSync(adminfile));
    return admins.includes(String(userId));
}

// ====================
// COMMAND: /1gb
// ====================
bot.onText(/^\/1gb(?:\s+(.+))?$/, async (msg, match) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;

    // Check premium atau admin
    if (!isPremiumUser(userId) && !isAdmin(userId)) {
        return bot.sendMessage(chatId, '❌ Perintah hanya untuk user premium.', {
            reply_markup: {
                inline_keyboard: [
                    [{ text: '👑 Upgrade Premium', url: 'https://t.me/abuzycreative' }]
                ]
            }
        });
    }

    // Parse input
    const input = match[1];
    if (!input || !input.includes(',')) {
        return bot.sendMessage(chatId, 
            `❌ Format salah!\n\n` +
            `📝 Contoh:\n` +
            `/1gb username,idtelegram\n\n` +
            `Contoh: /1gb johndoe,123456789`
        );
    }

    const [rawName, userTelegram] = input.split(',').map(s => s.trim());
    
    if (!/^\d+$/.test(userTelegram)) {
        return bot.sendMessage(chatId, '❌ ID Telegram harus berupa angka!');
    }

    const username = sanitizeUsername(rawName);
    if (username.length < 3) {
        return bot.sendMessage(chatId, '❌ Username minimal 3 karakter!');
    }

    const email = generateEmail(username);
    const password = username + '9740';
    const egg = parseInt(settings.eggs);
    const loc = parseInt(settings.loc);

    // Spesifikasi 1GB
    const memory = 1024;
    const disk = 1024;
    const cpu = 30;

    const processingMsg = await bot.sendMessage(chatId, '⏳ Membuat panel 1GB...');

    let userIdPanel = null;

    try {
        // STEP 1: CREATE USER
        console.log('=== STEP 1: Creating user ===');
        console.log('Username:', username);
        console.log('Email:', email);
        
        const userPayload = {
            email: email,
            username: username,
            first_name: username,
            last_name: username,
            password: password
        };

        const userResponse = await axios.post(
            `${domain}/api/application/users`,
            userPayload,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${plta}`
                }
            }
        );

        if (userResponse.data.errors) {
            throw new Error('User creation failed: ' + JSON.stringify(userResponse.data.errors));
        }

        userIdPanel = userResponse.data.attributes.id;
        console.log('✅ User created! ID:', userIdPanel);

        // Tunggu 2 detik
        await new Promise(resolve => setTimeout(resolve, 2000));

        // STEP 2: GET EGG DETAILS
        console.log('\n=== STEP 2: Getting egg details ===');
        console.log('Egg ID:', egg);
        
        let environment = {
            'INST': 'npm',
            'USER_UPLOAD': '0',
            'AUTO_UPDATE': '0',
            'CMD_RUN': 'npm start',
            'JS_FILE': 'index.js'
        };

        // Coba ambil dari API
        const nestIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        for (const nestId of nestIds) {
            try {
                const eggResponse = await axios.get(
                    `${domain}/api/application/nests/${nestId}/eggs/${egg}?include=variables`,
                    {
                        headers: {
                            'Accept': 'application/json',
                            'Authorization': `Bearer ${plta}`
                        }
                    }
                );
                
                console.log(`✅ Found egg in nest ${nestId}`);
                
                // Build environment
                environment = {};
                if (eggResponse.data.attributes.relationships?.variables?.data) {
                    eggResponse.data.attributes.relationships.variables.data.forEach(variable => {
                        const attr = variable.attributes;
                        environment[attr.env_variable] = attr.default_value || '';
                    });
                }
                break;
            } catch (err) {
                continue;
            }
        }

        console.log('Environment:', JSON.stringify(environment, null, 2));

        // STEP 3: CREATE SERVER
        console.log('\n=== STEP 3: Creating server ===');
        
        const serverPayload = {
            name: username,
            user: userIdPanel,
            egg: egg,
            docker_image: 'ghcr.io/parkervcp/yolks:nodejs_18',
            startup: 'if [[ -d .git ]] && [[ {{AUTO_UPDATE}} == "1" ]]; then git pull; fi; if [[ ! -z ${NODE_PACKAGES} ]]; then /usr/local/bin/npm install ${NODE_PACKAGES}; fi; if [[ ! -z ${UNNODE_PACKAGES} ]]; then /usr/local/bin/npm uninstall ${UNNODE_PACKAGES}; fi; if [ -f /home/container/package.json ]; then /usr/local/bin/npm install; fi;  if [[ ! -z ${CUSTOM_ENVIRONMENT_VARIABLES} ]]; then      vars=$(echo ${CUSTOM_ENVIRONMENT_VARIABLES} | tr ";" "\n");      for line in $vars;     do export $line;     done fi;  /usr/local/bin/${CMD_RUN};',
            environment: environment,
            limits: {
                memory: memory,
                swap: 0,
                disk: disk,
                io: 500,
                cpu: cpu
            },
            feature_limits: {
                databases: 5,
                backups: 5
            },
            deploy: {
                locations: [loc],
                dedicated_ip: false,
                port_range: []
            }
        };

        console.log('Server payload:', JSON.stringify(serverPayload, null, 2));

        const serverResponse = await axios.post(
            `${domain}/api/application/servers`,
            serverPayload,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${plta}`
                },
                timeout: 30000
            }
        );

        if (serverResponse.data.errors) {
            throw new Error('Server creation failed: ' + JSON.stringify(serverResponse.data.errors));
        }

        console.log('✅ Server created successfully!');
        console.log('Server ID:', serverResponse.data.attributes.id);

        // STEP 4: SEND MESSAGES
        const userMessage = `
🎉 *PANEL 1GB BERHASIL DIBUAT!*

📊 *Informasi Panel:*
👤 Username: \`${username}\`
📧 Email: \`${email}\`
🔐 Password: \`${password}\`

💾 *Spesifikasi:*
🧠 RAM: ${memory} MB
💿 Disk: ${disk} MB
⚡ CPU: ${cpu}%

🌐 *Link Panel:*
${domain}

_Simpan informasi ini dengan baik!_
        `.trim();

        await bot.sendMessage(userTelegram, userMessage, { parse_mode: 'Markdown' }).catch(err => {
            console.log('⚠️ Failed to send message to user:', err.message);
        });

        const adminMessage = `
✅ *PANEL 1GB BERHASIL DIBUAT*

📝 Detail:
• Username: ${username}
• User ID: ${userIdPanel}
• RAM: ${memory}MB
• Disk: ${disk}MB
• CPU: ${cpu}%
• Dikirim ke: ${userTelegram}

Dibuat oleh: ${msg.from.first_name || msg.from.username}
        `.trim();

        await bot.editMessageText(adminMessage, {
            chat_id: chatId,
            message_id: processingMsg.message_id,
            parse_mode: 'Markdown'
        });

    } catch (err) {
        console.error('\n❌ ERROR:', err);
        console.error('Response data:', err.response?.data);
        
        let errorMessage = '❌ Gagal membuat panel!\n\n';
        
        if (err.response) {
            const status = err.response.status;
            const data = err.response.data;
            
            errorMessage += `Status: ${status}\n\n`;
            
            if (data.errors) {
                const errors = Array.isArray(data.errors) ? data.errors : [data.errors];
                errorMessage += '📋 Errors:\n';
                errors.forEach(error => {
                    if (error.detail) {
                        errorMessage += `• ${error.detail}\n`;
                    } else if (error.code) {
                        errorMessage += `• Code: ${error.code}\n`;
                    } else {
                        errorMessage += `• ${JSON.stringify(error)}\n`;
                    }
                });
            } else if (data.message) {
                errorMessage += `Message: ${data.message}`;
            }
        } else {
            errorMessage += err.message;
        }

        // Auto cleanup
        if (userIdPanel) {
            errorMessage += '\n\n🔄 Menghapus user...';
            try {
                await axios.delete(
                    `${domain}/api/application/users/${userIdPanel}`,
                    {
                        headers: {
                            'Accept': 'application/json',
                            'Authorization': `Bearer ${plta}`
                        }
                    }
                );
                errorMessage += '\n✅ User berhasil dihapus';
            } catch (delErr) {
                errorMessage += '\n⚠️ Gagal hapus user, hapus manual!';
            }
        }

        await bot.editMessageText(errorMessage, {
            chat_id: chatId,
            message_id: processingMsg.message_id
        });
    }
});

// ====================
// COMMAND: /2gb
// ====================
bot.onText(/^\/2gb(?:\s+(.+))?$/, async (msg, match) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;

    // Check premium atau admin
    if (!isPremiumUser(userId) && !isAdmin(userId)) {
        return bot.sendMessage(chatId, '❌ Perintah hanya untuk user premium.', {
            reply_markup: {
                inline_keyboard: [
                    [{ text: '👑 Upgrade Premium', url: 'https://t.me/abuzycreative' }]
                ]
            }
        });
    }

    // Parse input
    const input = match[1];
    if (!input || !input.includes(',')) {
        return bot.sendMessage(chatId, 
            `❌ Format salah!\n\n` +
            `📝 Contoh:\n` +
            `/2gb username,idtelegram\n\n` +
            `Contoh: /2gb johndoe,123456789`
        );
    }

    const [rawName, userTelegram] = input.split(',').map(s => s.trim());
    
    if (!/^\d+$/.test(userTelegram)) {
        return bot.sendMessage(chatId, '❌ ID Telegram harus berupa angka!');
    }

    const username = sanitizeUsername(rawName);
    if (username.length < 3) {
        return bot.sendMessage(chatId, '❌ Username minimal 3 karakter!');
    }

    const email = generateEmail(username);
    const password = username + '9740';
    const egg = parseInt(settings.eggs);
    const loc = parseInt(settings.loc);

    // Spesifikasi 2GB
    const memory = 2048;
    const disk = 2048;
    const cpu = 35;

    const processingMsg = await bot.sendMessage(chatId, '⏳ Membuat panel 2GB...');

    let userIdPanel = null;

    try {
        // STEP 1: CREATE USER
        console.log('=== STEP 1: Creating user ===');
        console.log('Username:', username);
        console.log('Email:', email);
        
        const userPayload = {
            email: email,
            username: username,
            first_name: username,
            last_name: username,
            password: password
        };

        const userResponse = await axios.post(
            `${domain}/api/application/users`,
            userPayload,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${plta}`
                }
            }
        );

        if (userResponse.data.errors) {
            throw new Error('User creation failed: ' + JSON.stringify(userResponse.data.errors));
        }

        userIdPanel = userResponse.data.attributes.id;
        console.log('✅ User created! ID:', userIdPanel);

        // Tunggu 2 detik
        await new Promise(resolve => setTimeout(resolve, 2000));

        // STEP 2: GET EGG DETAILS
        console.log('\n=== STEP 2: Getting egg details ===');
        console.log('Egg ID:', egg);
        
        let environment = {
            'INST': 'npm',
            'USER_UPLOAD': '0',
            'AUTO_UPDATE': '0',
            'CMD_RUN': 'npm start',
            'JS_FILE': 'index.js'
        };

        // Coba ambil dari API
        const nestIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        for (const nestId of nestIds) {
            try {
                const eggResponse = await axios.get(
                    `${domain}/api/application/nests/${nestId}/eggs/${egg}?include=variables`,
                    {
                        headers: {
                            'Accept': 'application/json',
                            'Authorization': `Bearer ${plta}`
                        }
                    }
                );
                
                console.log(`✅ Found egg in nest ${nestId}`);
                
                // Build environment
                environment = {};
                if (eggResponse.data.attributes.relationships?.variables?.data) {
                    eggResponse.data.attributes.relationships.variables.data.forEach(variable => {
                        const attr = variable.attributes;
                        environment[attr.env_variable] = attr.default_value || '';
                    });
                }
                break;
            } catch (err) {
                continue;
            }
        }

        console.log('Environment:', JSON.stringify(environment, null, 2));

        // STEP 3: CREATE SERVER
        console.log('\n=== STEP 3: Creating server ===');
        
        const serverPayload = {
            name: username,
            user: userIdPanel,
            egg: egg,
            docker_image: 'ghcr.io/parkervcp/yolks:nodejs_18',
            startup: 'if [[ -d .git ]] && [[ {{AUTO_UPDATE}} == "1" ]]; then git pull; fi; if [[ ! -z ${NODE_PACKAGES} ]]; then /usr/local/bin/npm install ${NODE_PACKAGES}; fi; if [[ ! -z ${UNNODE_PACKAGES} ]]; then /usr/local/bin/npm uninstall ${UNNODE_PACKAGES}; fi; if [ -f /home/container/package.json ]; then /usr/local/bin/npm install; fi;  if [[ ! -z ${CUSTOM_ENVIRONMENT_VARIABLES} ]]; then      vars=$(echo ${CUSTOM_ENVIRONMENT_VARIABLES} | tr ";" "\n");      for line in $vars;     do export $line;     done fi;  /usr/local/bin/${CMD_RUN};',
            environment: environment,
            limits: {
                memory: memory,
                swap: 0,
                disk: disk,
                io: 500,
                cpu: cpu
            },
            feature_limits: {
                databases: 5,
                backups: 5
            },
            deploy: {
                locations: [loc],
                dedicated_ip: false,
                port_range: []
            }
        };

        console.log('Server payload:', JSON.stringify(serverPayload, null, 2));

        const serverResponse = await axios.post(
            `${domain}/api/application/servers`,
            serverPayload,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${plta}`
                },
                timeout: 30000
            }
        );

        if (serverResponse.data.errors) {
            throw new Error('Server creation failed: ' + JSON.stringify(serverResponse.data.errors));
        }

        console.log('✅ Server created successfully!');
        console.log('Server ID:', serverResponse.data.attributes.id);

        // STEP 4: SEND MESSAGES
        const userMessage = `
🎉 *PANEL 2GB BERHASIL DIBUAT!*

📊 *Informasi Panel:*
👤 Username: \`${username}\`
📧 Email: \`${email}\`
🔐 Password: \`${password}\`

💾 *Spesifikasi:*
🧠 RAM: ${memory} MB
💿 Disk: ${disk} MB
⚡ CPU: ${cpu}%

🌐 *Link Panel:*
${domain}

_Simpan informasi ini dengan baik!_
        `.trim();

        await bot.sendMessage(userTelegram, userMessage, { parse_mode: 'Markdown' }).catch(err => {
            console.log('⚠️ Failed to send message to user:', err.message);
        });

        const adminMessage = `
✅ *PANEL 2GB BERHASIL DIBUAT*

📝 Detail:
• Username: ${username}
• User ID: ${userIdPanel}
• RAM: ${memory}MB
• Disk: ${disk}MB
• CPU: ${cpu}%
• Dikirim ke: ${userTelegram}

Dibuat oleh: ${msg.from.first_name || msg.from.username}
        `.trim();

        await bot.editMessageText(adminMessage, {
            chat_id: chatId,
            message_id: processingMsg.message_id,
            parse_mode: 'Markdown'
        });

    } catch (err) {
        console.error('\n❌ ERROR:', err);
        console.error('Response data:', err.response?.data);
        
        let errorMessage = '❌ Gagal membuat panel!\n\n';
        
        if (err.response) {
            const status = err.response.status;
            const data = err.response.data;
            
            errorMessage += `Status: ${status}\n\n`;
            
            if (data.errors) {
                const errors = Array.isArray(data.errors) ? data.errors : [data.errors];
                errorMessage += '📋 Errors:\n';
                errors.forEach(error => {
                    if (error.detail) {
                        errorMessage += `• ${error.detail}\n`;
                    } else if (error.code) {
                        errorMessage += `• Code: ${error.code}\n`;
                    } else {
                        errorMessage += `• ${JSON.stringify(error)}\n`;
                    }
                });
            } else if (data.message) {
                errorMessage += `Message: ${data.message}`;
            }
        } else {
            errorMessage += err.message;
        }

        // Auto cleanup
        if (userIdPanel) {
            errorMessage += '\n\n🔄 Menghapus user...';
            try {
                await axios.delete(
                    `${domain}/api/application/users/${userIdPanel}`,
                    {
                        headers: {
                            'Accept': 'application/json',
                            'Authorization': `Bearer ${plta}`
                        }
                    }
                );
                errorMessage += '\n✅ User berhasil dihapus';
            } catch (delErr) {
                errorMessage += '\n⚠️ Gagal hapus user, hapus manual!';
            }
        }

        await bot.editMessageText(errorMessage, {
            chat_id: chatId,
            message_id: processingMsg.message_id
        });
    }
});

// ====================
// COMMAND: /3gb
// ====================
bot.onText(/^\/3gb(?:\s+(.+))?$/, async (msg, match) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;

    // Check premium atau admin
    if (!isPremiumUser(userId) && !isAdmin(userId)) {
        return bot.sendMessage(chatId, '❌ Perintah hanya untuk user premium.', {
            reply_markup: {
                inline_keyboard: [
                    [{ text: '👑 Upgrade Premium', url: 'https://t.me/abuzycreative' }]
                ]
            }
        });
    }

    // Parse input
    const input = match[1];
    if (!input || !input.includes(',')) {
        return bot.sendMessage(chatId, 
            `❌ Format salah!\n\n` +
            `📝 Contoh:\n` +
            `/3gb username,idtelegram\n\n` +
            `Contoh: /3gb johndoe,123456789`
        );
    }

    const [rawName, userTelegram] = input.split(',').map(s => s.trim());
    
    if (!/^\d+$/.test(userTelegram)) {
        return bot.sendMessage(chatId, '❌ ID Telegram harus berupa angka!');
    }

    const username = sanitizeUsername(rawName);
    if (username.length < 3) {
        return bot.sendMessage(chatId, '❌ Username minimal 3 karakter!');
    }

    const email = generateEmail(username);
    const password = username + '9740';
    const egg = parseInt(settings.eggs);
    const loc = parseInt(settings.loc);

    // Spesifikasi 2GB
    const memory = 3072;
    const disk = 3072;
    const cpu = 40;

    const processingMsg = await bot.sendMessage(chatId, '⏳ Membuat panel 3GB...');

    let userIdPanel = null;

    try {
        // STEP 1: CREATE USER
        console.log('=== STEP 1: Creating user ===');
        console.log('Username:', username);
        console.log('Email:', email);
        
        const userPayload = {
            email: email,
            username: username,
            first_name: username,
            last_name: username,
            password: password
        };

        const userResponse = await axios.post(
            `${domain}/api/application/users`,
            userPayload,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${plta}`
                }
            }
        );

        if (userResponse.data.errors) {
            throw new Error('User creation failed: ' + JSON.stringify(userResponse.data.errors));
        }

        userIdPanel = userResponse.data.attributes.id;
        console.log('✅ User created! ID:', userIdPanel);

        // Tunggu 2 detik
        await new Promise(resolve => setTimeout(resolve, 2000));

        // STEP 2: GET EGG DETAILS
        console.log('\n=== STEP 2: Getting egg details ===');
        console.log('Egg ID:', egg);
        
        let environment = {
            'INST': 'npm',
            'USER_UPLOAD': '0',
            'AUTO_UPDATE': '0',
            'CMD_RUN': 'npm start',
            'JS_FILE': 'index.js'
        };

        // Coba ambil dari API
        const nestIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        for (const nestId of nestIds) {
            try {
                const eggResponse = await axios.get(
                    `${domain}/api/application/nests/${nestId}/eggs/${egg}?include=variables`,
                    {
                        headers: {
                            'Accept': 'application/json',
                            'Authorization': `Bearer ${plta}`
                        }
                    }
                );
                
                console.log(`✅ Found egg in nest ${nestId}`);
                
                // Build environment
                environment = {};
                if (eggResponse.data.attributes.relationships?.variables?.data) {
                    eggResponse.data.attributes.relationships.variables.data.forEach(variable => {
                        const attr = variable.attributes;
                        environment[attr.env_variable] = attr.default_value || '';
                    });
                }
                break;
            } catch (err) {
                continue;
            }
        }

        console.log('Environment:', JSON.stringify(environment, null, 2));

        // STEP 3: CREATE SERVER
        console.log('\n=== STEP 3: Creating server ===');
        
        const serverPayload = {
            name: username,
            user: userIdPanel,
            egg: egg,
            docker_image: 'ghcr.io/parkervcp/yolks:nodejs_18',
            startup: 'if [[ -d .git ]] && [[ {{AUTO_UPDATE}} == "1" ]]; then git pull; fi; if [[ ! -z ${NODE_PACKAGES} ]]; then /usr/local/bin/npm install ${NODE_PACKAGES}; fi; if [[ ! -z ${UNNODE_PACKAGES} ]]; then /usr/local/bin/npm uninstall ${UNNODE_PACKAGES}; fi; if [ -f /home/container/package.json ]; then /usr/local/bin/npm install; fi;  if [[ ! -z ${CUSTOM_ENVIRONMENT_VARIABLES} ]]; then      vars=$(echo ${CUSTOM_ENVIRONMENT_VARIABLES} | tr ";" "\n");      for line in $vars;     do export $line;     done fi;  /usr/local/bin/${CMD_RUN};',
            environment: environment,
            limits: {
                memory: memory,
                swap: 0,
                disk: disk,
                io: 500,
                cpu: cpu
            },
            feature_limits: {
                databases: 5,
                backups: 5
            },
            deploy: {
                locations: [loc],
                dedicated_ip: false,
                port_range: []
            }
        };

        console.log('Server payload:', JSON.stringify(serverPayload, null, 2));

        const serverResponse = await axios.post(
            `${domain}/api/application/servers`,
            serverPayload,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${plta}`
                },
                timeout: 30000
            }
        );

        if (serverResponse.data.errors) {
            throw new Error('Server creation failed: ' + JSON.stringify(serverResponse.data.errors));
        }

        console.log('✅ Server created successfully!');
        console.log('Server ID:', serverResponse.data.attributes.id);

        // STEP 4: SEND MESSAGES
        const userMessage = `
🎉 *PANEL 3GB BERHASIL DIBUAT!*

📊 *Informasi Panel:*
👤 Username: \`${username}\`
📧 Email: \`${email}\`
🔐 Password: \`${password}\`

💾 *Spesifikasi:*
🧠 RAM: ${memory} MB
💿 Disk: ${disk} MB
⚡ CPU: ${cpu}%

🌐 *Link Panel:*
${domain}

_Simpan informasi ini dengan baik!_
        `.trim();

        await bot.sendMessage(userTelegram, userMessage, { parse_mode: 'Markdown' }).catch(err => {
            console.log('⚠️ Failed to send message to user:', err.message);
        });

        const adminMessage = `
✅ *PANEL 3GB BERHASIL DIBUAT*

📝 Detail:
• Username: ${username}
• User ID: ${userIdPanel}
• RAM: ${memory}MB
• Disk: ${disk}MB
• CPU: ${cpu}%
• Dikirim ke: ${userTelegram}

Dibuat oleh: ${msg.from.first_name || msg.from.username}
        `.trim();

        await bot.editMessageText(adminMessage, {
            chat_id: chatId,
            message_id: processingMsg.message_id,
            parse_mode: 'Markdown'
        });

    } catch (err) {
        console.error('\n❌ ERROR:', err);
        console.error('Response data:', err.response?.data);
        
        let errorMessage = '❌ Gagal membuat panel!\n\n';
        
        if (err.response) {
            const status = err.response.status;
            const data = err.response.data;
            
            errorMessage += `Status: ${status}\n\n`;
            
            if (data.errors) {
                const errors = Array.isArray(data.errors) ? data.errors : [data.errors];
                errorMessage += '📋 Errors:\n';
                errors.forEach(error => {
                    if (error.detail) {
                        errorMessage += `• ${error.detail}\n`;
                    } else if (error.code) {
                        errorMessage += `• Code: ${error.code}\n`;
                    } else {
                        errorMessage += `• ${JSON.stringify(error)}\n`;
                    }
                });
            } else if (data.message) {
                errorMessage += `Message: ${data.message}`;
            }
        } else {
            errorMessage += err.message;
        }

        // Auto cleanup
        if (userIdPanel) {
            errorMessage += '\n\n🔄 Menghapus user...';
            try {
                await axios.delete(
                    `${domain}/api/application/users/${userIdPanel}`,
                    {
                        headers: {
                            'Accept': 'application/json',
                            'Authorization': `Bearer ${plta}`
                        }
                    }
                );
                errorMessage += '\n✅ User berhasil dihapus';
            } catch (delErr) {
                errorMessage += '\n⚠️ Gagal hapus user, hapus manual!';
            }
        }

        await bot.editMessageText(errorMessage, {
            chat_id: chatId,
            message_id: processingMsg.message_id
        });
    }
});

// ====================
// COMMAND: /4gb
// ====================
bot.onText(/^\/4gb(?:\s+(.+))?$/, async (msg, match) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;

    // Check premium atau admin
    if (!isPremiumUser(userId) && !isAdmin(userId)) {
        return bot.sendMessage(chatId, '❌ Perintah hanya untuk user premium.', {
            reply_markup: {
                inline_keyboard: [
                    [{ text: '👑 Upgrade Premium', url: 'https://t.me/abuzycreative' }]
                ]
            }
        });
    }

    // Parse input
    const input = match[1];
    if (!input || !input.includes(',')) {
        return bot.sendMessage(chatId, 
            `❌ Format salah!\n\n` +
            `📝 Contoh:\n` +
            `/4gb username,idtelegram\n\n` +
            `Contoh: /4gb johndoe,123456789`
        );
    }

    const [rawName, userTelegram] = input.split(',').map(s => s.trim());
    
    if (!/^\d+$/.test(userTelegram)) {
        return bot.sendMessage(chatId, '❌ ID Telegram harus berupa angka!');
    }

    const username = sanitizeUsername(rawName);
    if (username.length < 3) {
        return bot.sendMessage(chatId, '❌ Username minimal 3 karakter!');
    }

    const email = generateEmail(username);
    const password = username + '9740';
    const egg = parseInt(settings.eggs);
    const loc = parseInt(settings.loc);

    // Spesifikasi 4GB
    const memory = 4096;
    const disk = 4096;
    const cpu = 44;

    const processingMsg = await bot.sendMessage(chatId, '⏳ Membuat panel 4GB...');

    let userIdPanel = null;

    try {
        // STEP 1: CREATE USER
        console.log('=== STEP 1: Creating user ===');
        console.log('Username:', username);
        console.log('Email:', email);
        
        const userPayload = {
            email: email,
            username: username,
            first_name: username,
            last_name: username,
            password: password
        };

        const userResponse = await axios.post(
            `${domain}/api/application/users`,
            userPayload,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${plta}`
                }
            }
        );

        if (userResponse.data.errors) {
            throw new Error('User creation failed: ' + JSON.stringify(userResponse.data.errors));
        }

        userIdPanel = userResponse.data.attributes.id;
        console.log('✅ User created! ID:', userIdPanel);

        // Tunggu 2 detik
        await new Promise(resolve => setTimeout(resolve, 2000));

        // STEP 2: GET EGG DETAILS
        console.log('\n=== STEP 2: Getting egg details ===');
        console.log('Egg ID:', egg);
        
        let environment = {
            'INST': 'npm',
            'USER_UPLOAD': '0',
            'AUTO_UPDATE': '0',
            'CMD_RUN': 'npm start',
            'JS_FILE': 'index.js'
        };

        // Coba ambil dari API
        const nestIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        for (const nestId of nestIds) {
            try {
                const eggResponse = await axios.get(
                    `${domain}/api/application/nests/${nestId}/eggs/${egg}?include=variables`,
                    {
                        headers: {
                            'Accept': 'application/json',
                            'Authorization': `Bearer ${plta}`
                        }
                    }
                );
                
                console.log(`✅ Found egg in nest ${nestId}`);
                
                // Build environment
                environment = {};
                if (eggResponse.data.attributes.relationships?.variables?.data) {
                    eggResponse.data.attributes.relationships.variables.data.forEach(variable => {
                        const attr = variable.attributes;
                        environment[attr.env_variable] = attr.default_value || '';
                    });
                }
                break;
            } catch (err) {
                continue;
            }
        }

        console.log('Environment:', JSON.stringify(environment, null, 2));

        // STEP 3: CREATE SERVER
        console.log('\n=== STEP 3: Creating server ===');
        
        const serverPayload = {
            name: username,
            user: userIdPanel,
            egg: egg,
            docker_image: 'ghcr.io/parkervcp/yolks:nodejs_18',
            startup: 'if [[ -d .git ]] && [[ {{AUTO_UPDATE}} == "1" ]]; then git pull; fi; if [[ ! -z ${NODE_PACKAGES} ]]; then /usr/local/bin/npm install ${NODE_PACKAGES}; fi; if [[ ! -z ${UNNODE_PACKAGES} ]]; then /usr/local/bin/npm uninstall ${UNNODE_PACKAGES}; fi; if [ -f /home/container/package.json ]; then /usr/local/bin/npm install; fi;  if [[ ! -z ${CUSTOM_ENVIRONMENT_VARIABLES} ]]; then      vars=$(echo ${CUSTOM_ENVIRONMENT_VARIABLES} | tr ";" "\n");      for line in $vars;     do export $line;     done fi;  /usr/local/bin/${CMD_RUN};',
            environment: environment,
            limits: {
                memory: memory,
                swap: 0,
                disk: disk,
                io: 500,
                cpu: cpu
            },
            feature_limits: {
                databases: 5,
                backups: 5
            },
            deploy: {
                locations: [loc],
                dedicated_ip: false,
                port_range: []
            }
        };

        console.log('Server payload:', JSON.stringify(serverPayload, null, 2));

        const serverResponse = await axios.post(
            `${domain}/api/application/servers`,
            serverPayload,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${plta}`
                },
                timeout: 30000
            }
        );

        if (serverResponse.data.errors) {
            throw new Error('Server creation failed: ' + JSON.stringify(serverResponse.data.errors));
        }

        console.log('✅ Server created successfully!');
        console.log('Server ID:', serverResponse.data.attributes.id);

        // STEP 4: SEND MESSAGES
        const userMessage = `
🎉 *PANEL 4GB BERHASIL DIBUAT!*

📊 *Informasi Panel:*
👤 Username: \`${username}\`
📧 Email: \`${email}\`
🔐 Password: \`${password}\`

💾 *Spesifikasi:*
🧠 RAM: ${memory} MB
💿 Disk: ${disk} MB
⚡ CPU: ${cpu}%

🌐 *Link Panel:*
${domain}

_Simpan informasi ini dengan baik!_
        `.trim();

        await bot.sendMessage(userTelegram, userMessage, { parse_mode: 'Markdown' }).catch(err => {
            console.log('⚠️ Failed to send message to user:', err.message);
        });

        const adminMessage = `
✅ *PANEL 4GB BERHASIL DIBUAT*

📝 Detail:
• Username: ${username}
• User ID: ${userIdPanel}
• RAM: ${memory}MB
• Disk: ${disk}MB
• CPU: ${cpu}%
• Dikirim ke: ${userTelegram}

Dibuat oleh: ${msg.from.first_name || msg.from.username}
        `.trim();

        await bot.editMessageText(adminMessage, {
            chat_id: chatId,
            message_id: processingMsg.message_id,
            parse_mode: 'Markdown'
        });

    } catch (err) {
        console.error('\n❌ ERROR:', err);
        console.error('Response data:', err.response?.data);
        
        let errorMessage = '❌ Gagal membuat panel!\n\n';
        
        if (err.response) {
            const status = err.response.status;
            const data = err.response.data;
            
            errorMessage += `Status: ${status}\n\n`;
            
            if (data.errors) {
                const errors = Array.isArray(data.errors) ? data.errors : [data.errors];
                errorMessage += '📋 Errors:\n';
                errors.forEach(error => {
                    if (error.detail) {
                        errorMessage += `• ${error.detail}\n`;
                    } else if (error.code) {
                        errorMessage += `• Code: ${error.code}\n`;
                    } else {
                        errorMessage += `• ${JSON.stringify(error)}\n`;
                    }
                });
            } else if (data.message) {
                errorMessage += `Message: ${data.message}`;
            }
        } else {
            errorMessage += err.message;
        }

        // Auto cleanup
        if (userIdPanel) {
            errorMessage += '\n\n🔄 Menghapus user...';
            try {
                await axios.delete(
                    `${domain}/api/application/users/${userIdPanel}`,
                    {
                        headers: {
                            'Accept': 'application/json',
                            'Authorization': `Bearer ${plta}`
                        }
                    }
                );
                errorMessage += '\n✅ User berhasil dihapus';
            } catch (delErr) {
                errorMessage += '\n⚠️ Gagal hapus user, hapus manual!';
            }
        }

        await bot.editMessageText(errorMessage, {
            chat_id: chatId,
            message_id: processingMsg.message_id
        });
    }
});

// ====================
// COMMAND: /5gb
// ====================
bot.onText(/^\/5gb(?:\s+(.+))?$/, async (msg, match) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;

    // Check premium atau admin
    if (!isPremiumUser(userId) && !isAdmin(userId)) {
        return bot.sendMessage(chatId, '❌ Perintah hanya untuk user premium.', {
            reply_markup: {
                inline_keyboard: [
                    [{ text: '👑 Upgrade Premium', url: 'https://t.me/abuzycreative' }]
                ]
            }
        });
    }

    // Parse input
    const input = match[1];
    if (!input || !input.includes(',')) {
        return bot.sendMessage(chatId, 
            `❌ Format salah!\n\n` +
            `📝 Contoh:\n` +
            `/5gb username,idtelegram\n\n` +
            `Contoh: /5gb johndoe,123456789`
        );
    }

    const [rawName, userTelegram] = input.split(',').map(s => s.trim());
    
    if (!/^\d+$/.test(userTelegram)) {
        return bot.sendMessage(chatId, '❌ ID Telegram harus berupa angka!');
    }

    const username = sanitizeUsername(rawName);
    if (username.length < 3) {
        return bot.sendMessage(chatId, '❌ Username minimal 3 karakter!');
    }

    const email = generateEmail(username);
    const password = username + '9740';
    const egg = parseInt(settings.eggs);
    const loc = parseInt(settings.loc);

    // Spesifikasi 2GB
    const memory = 5120;
    const disk = 5120;
    const cpu = 45;

    const processingMsg = await bot.sendMessage(chatId, '⏳ Membuat panel 5GB...');

    let userIdPanel = null;

    try {
        // STEP 1: CREATE USER
        console.log('=== STEP 1: Creating user ===');
        console.log('Username:', username);
        console.log('Email:', email);
        
        const userPayload = {
            email: email,
            username: username,
            first_name: username,
            last_name: username,
            password: password
        };

        const userResponse = await axios.post(
            `${domain}/api/application/users`,
            userPayload,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${plta}`
                }
            }
        );

        if (userResponse.data.errors) {
            throw new Error('User creation failed: ' + JSON.stringify(userResponse.data.errors));
        }

        userIdPanel = userResponse.data.attributes.id;
        console.log('✅ User created! ID:', userIdPanel);

        // Tunggu 2 detik
        await new Promise(resolve => setTimeout(resolve, 2000));

        // STEP 2: GET EGG DETAILS
        console.log('\n=== STEP 2: Getting egg details ===');
        console.log('Egg ID:', egg);
        
        let environment = {
            'INST': 'npm',
            'USER_UPLOAD': '0',
            'AUTO_UPDATE': '0',
            'CMD_RUN': 'npm start',
            'JS_FILE': 'index.js'
        };

        // Coba ambil dari API
        const nestIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        for (const nestId of nestIds) {
            try {
                const eggResponse = await axios.get(
                    `${domain}/api/application/nests/${nestId}/eggs/${egg}?include=variables`,
                    {
                        headers: {
                            'Accept': 'application/json',
                            'Authorization': `Bearer ${plta}`
                        }
                    }
                );
                
                console.log(`✅ Found egg in nest ${nestId}`);
                
                // Build environment
                environment = {};
                if (eggResponse.data.attributes.relationships?.variables?.data) {
                    eggResponse.data.attributes.relationships.variables.data.forEach(variable => {
                        const attr = variable.attributes;
                        environment[attr.env_variable] = attr.default_value || '';
                    });
                }
                break;
            } catch (err) {
                continue;
            }
        }

        console.log('Environment:', JSON.stringify(environment, null, 2));

        // STEP 3: CREATE SERVER
        console.log('\n=== STEP 3: Creating server ===');
        
        const serverPayload = {
            name: username,
            user: userIdPanel,
            egg: egg,
            docker_image: 'ghcr.io/parkervcp/yolks:nodejs_18',
            startup: 'if [[ -d .git ]] && [[ {{AUTO_UPDATE}} == "1" ]]; then git pull; fi; if [[ ! -z ${NODE_PACKAGES} ]]; then /usr/local/bin/npm install ${NODE_PACKAGES}; fi; if [[ ! -z ${UNNODE_PACKAGES} ]]; then /usr/local/bin/npm uninstall ${UNNODE_PACKAGES}; fi; if [ -f /home/container/package.json ]; then /usr/local/bin/npm install; fi;  if [[ ! -z ${CUSTOM_ENVIRONMENT_VARIABLES} ]]; then      vars=$(echo ${CUSTOM_ENVIRONMENT_VARIABLES} | tr ";" "\n");      for line in $vars;     do export $line;     done fi;  /usr/local/bin/${CMD_RUN};',
            environment: environment,
            limits: {
                memory: memory,
                swap: 0,
                disk: disk,
                io: 500,
                cpu: cpu
            },
            feature_limits: {
                databases: 5,
                backups: 5
            },
            deploy: {
                locations: [loc],
                dedicated_ip: false,
                port_range: []
            }
        };

        console.log('Server payload:', JSON.stringify(serverPayload, null, 2));

        const serverResponse = await axios.post(
            `${domain}/api/application/servers`,
            serverPayload,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${plta}`
                },
                timeout: 30000
            }
        );

        if (serverResponse.data.errors) {
            throw new Error('Server creation failed: ' + JSON.stringify(serverResponse.data.errors));
        }

        console.log('✅ Server created successfully!');
        console.log('Server ID:', serverResponse.data.attributes.id);

        // STEP 4: SEND MESSAGES
        const userMessage = `
🎉 *PANEL 5GB BERHASIL DIBUAT!*

📊 *Informasi Panel:*
👤 Username: \`${username}\`
📧 Email: \`${email}\`
🔐 Password: \`${password}\`

💾 *Spesifikasi:*
🧠 RAM: ${memory} MB
💿 Disk: ${disk} MB
⚡ CPU: ${cpu}%

🌐 *Link Panel:*
${domain}

_Simpan informasi ini dengan baik!_
        `.trim();

        await bot.sendMessage(userTelegram, userMessage, { parse_mode: 'Markdown' }).catch(err => {
            console.log('⚠️ Failed to send message to user:', err.message);
        });

        const adminMessage = `
✅ *PANEL 5GB BERHASIL DIBUAT*

📝 Detail:
• Username: ${username}
• User ID: ${userIdPanel}
• RAM: ${memory}MB
• Disk: ${disk}MB
• CPU: ${cpu}%
• Dikirim ke: ${userTelegram}

Dibuat oleh: ${msg.from.first_name || msg.from.username}
        `.trim();

        await bot.editMessageText(adminMessage, {
            chat_id: chatId,
            message_id: processingMsg.message_id,
            parse_mode: 'Markdown'
        });

    } catch (err) {
        console.error('\n❌ ERROR:', err);
        console.error('Response data:', err.response?.data);
        
        let errorMessage = '❌ Gagal membuat panel!\n\n';
        
        if (err.response) {
            const status = err.response.status;
            const data = err.response.data;
            
            errorMessage += `Status: ${status}\n\n`;
            
            if (data.errors) {
                const errors = Array.isArray(data.errors) ? data.errors : [data.errors];
                errorMessage += '📋 Errors:\n';
                errors.forEach(error => {
                    if (error.detail) {
                        errorMessage += `• ${error.detail}\n`;
                    } else if (error.code) {
                        errorMessage += `• Code: ${error.code}\n`;
                    } else {
                        errorMessage += `• ${JSON.stringify(error)}\n`;
                    }
                });
            } else if (data.message) {
                errorMessage += `Message: ${data.message}`;
            }
        } else {
            errorMessage += err.message;
        }

        // Auto cleanup
        if (userIdPanel) {
            errorMessage += '\n\n🔄 Menghapus user...';
            try {
                await axios.delete(
                    `${domain}/api/application/users/${userIdPanel}`,
                    {
                        headers: {
                            'Accept': 'application/json',
                            'Authorization': `Bearer ${plta}`
                        }
                    }
                );
                errorMessage += '\n✅ User berhasil dihapus';
            } catch (delErr) {
                errorMessage += '\n⚠️ Gagal hapus user, hapus manual!';
            }
        }

        await bot.editMessageText(errorMessage, {
            chat_id: chatId,
            message_id: processingMsg.message_id
        });
    }
});

// ====================
// COMMAND: /6gb
// ====================
bot.onText(/^\/6gb(?:\s+(.+))?$/, async (msg, match) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;

    // Check premium atau admin
    if (!isPremiumUser(userId) && !isAdmin(userId)) {
        return bot.sendMessage(chatId, '❌ Perintah hanya untuk user premium.', {
            reply_markup: {
                inline_keyboard: [
                    [{ text: '👑 Upgrade Premium', url: 'https://t.me/abuzycreative' }]
                ]
            }
        });
    }

    // Parse input
    const input = match[1];
    if (!input || !input.includes(',')) {
        return bot.sendMessage(chatId, 
            `❌ Format salah!\n\n` +
            `📝 Contoh:\n` +
            `/6gb username,idtelegram\n\n` +
            `Contoh: /6gb johndoe,123456789`
        );
    }

    const [rawName, userTelegram] = input.split(',').map(s => s.trim());
    
    if (!/^\d+$/.test(userTelegram)) {
        return bot.sendMessage(chatId, '❌ ID Telegram harus berupa angka!');
    }

    const username = sanitizeUsername(rawName);
    if (username.length < 3) {
        return bot.sendMessage(chatId, '❌ Username minimal 3 karakter!');
    }

    const email = generateEmail(username);
    const password = username + '9740';
    const egg = parseInt(settings.eggs);
    const loc = parseInt(settings.loc);

    // Spesifikasi 6GB
    const memory = 6144;
    const disk = 6144;
    const cpu = 46;

    const processingMsg = await bot.sendMessage(chatId, '⏳ Membuat panel 6GB...');

    let userIdPanel = null;

    try {
        // STEP 1: CREATE USER
        console.log('=== STEP 1: Creating user ===');
        console.log('Username:', username);
        console.log('Email:', email);
        
        const userPayload = {
            email: email,
            username: username,
            first_name: username,
            last_name: username,
            password: password
        };

        const userResponse = await axios.post(
            `${domain}/api/application/users`,
            userPayload,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${plta}`
                }
            }
        );

        if (userResponse.data.errors) {
            throw new Error('User creation failed: ' + JSON.stringify(userResponse.data.errors));
        }

        userIdPanel = userResponse.data.attributes.id;
        console.log('✅ User created! ID:', userIdPanel);

        // Tunggu 2 detik
        await new Promise(resolve => setTimeout(resolve, 2000));

        // STEP 2: GET EGG DETAILS
        console.log('\n=== STEP 2: Getting egg details ===');
        console.log('Egg ID:', egg);
        
        let environment = {
            'INST': 'npm',
            'USER_UPLOAD': '0',
            'AUTO_UPDATE': '0',
            'CMD_RUN': 'npm start',
            'JS_FILE': 'index.js'
        };

        // Coba ambil dari API
        const nestIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        for (const nestId of nestIds) {
            try {
                const eggResponse = await axios.get(
                    `${domain}/api/application/nests/${nestId}/eggs/${egg}?include=variables`,
                    {
                        headers: {
                            'Accept': 'application/json',
                            'Authorization': `Bearer ${plta}`
                        }
                    }
                );
                
                console.log(`✅ Found egg in nest ${nestId}`);
                
                // Build environment
                environment = {};
                if (eggResponse.data.attributes.relationships?.variables?.data) {
                    eggResponse.data.attributes.relationships.variables.data.forEach(variable => {
                        const attr = variable.attributes;
                        environment[attr.env_variable] = attr.default_value || '';
                    });
                }
                break;
            } catch (err) {
                continue;
            }
        }

        console.log('Environment:', JSON.stringify(environment, null, 2));

        // STEP 3: CREATE SERVER
        console.log('\n=== STEP 3: Creating server ===');
        
        const serverPayload = {
            name: username,
            user: userIdPanel,
            egg: egg,
            docker_image: 'ghcr.io/parkervcp/yolks:nodejs_18',
            startup: 'if [[ -d .git ]] && [[ {{AUTO_UPDATE}} == "1" ]]; then git pull; fi; if [[ ! -z ${NODE_PACKAGES} ]]; then /usr/local/bin/npm install ${NODE_PACKAGES}; fi; if [[ ! -z ${UNNODE_PACKAGES} ]]; then /usr/local/bin/npm uninstall ${UNNODE_PACKAGES}; fi; if [ -f /home/container/package.json ]; then /usr/local/bin/npm install; fi;  if [[ ! -z ${CUSTOM_ENVIRONMENT_VARIABLES} ]]; then      vars=$(echo ${CUSTOM_ENVIRONMENT_VARIABLES} | tr ";" "\n");      for line in $vars;     do export $line;     done fi;  /usr/local/bin/${CMD_RUN};',
            environment: environment,
            limits: {
                memory: memory,
                swap: 0,
                disk: disk,
                io: 500,
                cpu: cpu
            },
            feature_limits: {
                databases: 5,
                backups: 5
            },
            deploy: {
                locations: [loc],
                dedicated_ip: false,
                port_range: []
            }
        };

        console.log('Server payload:', JSON.stringify(serverPayload, null, 2));

        const serverResponse = await axios.post(
            `${domain}/api/application/servers`,
            serverPayload,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${plta}`
                },
                timeout: 30000
            }
        );

        if (serverResponse.data.errors) {
            throw new Error('Server creation failed: ' + JSON.stringify(serverResponse.data.errors));
        }

        console.log('✅ Server created successfully!');
        console.log('Server ID:', serverResponse.data.attributes.id);

        // STEP 4: SEND MESSAGES
        const userMessage = `
🎉 *PANEL 6GB BERHASIL DIBUAT!*

📊 *Informasi Panel:*
👤 Username: \`${username}\`
📧 Email: \`${email}\`
🔐 Password: \`${password}\`

💾 *Spesifikasi:*
🧠 RAM: ${memory} MB
💿 Disk: ${disk} MB
⚡ CPU: ${cpu}%

🌐 *Link Panel:*
${domain}

_Simpan informasi ini dengan baik!_
        `.trim();

        await bot.sendMessage(userTelegram, userMessage, { parse_mode: 'Markdown' }).catch(err => {
            console.log('⚠️ Failed to send message to user:', err.message);
        });

        const adminMessage = `
✅ *PANEL 6GB BERHASIL DIBUAT*

📝 Detail:
• Username: ${username}
• User ID: ${userIdPanel}
• RAM: ${memory}MB
• Disk: ${disk}MB
• CPU: ${cpu}%
• Dikirim ke: ${userTelegram}

Dibuat oleh: ${msg.from.first_name || msg.from.username}
        `.trim();

        await bot.editMessageText(adminMessage, {
            chat_id: chatId,
            message_id: processingMsg.message_id,
            parse_mode: 'Markdown'
        });

    } catch (err) {
        console.error('\n❌ ERROR:', err);
        console.error('Response data:', err.response?.data);
        
        let errorMessage = '❌ Gagal membuat panel!\n\n';
        
        if (err.response) {
            const status = err.response.status;
            const data = err.response.data;
            
            errorMessage += `Status: ${status}\n\n`;
            
            if (data.errors) {
                const errors = Array.isArray(data.errors) ? data.errors : [data.errors];
                errorMessage += '📋 Errors:\n';
                errors.forEach(error => {
                    if (error.detail) {
                        errorMessage += `• ${error.detail}\n`;
                    } else if (error.code) {
                        errorMessage += `• Code: ${error.code}\n`;
                    } else {
                        errorMessage += `• ${JSON.stringify(error)}\n`;
                    }
                });
            } else if (data.message) {
                errorMessage += `Message: ${data.message}`;
            }
        } else {
            errorMessage += err.message;
        }

        // Auto cleanup
        if (userIdPanel) {
            errorMessage += '\n\n🔄 Menghapus user...';
            try {
                await axios.delete(
                    `${domain}/api/application/users/${userIdPanel}`,
                    {
                        headers: {
                            'Accept': 'application/json',
                            'Authorization': `Bearer ${plta}`
                        }
                    }
                );
                errorMessage += '\n✅ User berhasil dihapus';
            } catch (delErr) {
                errorMessage += '\n⚠️ Gagal hapus user, hapus manual!';
            }
        }

        await bot.editMessageText(errorMessage, {
            chat_id: chatId,
            message_id: processingMsg.message_id
        });
    }
});

// ====================
// COMMAND: /7gb
// ====================
bot.onText(/^\/7gb(?:\s+(.+))?$/, async (msg, match) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;

    // Check premium atau admin
    if (!isPremiumUser(userId) && !isAdmin(userId)) {
        return bot.sendMessage(chatId, '❌ Perintah hanya untuk user premium.', {
            reply_markup: {
                inline_keyboard: [
                    [{ text: '👑 Upgrade Premium', url: 'https://t.me/abuzycreative' }]
                ]
            }
        });
    }

    // Parse input
    const input = match[1];
    if (!input || !input.includes(',')) {
        return bot.sendMessage(chatId, 
            `❌ Format salah!\n\n` +
            `📝 Contoh:\n` +
            `/7gb username,idtelegram\n\n` +
            `Contoh: /7gb johndoe,123456789`
        );
    }

    const [rawName, userTelegram] = input.split(',').map(s => s.trim());
    
    if (!/^\d+$/.test(userTelegram)) {
        return bot.sendMessage(chatId, '❌ ID Telegram harus berupa angka!');
    }

    const username = sanitizeUsername(rawName);
    if (username.length < 3) {
        return bot.sendMessage(chatId, '❌ Username minimal 3 karakter!');
    }

    const email = generateEmail(username);
    const password = username + '9740';
    const egg = parseInt(settings.eggs);
    const loc = parseInt(settings.loc);

    // Spesifikasi 6GB
    const memory = 6144;
    const disk = 6144;
    const cpu = 47;

    const processingMsg = await bot.sendMessage(chatId, '⏳ Membuat panel 7GB...');

    let userIdPanel = null;

    try {
        // STEP 1: CREATE USER
        console.log('=== STEP 1: Creating user ===');
        console.log('Username:', username);
        console.log('Email:', email);
        
        const userPayload = {
            email: email,
            username: username,
            first_name: username,
            last_name: username,
            password: password
        };

        const userResponse = await axios.post(
            `${domain}/api/application/users`,
            userPayload,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${plta}`
                }
            }
        );

        if (userResponse.data.errors) {
            throw new Error('User creation failed: ' + JSON.stringify(userResponse.data.errors));
        }

        userIdPanel = userResponse.data.attributes.id;
        console.log('✅ User created! ID:', userIdPanel);

        // Tunggu 2 detik
        await new Promise(resolve => setTimeout(resolve, 2000));

        // STEP 2: GET EGG DETAILS
        console.log('\n=== STEP 2: Getting egg details ===');
        console.log('Egg ID:', egg);
        
        let environment = {
            'INST': 'npm',
            'USER_UPLOAD': '0',
            'AUTO_UPDATE': '0',
            'CMD_RUN': 'npm start',
            'JS_FILE': 'index.js'
        };

        // Coba ambil dari API
        const nestIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        for (const nestId of nestIds) {
            try {
                const eggResponse = await axios.get(
                    `${domain}/api/application/nests/${nestId}/eggs/${egg}?include=variables`,
                    {
                        headers: {
                            'Accept': 'application/json',
                            'Authorization': `Bearer ${plta}`
                        }
                    }
                );
                
                console.log(`✅ Found egg in nest ${nestId}`);
                
                // Build environment
                environment = {};
                if (eggResponse.data.attributes.relationships?.variables?.data) {
                    eggResponse.data.attributes.relationships.variables.data.forEach(variable => {
                        const attr = variable.attributes;
                        environment[attr.env_variable] = attr.default_value || '';
                    });
                }
                break;
            } catch (err) {
                continue;
            }
        }

        console.log('Environment:', JSON.stringify(environment, null, 2));

        // STEP 3: CREATE SERVER
        console.log('\n=== STEP 3: Creating server ===');
        
        const serverPayload = {
            name: username,
            user: userIdPanel,
            egg: egg,
            docker_image: 'ghcr.io/parkervcp/yolks:nodejs_18',
            startup: 'if [[ -d .git ]] && [[ {{AUTO_UPDATE}} == "1" ]]; then git pull; fi; if [[ ! -z ${NODE_PACKAGES} ]]; then /usr/local/bin/npm install ${NODE_PACKAGES}; fi; if [[ ! -z ${UNNODE_PACKAGES} ]]; then /usr/local/bin/npm uninstall ${UNNODE_PACKAGES}; fi; if [ -f /home/container/package.json ]; then /usr/local/bin/npm install; fi;  if [[ ! -z ${CUSTOM_ENVIRONMENT_VARIABLES} ]]; then      vars=$(echo ${CUSTOM_ENVIRONMENT_VARIABLES} | tr ";" "\n");      for line in $vars;     do export $line;     done fi;  /usr/local/bin/${CMD_RUN};',
            environment: environment,
            limits: {
                memory: memory,
                swap: 0,
                disk: disk,
                io: 500,
                cpu: cpu
            },
            feature_limits: {
                databases: 5,
                backups: 5
            },
            deploy: {
                locations: [loc],
                dedicated_ip: false,
                port_range: []
            }
        };

        console.log('Server payload:', JSON.stringify(serverPayload, null, 2));

        const serverResponse = await axios.post(
            `${domain}/api/application/servers`,
            serverPayload,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${plta}`
                },
                timeout: 30000
            }
        );

        if (serverResponse.data.errors) {
            throw new Error('Server creation failed: ' + JSON.stringify(serverResponse.data.errors));
        }

        console.log('✅ Server created successfully!');
        console.log('Server ID:', serverResponse.data.attributes.id);

        // STEP 4: SEND MESSAGES
        const userMessage = `
🎉 *PANEL 7GB BERHASIL DIBUAT!*

📊 *Informasi Panel:*
👤 Username: \`${username}\`
📧 Email: \`${email}\`
🔐 Password: \`${password}\`

💾 *Spesifikasi:*
🧠 RAM: ${memory} MB
💿 Disk: ${disk} MB
⚡ CPU: ${cpu}%

🌐 *Link Panel:*
${domain}

_Simpan informasi ini dengan baik!_
        `.trim();

        await bot.sendMessage(userTelegram, userMessage, { parse_mode: 'Markdown' }).catch(err => {
            console.log('⚠️ Failed to send message to user:', err.message);
        });

        const adminMessage = `
✅ *PANEL 7GB BERHASIL DIBUAT*

📝 Detail:
• Username: ${username}
• User ID: ${userIdPanel}
• RAM: ${memory}MB
• Disk: ${disk}MB
• CPU: ${cpu}%
• Dikirim ke: ${userTelegram}

Dibuat oleh: ${msg.from.first_name || msg.from.username}
        `.trim();

        await bot.editMessageText(adminMessage, {
            chat_id: chatId,
            message_id: processingMsg.message_id,
            parse_mode: 'Markdown'
        });

    } catch (err) {
        console.error('\n❌ ERROR:', err);
        console.error('Response data:', err.response?.data);
        
        let errorMessage = '❌ Gagal membuat panel!\n\n';
        
        if (err.response) {
            const status = err.response.status;
            const data = err.response.data;
            
            errorMessage += `Status: ${status}\n\n`;
            
            if (data.errors) {
                const errors = Array.isArray(data.errors) ? data.errors : [data.errors];
                errorMessage += '📋 Errors:\n';
                errors.forEach(error => {
                    if (error.detail) {
                        errorMessage += `• ${error.detail}\n`;
                    } else if (error.code) {
                        errorMessage += `• Code: ${error.code}\n`;
                    } else {
                        errorMessage += `• ${JSON.stringify(error)}\n`;
                    }
                });
            } else if (data.message) {
                errorMessage += `Message: ${data.message}`;
            }
        } else {
            errorMessage += err.message;
        }

        // Auto cleanup
        if (userIdPanel) {
            errorMessage += '\n\n🔄 Menghapus user...';
            try {
                await axios.delete(
                    `${domain}/api/application/users/${userIdPanel}`,
                    {
                        headers: {
                            'Accept': 'application/json',
                            'Authorization': `Bearer ${plta}`
                        }
                    }
                );
                errorMessage += '\n✅ User berhasil dihapus';
            } catch (delErr) {
                errorMessage += '\n⚠️ Gagal hapus user, hapus manual!';
            }
        }

        await bot.editMessageText(errorMessage, {
            chat_id: chatId,
            message_id: processingMsg.message_id
        });
    }
});

// ====================
// COMMAND: /8gb
// ====================
bot.onText(/^\/8gb(?:\s+(.+))?$/, async (msg, match) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;

    // Check premium atau admin
    if (!isPremiumUser(userId) && !isAdmin(userId)) {
        return bot.sendMessage(chatId, '❌ Perintah hanya untuk user premium.', {
            reply_markup: {
                inline_keyboard: [
                    [{ text: '👑 Upgrade Premium', url: 'https://t.me/abuzycreative' }]
                ]
            }
        });
    }

    // Parse input
    const input = match[1];
    if (!input || !input.includes(',')) {
        return bot.sendMessage(chatId, 
            `❌ Format salah!\n\n` +
            `📝 Contoh:\n` +
            `/8gb username,idtelegram\n\n` +
            `Contoh: /8gb johndoe,123456789`
        );
    }

    const [rawName, userTelegram] = input.split(',').map(s => s.trim());
    
    if (!/^\d+$/.test(userTelegram)) {
        return bot.sendMessage(chatId, '❌ ID Telegram harus berupa angka!');
    }

    const username = sanitizeUsername(rawName);
    if (username.length < 3) {
        return bot.sendMessage(chatId, '❌ Username minimal 3 karakter!');
    }

    const email = generateEmail(username);
    const password = username + '9740';
    const egg = parseInt(settings.eggs);
    const loc = parseInt(settings.loc);

    // Spesifikasi 8GB
    const memory = 8192;
    const disk = 8192;
    const cpu = 48;

    const processingMsg = await bot.sendMessage(chatId, '⏳ Membuat panel 8GB...');

    let userIdPanel = null;

    try {
        // STEP 1: CREATE USER
        console.log('=== STEP 1: Creating user ===');
        console.log('Username:', username);
        console.log('Email:', email);
        
        const userPayload = {
            email: email,
            username: username,
            first_name: username,
            last_name: username,
            password: password
        };

        const userResponse = await axios.post(
            `${domain}/api/application/users`,
            userPayload,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${plta}`
                }
            }
        );

        if (userResponse.data.errors) {
            throw new Error('User creation failed: ' + JSON.stringify(userResponse.data.errors));
        }

        userIdPanel = userResponse.data.attributes.id;
        console.log('✅ User created! ID:', userIdPanel);

        // Tunggu 2 detik
        await new Promise(resolve => setTimeout(resolve, 2000));

        // STEP 2: GET EGG DETAILS
        console.log('\n=== STEP 2: Getting egg details ===');
        console.log('Egg ID:', egg);
        
        let environment = {
            'INST': 'npm',
            'USER_UPLOAD': '0',
            'AUTO_UPDATE': '0',
            'CMD_RUN': 'npm start',
            'JS_FILE': 'index.js'
        };

        // Coba ambil dari API
        const nestIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        for (const nestId of nestIds) {
            try {
                const eggResponse = await axios.get(
                    `${domain}/api/application/nests/${nestId}/eggs/${egg}?include=variables`,
                    {
                        headers: {
                            'Accept': 'application/json',
                            'Authorization': `Bearer ${plta}`
                        }
                    }
                );
                
                console.log(`✅ Found egg in nest ${nestId}`);
                
                // Build environment
                environment = {};
                if (eggResponse.data.attributes.relationships?.variables?.data) {
                    eggResponse.data.attributes.relationships.variables.data.forEach(variable => {
                        const attr = variable.attributes;
                        environment[attr.env_variable] = attr.default_value || '';
                    });
                }
                break;
            } catch (err) {
                continue;
            }
        }

        console.log('Environment:', JSON.stringify(environment, null, 2));

        // STEP 3: CREATE SERVER
        console.log('\n=== STEP 3: Creating server ===');
        
        const serverPayload = {
            name: username,
            user: userIdPanel,
            egg: egg,
            docker_image: 'ghcr.io/parkervcp/yolks:nodejs_18',
            startup: 'if [[ -d .git ]] && [[ {{AUTO_UPDATE}} == "1" ]]; then git pull; fi; if [[ ! -z ${NODE_PACKAGES} ]]; then /usr/local/bin/npm install ${NODE_PACKAGES}; fi; if [[ ! -z ${UNNODE_PACKAGES} ]]; then /usr/local/bin/npm uninstall ${UNNODE_PACKAGES}; fi; if [ -f /home/container/package.json ]; then /usr/local/bin/npm install; fi;  if [[ ! -z ${CUSTOM_ENVIRONMENT_VARIABLES} ]]; then      vars=$(echo ${CUSTOM_ENVIRONMENT_VARIABLES} | tr ";" "\n");      for line in $vars;     do export $line;     done fi;  /usr/local/bin/${CMD_RUN};',
            environment: environment,
            limits: {
                memory: memory,
                swap: 0,
                disk: disk,
                io: 500,
                cpu: cpu
            },
            feature_limits: {
                databases: 5,
                backups: 5
            },
            deploy: {
                locations: [loc],
                dedicated_ip: false,
                port_range: []
            }
        };

        console.log('Server payload:', JSON.stringify(serverPayload, null, 2));

        const serverResponse = await axios.post(
            `${domain}/api/application/servers`,
            serverPayload,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${plta}`
                },
                timeout: 30000
            }
        );

        if (serverResponse.data.errors) {
            throw new Error('Server creation failed: ' + JSON.stringify(serverResponse.data.errors));
        }

        console.log('✅ Server created successfully!');
        console.log('Server ID:', serverResponse.data.attributes.id);

        // STEP 4: SEND MESSAGES
        const userMessage = `
🎉 *PANEL 8GB BERHASIL DIBUAT!*

📊 *Informasi Panel:*
👤 Username: \`${username}\`
📧 Email: \`${email}\`
🔐 Password: \`${password}\`

💾 *Spesifikasi:*
🧠 RAM: ${memory} MB
💿 Disk: ${disk} MB
⚡ CPU: ${cpu}%

🌐 *Link Panel:*
${domain}

_Simpan informasi ini dengan baik!_
        `.trim();

        await bot.sendMessage(userTelegram, userMessage, { parse_mode: 'Markdown' }).catch(err => {
            console.log('⚠️ Failed to send message to user:', err.message);
        });

        const adminMessage = `
✅ *PANEL 8GB BERHASIL DIBUAT*

📝 Detail:
• Username: ${username}
• User ID: ${userIdPanel}
• RAM: ${memory}MB
• Disk: ${disk}MB
• CPU: ${cpu}%
• Dikirim ke: ${userTelegram}

Dibuat oleh: ${msg.from.first_name || msg.from.username}
        `.trim();

        await bot.editMessageText(adminMessage, {
            chat_id: chatId,
            message_id: processingMsg.message_id,
            parse_mode: 'Markdown'
        });

    } catch (err) {
        console.error('\n❌ ERROR:', err);
        console.error('Response data:', err.response?.data);
        
        let errorMessage = '❌ Gagal membuat panel!\n\n';
        
        if (err.response) {
            const status = err.response.status;
            const data = err.response.data;
            
            errorMessage += `Status: ${status}\n\n`;
            
            if (data.errors) {
                const errors = Array.isArray(data.errors) ? data.errors : [data.errors];
                errorMessage += '📋 Errors:\n';
                errors.forEach(error => {
                    if (error.detail) {
                        errorMessage += `• ${error.detail}\n`;
                    } else if (error.code) {
                        errorMessage += `• Code: ${error.code}\n`;
                    } else {
                        errorMessage += `• ${JSON.stringify(error)}\n`;
                    }
                });
            } else if (data.message) {
                errorMessage += `Message: ${data.message}`;
            }
        } else {
            errorMessage += err.message;
        }

        // Auto cleanup
        if (userIdPanel) {
            errorMessage += '\n\n🔄 Menghapus user...';
            try {
                await axios.delete(
                    `${domain}/api/application/users/${userIdPanel}`,
                    {
                        headers: {
                            'Accept': 'application/json',
                            'Authorization': `Bearer ${plta}`
                        }
                    }
                );
                errorMessage += '\n✅ User berhasil dihapus';
            } catch (delErr) {
                errorMessage += '\n⚠️ Gagal hapus user, hapus manual!';
            }
        }

        await bot.editMessageText(errorMessage, {
            chat_id: chatId,
            message_id: processingMsg.message_id
        });
    }
});

// ====================
// COMMAND: /9gb
// ====================
bot.onText(/^\/9gb(?:\s+(.+))?$/, async (msg, match) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;

    // Check premium atau admin
    if (!isPremiumUser(userId) && !isAdmin(userId)) {
        return bot.sendMessage(chatId, '❌ Perintah hanya untuk user premium.', {
            reply_markup: {
                inline_keyboard: [
                    [{ text: '👑 Upgrade Premium', url: 'https://t.me/abuzycreative' }]
                ]
            }
        });
    }

    // Parse input
    const input = match[1];
    if (!input || !input.includes(',')) {
        return bot.sendMessage(chatId, 
            `❌ Format salah!\n\n` +
            `📝 Contoh:\n` +
            `/8gb username,idtelegram\n\n` +
            `Contoh: /8gb johndoe,123456789`
        );
    }

    const [rawName, userTelegram] = input.split(',').map(s => s.trim());
    
    if (!/^\d+$/.test(userTelegram)) {
        return bot.sendMessage(chatId, '❌ ID Telegram harus berupa angka!');
    }

    const username = sanitizeUsername(rawName);
    if (username.length < 3) {
        return bot.sendMessage(chatId, '❌ Username minimal 3 karakter!');
    }

    const email = generateEmail(username);
    const password = username + '9740';
    const egg = parseInt(settings.eggs);
    const loc = parseInt(settings.loc);

    // Spesifikasi 8GB
    const memory = 9216;
    const disk = 9216;
    const cpu = 48;

    const processingMsg = await bot.sendMessage(chatId, '⏳ Membuat panel 9GB...');

    let userIdPanel = null;

    try {
        // STEP 1: CREATE USER
        console.log('=== STEP 1: Creating user ===');
        console.log('Username:', username);
        console.log('Email:', email);
        
        const userPayload = {
            email: email,
            username: username,
            first_name: username,
            last_name: username,
            password: password
        };

        const userResponse = await axios.post(
            `${domain}/api/application/users`,
            userPayload,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${plta}`
                }
            }
        );

        if (userResponse.data.errors) {
            throw new Error('User creation failed: ' + JSON.stringify(userResponse.data.errors));
        }

        userIdPanel = userResponse.data.attributes.id;
        console.log('✅ User created! ID:', userIdPanel);

        // Tunggu 2 detik
        await new Promise(resolve => setTimeout(resolve, 2000));

        // STEP 2: GET EGG DETAILS
        console.log('\n=== STEP 2: Getting egg details ===');
        console.log('Egg ID:', egg);
        
        let environment = {
            'INST': 'npm',
            'USER_UPLOAD': '0',
            'AUTO_UPDATE': '0',
            'CMD_RUN': 'npm start',
            'JS_FILE': 'index.js'
        };

        // Coba ambil dari API
        const nestIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        for (const nestId of nestIds) {
            try {
                const eggResponse = await axios.get(
                    `${domain}/api/application/nests/${nestId}/eggs/${egg}?include=variables`,
                    {
                        headers: {
                            'Accept': 'application/json',
                            'Authorization': `Bearer ${plta}`
                        }
                    }
                );
                
                console.log(`✅ Found egg in nest ${nestId}`);
                
                // Build environment
                environment = {};
                if (eggResponse.data.attributes.relationships?.variables?.data) {
                    eggResponse.data.attributes.relationships.variables.data.forEach(variable => {
                        const attr = variable.attributes;
                        environment[attr.env_variable] = attr.default_value || '';
                    });
                }
                break;
            } catch (err) {
                continue;
            }
        }

        console.log('Environment:', JSON.stringify(environment, null, 2));

        // STEP 3: CREATE SERVER
        console.log('\n=== STEP 3: Creating server ===');
        
        const serverPayload = {
            name: username,
            user: userIdPanel,
            egg: egg,
            docker_image: 'ghcr.io/parkervcp/yolks:nodejs_18',
            startup: 'if [[ -d .git ]] && [[ {{AUTO_UPDATE}} == "1" ]]; then git pull; fi; if [[ ! -z ${NODE_PACKAGES} ]]; then /usr/local/bin/npm install ${NODE_PACKAGES}; fi; if [[ ! -z ${UNNODE_PACKAGES} ]]; then /usr/local/bin/npm uninstall ${UNNODE_PACKAGES}; fi; if [ -f /home/container/package.json ]; then /usr/local/bin/npm install; fi;  if [[ ! -z ${CUSTOM_ENVIRONMENT_VARIABLES} ]]; then      vars=$(echo ${CUSTOM_ENVIRONMENT_VARIABLES} | tr ";" "\n");      for line in $vars;     do export $line;     done fi;  /usr/local/bin/${CMD_RUN};',
            environment: environment,
            limits: {
                memory: memory,
                swap: 0,
                disk: disk,
                io: 500,
                cpu: cpu
            },
            feature_limits: {
                databases: 5,
                backups: 5
            },
            deploy: {
                locations: [loc],
                dedicated_ip: false,
                port_range: []
            }
        };

        console.log('Server payload:', JSON.stringify(serverPayload, null, 2));

        const serverResponse = await axios.post(
            `${domain}/api/application/servers`,
            serverPayload,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${plta}`
                },
                timeout: 30000
            }
        );

        if (serverResponse.data.errors) {
            throw new Error('Server creation failed: ' + JSON.stringify(serverResponse.data.errors));
        }

        console.log('✅ Server created successfully!');
        console.log('Server ID:', serverResponse.data.attributes.id);

        // STEP 4: SEND MESSAGES
        const userMessage = `
🎉 *PANEL 9GB BERHASIL DIBUAT!*

📊 *Informasi Panel:*
👤 Username: \`${username}\`
📧 Email: \`${email}\`
🔐 Password: \`${password}\`

💾 *Spesifikasi:*
🧠 RAM: ${memory} MB
💿 Disk: ${disk} MB
⚡ CPU: ${cpu}%

🌐 *Link Panel:*
${domain}

_Simpan informasi ini dengan baik!_
        `.trim();

        await bot.sendMessage(userTelegram, userMessage, { parse_mode: 'Markdown' }).catch(err => {
            console.log('⚠️ Failed to send message to user:', err.message);
        });

        const adminMessage = `
✅ *PANEL 9GB BERHASIL DIBUAT*

📝 Detail:
• Username: ${username}
• User ID: ${userIdPanel}
• RAM: ${memory}MB
• Disk: ${disk}MB
• CPU: ${cpu}%
• Dikirim ke: ${userTelegram}

Dibuat oleh: ${msg.from.first_name || msg.from.username}
        `.trim();

        await bot.editMessageText(adminMessage, {
            chat_id: chatId,
            message_id: processingMsg.message_id,
            parse_mode: 'Markdown'
        });

    } catch (err) {
        console.error('\n❌ ERROR:', err);
        console.error('Response data:', err.response?.data);
        
        let errorMessage = '❌ Gagal membuat panel!\n\n';
        
        if (err.response) {
            const status = err.response.status;
            const data = err.response.data;
            
            errorMessage += `Status: ${status}\n\n`;
            
            if (data.errors) {
                const errors = Array.isArray(data.errors) ? data.errors : [data.errors];
                errorMessage += '📋 Errors:\n';
                errors.forEach(error => {
                    if (error.detail) {
                        errorMessage += `• ${error.detail}\n`;
                    } else if (error.code) {
                        errorMessage += `• Code: ${error.code}\n`;
                    } else {
                        errorMessage += `• ${JSON.stringify(error)}\n`;
                    }
                });
            } else if (data.message) {
                errorMessage += `Message: ${data.message}`;
            }
        } else {
            errorMessage += err.message;
        }

        // Auto cleanup
        if (userIdPanel) {
            errorMessage += '\n\n🔄 Menghapus user...';
            try {
                await axios.delete(
                    `${domain}/api/application/users/${userIdPanel}`,
                    {
                        headers: {
                            'Accept': 'application/json',
                            'Authorization': `Bearer ${plta}`
                        }
                    }
                );
                errorMessage += '\n✅ User berhasil dihapus';
            } catch (delErr) {
                errorMessage += '\n⚠️ Gagal hapus user, hapus manual!';
            }
        }

        await bot.editMessageText(errorMessage, {
            chat_id: chatId,
            message_id: processingMsg.message_id
        });
    }
});
// ====================
// COMMAND: /10gb
// ====================
bot.onText(/^\/10gb(?:\s+(.+))?$/, async (msg, match) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;

    // Check premium atau admin
    if (!isPremiumUser(userId) && !isAdmin(userId)) {
        return bot.sendMessage(chatId, '❌ Perintah hanya untuk user premium.', {
            reply_markup: {
                inline_keyboard: [
                    [{ text: '👑 Upgrade Premium', url: 'https://t.me/abuzycreative' }]
                ]
            }
        });
    }

    // Parse input
    const input = match[1];
    if (!input || !input.includes(',')) {
        return bot.sendMessage(chatId, 
            `❌ Format salah!\n\n` +
            `📝 Contoh:\n` +
            `/10gb username,idtelegram\n\n` +
            `Contoh: /10gb johndoe,123456789`
        );
    }

    const [rawName, userTelegram] = input.split(',').map(s => s.trim());
    
    if (!/^\d+$/.test(userTelegram)) {
        return bot.sendMessage(chatId, '❌ ID Telegram harus berupa angka!');
    }

    const username = sanitizeUsername(rawName);
    if (username.length < 3) {
        return bot.sendMessage(chatId, '❌ Username minimal 3 karakter!');
    }

    const email = generateEmail(username);
    const password = username + '9740';
    const egg = parseInt(settings.eggs);
    const loc = parseInt(settings.loc);

    // Spesifikasi 8GB
    const memory = 10240;
    const disk = 10240;
    const cpu = 50;

    const processingMsg = await bot.sendMessage(chatId, '⏳ Membuat panel 10GB...');

    let userIdPanel = null;

    try {
        // STEP 1: CREATE USER
        console.log('=== STEP 1: Creating user ===');
        console.log('Username:', username);
        console.log('Email:', email);
        
        const userPayload = {
            email: email,
            username: username,
            first_name: username,
            last_name: username,
            password: password
        };

        const userResponse = await axios.post(
            `${domain}/api/application/users`,
            userPayload,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${plta}`
                }
            }
        );

        if (userResponse.data.errors) {
            throw new Error('User creation failed: ' + JSON.stringify(userResponse.data.errors));
        }

        userIdPanel = userResponse.data.attributes.id;
        console.log('✅ User created! ID:', userIdPanel);

        // Tunggu 2 detik
        await new Promise(resolve => setTimeout(resolve, 2000));

        // STEP 2: GET EGG DETAILS
        console.log('\n=== STEP 2: Getting egg details ===');
        console.log('Egg ID:', egg);
        
        let environment = {
            'INST': 'npm',
            'USER_UPLOAD': '0',
            'AUTO_UPDATE': '0',
            'CMD_RUN': 'npm start',
            'JS_FILE': 'index.js'
        };

        // Coba ambil dari API
        const nestIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        for (const nestId of nestIds) {
            try {
                const eggResponse = await axios.get(
                    `${domain}/api/application/nests/${nestId}/eggs/${egg}?include=variables`,
                    {
                        headers: {
                            'Accept': 'application/json',
                            'Authorization': `Bearer ${plta}`
                        }
                    }
                );
                
                console.log(`✅ Found egg in nest ${nestId}`);
                
                // Build environment
                environment = {};
                if (eggResponse.data.attributes.relationships?.variables?.data) {
                    eggResponse.data.attributes.relationships.variables.data.forEach(variable => {
                        const attr = variable.attributes;
                        environment[attr.env_variable] = attr.default_value || '';
                    });
                }
                break;
            } catch (err) {
                continue;
            }
        }

        console.log('Environment:', JSON.stringify(environment, null, 2));

        // STEP 3: CREATE SERVER
        console.log('\n=== STEP 3: Creating server ===');
        
        const serverPayload = {
            name: username,
            user: userIdPanel,
            egg: egg,
            docker_image: 'ghcr.io/parkervcp/yolks:nodejs_18',
            startup: 'if [[ -d .git ]] && [[ {{AUTO_UPDATE}} == "1" ]]; then git pull; fi; if [[ ! -z ${NODE_PACKAGES} ]]; then /usr/local/bin/npm install ${NODE_PACKAGES}; fi; if [[ ! -z ${UNNODE_PACKAGES} ]]; then /usr/local/bin/npm uninstall ${UNNODE_PACKAGES}; fi; if [ -f /home/container/package.json ]; then /usr/local/bin/npm install; fi;  if [[ ! -z ${CUSTOM_ENVIRONMENT_VARIABLES} ]]; then      vars=$(echo ${CUSTOM_ENVIRONMENT_VARIABLES} | tr ";" "\n");      for line in $vars;     do export $line;     done fi;  /usr/local/bin/${CMD_RUN};',
            environment: environment,
            limits: {
                memory: memory,
                swap: 0,
                disk: disk,
                io: 500,
                cpu: cpu
            },
            feature_limits: {
                databases: 5,
                backups: 5
            },
            deploy: {
                locations: [loc],
                dedicated_ip: false,
                port_range: []
            }
        };

        console.log('Server payload:', JSON.stringify(serverPayload, null, 2));

        const serverResponse = await axios.post(
            `${domain}/api/application/servers`,
            serverPayload,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${plta}`
                },
                timeout: 30000
            }
        );

        if (serverResponse.data.errors) {
            throw new Error('Server creation failed: ' + JSON.stringify(serverResponse.data.errors));
        }

        console.log('✅ Server created successfully!');
        console.log('Server ID:', serverResponse.data.attributes.id);

        // STEP 4: SEND MESSAGES
        const userMessage = `
🎉 *PANEL 10GB BERHASIL DIBUAT!*

📊 *Informasi Panel:*
👤 Username: \`${username}\`
📧 Email: \`${email}\`
🔐 Password: \`${password}\`

💾 *Spesifikasi:*
🧠 RAM: ${memory} MB
💿 Disk: ${disk} MB
⚡ CPU: ${cpu}%

🌐 *Link Panel:*
${domain}

_Simpan informasi ini dengan baik!_
        `.trim();

        await bot.sendMessage(userTelegram, userMessage, { parse_mode: 'Markdown' }).catch(err => {
            console.log('⚠️ Failed to send message to user:', err.message);
        });

        const adminMessage = `
✅ *PANEL 10GB BERHASIL DIBUAT*

📝 Detail:
• Username: ${username}
• User ID: ${userIdPanel}
• RAM: ${memory}MB
• Disk: ${disk}MB
• CPU: ${cpu}%
• Dikirim ke: ${userTelegram}

Dibuat oleh: ${msg.from.first_name || msg.from.username}
        `.trim();

        await bot.editMessageText(adminMessage, {
            chat_id: chatId,
            message_id: processingMsg.message_id,
            parse_mode: 'Markdown'
        });

    } catch (err) {
        console.error('\n❌ ERROR:', err);
        console.error('Response data:', err.response?.data);
        
        let errorMessage = '❌ Gagal membuat panel!\n\n';
        
        if (err.response) {
            const status = err.response.status;
            const data = err.response.data;
            
            errorMessage += `Status: ${status}\n\n`;
            
            if (data.errors) {
                const errors = Array.isArray(data.errors) ? data.errors : [data.errors];
                errorMessage += '📋 Errors:\n';
                errors.forEach(error => {
                    if (error.detail) {
                        errorMessage += `• ${error.detail}\n`;
                    } else if (error.code) {
                        errorMessage += `• Code: ${error.code}\n`;
                    } else {
                        errorMessage += `• ${JSON.stringify(error)}\n`;
                    }
                });
            } else if (data.message) {
                errorMessage += `Message: ${data.message}`;
            }
        } else {
            errorMessage += err.message;
        }

        // Auto cleanup
        if (userIdPanel) {
            errorMessage += '\n\n🔄 Menghapus user...';
            try {
                await axios.delete(
                    `${domain}/api/application/users/${userIdPanel}`,
                    {
                        headers: {
                            'Accept': 'application/json',
                            'Authorization': `Bearer ${plta}`
                        }
                    }
                );
                errorMessage += '\n✅ User berhasil dihapus';
            } catch (delErr) {
                errorMessage += '\n⚠️ Gagal hapus user, hapus manual!';
            }
        }

        await bot.editMessageText(errorMessage, {
            chat_id: chatId,
            message_id: processingMsg.message_id
        });
    }
});

// ====================
// COMMAND: /UNLI
// ==================== 

bot.onText(/^\/unli(?:\s+(.+))?$/, async (msg, match) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;

    // Check premium atau admin
    if (!isPremiumUser(userId) && !isAdmin(userId)) {
        return bot.sendMessage(chatId, '❌ Perintah hanya untuk user premium.', {
            reply_markup: {
                inline_keyboard: [
                    [{ text: '👑 Upgrade Premium', url: 'https://t.me/abuzycreative' }]
                ]
            }
        });
    }

    // Parse input
    const input = match[1];
    if (!input || !input.includes(',')) {
        return bot.sendMessage(chatId, 
            `❌ Format salah!\n\n` +
            `📝 Contoh:\n` +
            `/unli username,idtelegram\n\n` +
            `Contoh: /unli johndoe,123456789`
        );
    }

    const [rawName, userTelegram] = input.split(',').map(s => s.trim());
    
    if (!/^\d+$/.test(userTelegram)) {
        return bot.sendMessage(chatId, '❌ ID Telegram harus berupa angka!');
    }

    const username = sanitizeUsername(rawName);
    if (username.length < 3) {
        return bot.sendMessage(chatId, '❌ Username minimal 3 karakter!');
    }

    const email = generateEmail(username);
    const password = username + '9740';
    const egg = parseInt(settings.eggs);
    const loc = parseInt(settings.loc);

    // Spesifikasi 8GB
    const memory = 0;
    const disk = 0;
    const cpu = 0;

    const processingMsg = await bot.sendMessage(chatId, '⏳ Membuat panel UNLI...');

    let userIdPanel = null;

    try {
        // STEP 1: CREATE USER
        console.log('=== STEP 1: Creating user ===');
        console.log('Username:', username);
        console.log('Email:', email);
        
        const userPayload = {
            email: email,
            username: username,
            first_name: username,
            last_name: username,
            password: password
        };

        const userResponse = await axios.post(
            `${domain}/api/application/users`,
            userPayload,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${plta}`
                }
            }
        );

        if (userResponse.data.errors) {
            throw new Error('User creation failed: ' + JSON.stringify(userResponse.data.errors));
        }

        userIdPanel = userResponse.data.attributes.id;
        console.log('✅ User created! ID:', userIdPanel);

        // Tunggu 2 detik
        await new Promise(resolve => setTimeout(resolve, 2000));

        // STEP 2: GET EGG DETAILS
        console.log('\n=== STEP 2: Getting egg details ===');
        console.log('Egg ID:', egg);
        
        let environment = {
            'INST': 'npm',
            'USER_UPLOAD': '0',
            'AUTO_UPDATE': '0',
            'CMD_RUN': 'npm start',
            'JS_FILE': 'index.js'
        };

        // Coba ambil dari API
        const nestIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        for (const nestId of nestIds) {
            try {
                const eggResponse = await axios.get(
                    `${domain}/api/application/nests/${nestId}/eggs/${egg}?include=variables`,
                    {
                        headers: {
                            'Accept': 'application/json',
                            'Authorization': `Bearer ${plta}`
                        }
                    }
                );
                
                console.log(`✅ Found egg in nest ${nestId}`);
                
                // Build environment
                environment = {};
                if (eggResponse.data.attributes.relationships?.variables?.data) {
                    eggResponse.data.attributes.relationships.variables.data.forEach(variable => {
                        const attr = variable.attributes;
                        environment[attr.env_variable] = attr.default_value || '';
                    });
                }
                break;
            } catch (err) {
                continue;
            }
        }

        console.log('Environment:', JSON.stringify(environment, null, 2));

        // STEP 3: CREATE SERVER
        console.log('\n=== STEP 3: Creating server ===');
        
        const serverPayload = {
            name: username,
            user: userIdPanel,
            egg: egg,
            docker_image: 'ghcr.io/parkervcp/yolks:nodejs_18',
            startup: 'if [[ -d .git ]] && [[ {{AUTO_UPDATE}} == "1" ]]; then git pull; fi; if [[ ! -z ${NODE_PACKAGES} ]]; then /usr/local/bin/npm install ${NODE_PACKAGES}; fi; if [[ ! -z ${UNNODE_PACKAGES} ]]; then /usr/local/bin/npm uninstall ${UNNODE_PACKAGES}; fi; if [ -f /home/container/package.json ]; then /usr/local/bin/npm install; fi;  if [[ ! -z ${CUSTOM_ENVIRONMENT_VARIABLES} ]]; then      vars=$(echo ${CUSTOM_ENVIRONMENT_VARIABLES} | tr ";" "\n");      for line in $vars;     do export $line;     done fi;  /usr/local/bin/${CMD_RUN};',
            environment: environment,
            limits: {
                memory: memory,
                swap: 0,
                disk: disk,
                io: 500,
                cpu: cpu
            },
            feature_limits: {
                databases: 5,
                backups: 5
            },
            deploy: {
                locations: [loc],
                dedicated_ip: false,
                port_range: []
            }
        };

        console.log('Server payload:', JSON.stringify(serverPayload, null, 2));

        const serverResponse = await axios.post(
            `${domain}/api/application/servers`,
            serverPayload,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${plta}`
                },
                timeout: 30000
            }
        );

        if (serverResponse.data.errors) {
            throw new Error('Server creation failed: ' + JSON.stringify(serverResponse.data.errors));
        }

        console.log('✅ Server created successfully!');
        console.log('Server ID:', serverResponse.data.attributes.id);

        // STEP 4: SEND MESSAGES
        const userMessage = `
🎉 *PANEL UNLI BERHASIL DIBUAT!*

📊 *Informasi Panel:*
👤 Username: \`${username}\`
📧 Email: \`${email}\`
🔐 Password: \`${password}\`

💾 *Spesifikasi:*
🧠 RAM: ${memory} MB
💿 Disk: ${disk} MB
⚡ CPU: ${cpu}%

🌐 *Link Panel:*
${domain}

_Simpan informasi ini dengan baik!_
        `.trim();

        await bot.sendMessage(userTelegram, userMessage, { parse_mode: 'Markdown' }).catch(err => {
            console.log('⚠️ Failed to send message to user:', err.message);
        });

        const adminMessage = `
✅ *PANEL UNLI BERHASIL DIBUAT*

📝 Detail:
• Username: ${username}
• User ID: ${userIdPanel}
• RAM: ${memory}MB
• Disk: ${disk}MB
• CPU: ${cpu}%
• Dikirim ke: ${userTelegram}

Dibuat oleh: ${msg.from.first_name || msg.from.username}
        `.trim();

        await bot.editMessageText(adminMessage, {
            chat_id: chatId,
            message_id: processingMsg.message_id,
            parse_mode: 'Markdown'
        });

    } catch (err) {
        console.error('\n❌ ERROR:', err);
        console.error('Response data:', err.response?.data);
        
        let errorMessage = '❌ Gagal membuat panel!\n\n';
        
        if (err.response) {
            const status = err.response.status;
            const data = err.response.data;
            
            errorMessage += `Status: ${status}\n\n`;
            
            if (data.errors) {
                const errors = Array.isArray(data.errors) ? data.errors : [data.errors];
                errorMessage += '📋 Errors:\n';
                errors.forEach(error => {
                    if (error.detail) {
                        errorMessage += `• ${error.detail}\n`;
                    } else if (error.code) {
                        errorMessage += `• Code: ${error.code}\n`;
                    } else {
                        errorMessage += `• ${JSON.stringify(error)}\n`;
                    }
                });
            } else if (data.message) {
                errorMessage += `Message: ${data.message}`;
            }
        } else {
            errorMessage += err.message;
        }

        // Auto cleanup
        if (userIdPanel) {
            errorMessage += '\n\n🔄 Menghapus user...';
            try {
                await axios.delete(
                    `${domain}/api/application/users/${userIdPanel}`,
                    {
                        headers: {
                            'Accept': 'application/json',
                            'Authorization': `Bearer ${plta}`
                        }
                    }
                );
                errorMessage += '\n✅ User berhasil dihapus';
            } catch (delErr) {
                errorMessage += '\n⚠️ Gagal hapus user, hapus manual!';
            }
        }

        await bot.editMessageText(errorMessage, {
            chat_id: chatId,
            message_id: processingMsg.message_id
        });
    }
});
//▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰//
//          CLOSE CREATE PANEL         //// 



