const { SlashCommandBuilder } = require('discord.js');
const embed = require('../embeds/embeds');
const color = "#33FF00"

module.exports = {
    data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('コマンドのhelpを表示します。'),

    async execute(interaction) {
      if (!interaction.member.roles.cache.has('1094433631197474869')) {
        const thumbnail = interaction.client.user.displayAvatarURL();
        const description = "**/help**...今表示してるやつだよ\n**/ping**...BotのPingを表示するよ";
        await interaction.reply({embeds: [embed.Embed_help('使用可能なコマンド', thumbnail, description, color)]})
      }else{
            const thumbnail = interaction.client.user.displayAvatarURL();
            const description = "**/help**...今表示してるやつだよ\n**/bans**...サーバーからBANされた人を取得するよ\n**/ping**...BotのPingを表示するよ\n**/nomem**...メンバーロールを持っていない人を表示するよ";

		await interaction.reply({ embeds: [embed.Embed_help('使用可能なコマンド', thumbnail, description, "#33FF00")], allowedMentions: { repliedUser: false } })
	}
    },

}
