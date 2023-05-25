const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const embed = require('../embeds/embeds');
const color = "#FF0000"
const title = "ロールを一つも持っていないユーザーの一覧"
const command = new SlashCommandBuilder()
  .setName('nomem')
  .setDescription('役職を持っていないメンバーを表示します。')

//修正済
module.exports = {
    data: command,
    async execute(interaction) {
      if (!interaction.member.roles.cache.has('1094433631197474869')) {
        const thumbnail = interaction.client.user.displayAvatarURL();
        await interaction.reply({embeds: [embed.Embed_help("Error", thumbnail, "あなたにはこのコマンドを実行する権限がありません。", color)]})
      }else{
      const thumbnail = interaction.client.user.displayAvatarURL();
        // サーバーからメンバーの一覧を取得
        const members = await interaction.guild.members.fetch();

        // ロールを一つも持っていないユーザーを検索
        const unassignedMembers = members.filter((member) => member.roles.cache.size === 1);

        // ユーザーが見つからない場合、メッセージを送信
        if (unassignedMembers.size === 0) {
            const description = "ロールを一つも持っていないユーザーはいません。"
            await interaction.reply({embeds: [embed.Embed_help(title, thumbnail, description, color)]});
            return;
        }

        // ユーザーが見つかった場合、メッセージを送信
        const unassignedMemberNames = unassignedMembers.map((member) => member.user.tag);
      const description = `${unassignedMemberNames.join('\n')}`;
        await interaction.reply({embeds: [embed.Embed_help(title, thumbnail, description, color)]});
      }
    },
};
