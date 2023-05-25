const Discord = require('discord.js');
const ENV = process.env;

const github = 'https://github.com/hr951/Music-Bot';
const bot_version = "1.3.2"

const bot_name = "接客Bot";
const color = "#33FF00";


module.exports = {
    Embed_dashboard: function (status, music_title, music_url, music_thumbnail, music_description) {
        const Embed_dashboard = new Discord.EmbedBuilder()
            .setColor(color)
            .setTitle(music_title)
            .setURL(music_url)
            .setThumbnail(music_thumbnail)
            .addFields({ name: status, value: music_description })
            .setTimestamp()
        return Embed_dashboard;
    },

    Embed_add: function (status, music_title, music_url, music_thumbnail, music_author, music_length) {
        const Embed_add = new Discord.EmbedBuilder()
            .setColor(color)
            .setTitle(music_title)
            .setURL(music_url)
            .setThumbnail(music_thumbnail)
            .addFields({ name: status, value: `アーティスト : **${music_author}**\n長さ **${music_length}**`, inline: true })
            .setTimestamp()
        return Embed_add;
    },

    Embed_queue: function (status, nowplay, queueMsg, loopStatus) {
        const Embed_queue = new Discord.EmbedBuilder()
            .setColor(color)
            .setTitle(status)
            .addFields({ name: nowplay, value: queueMsg })
            .setTimestamp()
            .setFooter({ text: `ループ: ${loopStatus}` });
        return Embed_queue;
    },

    Embed_remove: function (status, music_title) {
        const Embed_remove = new Discord.EmbedBuilder()
            .setColor(color)
            .setTitle(status)
            .setDescription(`${music_title}`)
            .setTimestamp()
        return Embed_remove;
    },

    Embed_save: function (music_title, music_url, music_thumbnail, description) {
        const Embed_queue = new Discord.EmbedBuilder()
            .setColor(color)
            .setTitle(music_title)
            .setURL(music_url)
            .setThumbnail(music_thumbnail)
            .setDescription(description)
            .setTimestamp()
        return Embed_queue;
    },

    Embed_search: function (music_title, description) {
        const Embed_cantFindSong = new Discord.EmbedBuilder()
            .setColor(color)
            .setTitle(music_title)
            .setDescription(description)
            .setTimestamp()
        return Embed_cantFindSong;
    },

    Embed_help: function (help_title, help_thumbnail, description, color1) {
        const Embed_help = new Discord.EmbedBuilder()
            .setColor(color1)
            .setTitle(help_title)
            .setThumbnail(help_thumbnail)
            .setDescription(description)
            .setTimestamp()
        return Embed_help;
    },

    Embed_help2: function (command, description) {
        const Embed_help2 = new Discord.EmbedBuilder()
            .setColor(color)
            .setTitle(`Command **${command}**`, '')
            .setDescription(description)
        return Embed_help2;
    },

    Embed_status: function (uptime, os, node_v, djs_v, cpu, cpu_usage, ram, ping) {
        const Embed_status = new Discord.EmbedBuilder()
            .setColor(color)
            .setTitle(`${bot_name} v${bot_version}`)
            .setURL(github)
            .addFields(
                { name: `⚙️ システム`, value: `OS : **${os}**\nNode.js : **${node_v}**\nDiscord.js : **${djs_v}**\nCPU : **${cpu}**\n━━━━━━━━━━━━━━━━━━━━━━`, inline: false },
                { name: `📊 使用スペック`, value: `CPU : **${cpu_usage}**\nメモリ : **${ram}**\n稼働時間 : **${uptime}**\nPING : **${ping}ms**\n━━━━━━━━━━━━━━━━━━━━━━`, inline: false }
            )
            .setTimestamp()
        return Embed_status;
    },

    Embed_server: function (serverlist) {
        const Embed_server = new Discord.EmbedBuilder()
            .setColor(color)
            .setTitle(`**${bot_name}** が導入されているサーバー`, '')
            .setDescription(serverlist)
        return Embed_server;
    },

    Embed_ping: function (ping1, ping2) {
        const Embed_ping = new Discord.EmbedBuilder()
            .setColor(color)
            .setDescription(`片道のPing : **${ping1}**ms\n往復のPing : **${ping2}**ms`)
        return Embed_ping;
    },

    Embed_connect: function () {
        const Embed_connect = new Discord.EmbedBuilder()
            .setColor(color)
            .setDescription('ボイスチャンネルに接続しました')
        return Embed_connect;
    },

    Embed_disconnect: function () {
        const Embed_disconnect = new Discord.EmbedBuilder()
            .setColor(color)
            .setDescription('再生が終了しました')
        return Embed_disconnect;
    }
}
