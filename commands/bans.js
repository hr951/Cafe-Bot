const { SlashCommandBuilder } = require('discord.js');
const embed = require('../embeds/embeds')
const color = "#FF0000"

module.exports = {
	data: new SlashCommandBuilder()
		.setName('bans')
		.setDescription('サーバーのBAN者を表示します'),
	async execute(interaction) {
      if (!interaction.member.roles.cache.has('1094433631197474869')) {
        const thumbnail = interaction.client.user.displayAvatarURL();
        await interaction.reply({embeds: [embed.Embed_help("Error", thumbnail, "あなたにはこのコマンドを実行する権限がありません。", color)]})
      }else{
        const bans = await interaction.guild.bans.fetch()
        const banmember = bans.map(ban => ban.user.tag).join('\n') || 'none'
        const thumbnail = interaction.client.user.displayAvatarURL();
		await interaction.reply({embeds : [embed.Embed_help('BANされたユーザー', thumbnail, banmember, color)]})
      }
	},
};
