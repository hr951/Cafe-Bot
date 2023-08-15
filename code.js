const {Client, SlashCommandBuilder, Collection, REST, Routes, GatewayIntentBits,　Partials, Discord, ButtonBuilder, ButtonStyle, ActionRowBuilder, PermissionsBitField, MessageActionRow, MessageButton, InteractionCollector, EmbedBuilder} = require("discord.js");
const fs = require('node:fs');
const path = require('node:path');
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.MessageContent
  ],partials: [
    Partials.Message,
    Partials.Reaction,
    Partials.User
]});

//ここから記述
client.on('ready', () => {
  console.log("Bot準備完了！");
    setInterval(() => {
        client.user.setActivity({
          //name: `再起動しています。少々お待ちください。`
          //name: `メンテナンス中です。動作が不安定になる場合があります。ご了承ください。`
          name: `/help | Ping：${client.ws.ping}ms`
        })/*, //下のやつは旧memberCount(今は別のBotが動いてる)
          client.channels.cache.get(process.env.VOICE_USER).setName(`Member Count: ${client.guilds.cache.get(process.env.SERVER_ID).memberCount}`)*/
    }, 1000)
    
});

//自己紹介に👍つけるチャンネル
const channelId_intro = '1098599968182370394'

// 通知する時間の間隔（ミリ秒）
const IDLE_TIME = 240 * 60 * 1000; // 240分(4時間)

// チャンネルごとの最終メッセージの時刻を記録するマップ
const lastMessageTime = new Map();

client.on("messageCreate", message =>{
  const channelId_kaso = message.channel.id;
  if (message.content.match(/死ね|死んで｜殺/)){ //暴言検知
    if (message.author.bot) return;
    let dieid = `https://discord.com/channels/1091335874098233344/${message.channel.id}/${message.id}`
    client.users.cache.get('962670040795201557').send(`**[緊急]** __${message.author.username}__が**${message.cleanContent}**と発言しています。\n今すぐ確認してください。\n${dieid}`)
    message.guild.channels.cache.get('1094423574321836064').send(`${message.channel}で${message.author}が\n「**${message.cleanContent}**」\nと発言しました。\n確認してください。\n${dieid}`)
  } if (message.content === "過疎") { //過疎警察
    if (message.author.bot) return;
    //if (message.auther.id === "962670040795201557") {
    message.delete();
    message.channel.send("<@&1119925558575374427>\n過疎警察だ！話せ！")
  } if (message.channel.id === channelId_intro) { //自己紹介👍付ける
    if (message.author.bot) return;
  const emoji = '👍';
       message.react(emoji);
    } if (message.content.match(/死にたい|自殺/)) { //自殺願望検知
      if (message.author.bot) return;
      let deathid = `https://discord.com/channels/1091335874098233344/${message.channel.id}/${message.id}`
      client.users.cache.get('962670040795201557').send(`**[緊急]** __${message.author.username}__が**${message.cleanContent}**と発言しています。\n今すぐ確認してください。\n${deathid}`)
      message.guild.channels.cache.get('1094423574321836064').send(`${message.channel}で${message.author}が\n「**${message.cleanContent}**」\nと発言しました。\n確認してください。\n絶っ対にこの鯖から死者は出すなよ？\n${deathid}`)
    } /*if (message.mentions.roles.has(process.env.ROLE_ID)) { //一応Bump検知(もうすぐ移行する)
        var channelname = client.channels.cache.get(process.env.VOICE_CHANNEL_ID).name;
        var channelname2 = ++channelname;
        client.channels.cache.get(process.env.VOICE_CHANNEL_ID).setName(`${channelname2}`)
       client.channels.cache.get("1105754019961507853").setName(`Bump回数 : ${channelname2}`)
     }*/ if (channelId_kaso === "1094427445945442406"){ //過疎検知(4時間)
       if (message.author.bot) return;
      // 現在の時刻を取得
      const now = Date.now();
      // マップにチャンネルの最終メッセージ時刻があれば取得
      const lastTime = lastMessageTime.get(channelId_kaso);
      // 最終メッセージ時刻があって、かつ間隔よりも前なら通知
      if (lastTime && now - lastTime > IDLE_TIME) {
        message.channel.send(`<@&1119925558575374427>\nこのチャンネルは4時間以上発言がなかったよ...\n過疎だね☆`);
      }
      // マップにチャンネルの最終メッセージ時刻を更新
      lastMessageTime.set(channelId_kaso, now);
      } if (message.embeds.length > 0) { //embed検知(今後のBumpはこっちでいきたい) PS.Bumpは正しく動くがdissokuが動かない。embedのどこの文字を持ってくるか...
        //↑埋め込み検知
        // 埋め込みを取得
        const embed = message.embeds[0];
        // 埋め込みのタイトル、説明、フィールドの値を結合
        const embedText = [embed.title, embed.description, ...embed.fields.map(field => field.value)].join('\n');
        console.log(embedText)
        if (embedText.includes('DISBOARD: Discordサーバー掲示板')) {
          // コンソールログに記録
          client.channels.resolve('1126649244292481116').send(`[Bump]Bumpを検知しました！`)
          var channelname = client.channels.cache.get(process.env.VOICE_CHANNEL_ID).name;
          var channelname2 = ++channelname;
        client.channels.cache.get(process.env.VOICE_CHANNEL_ID).setName(`${channelname2}`)
       client.channels.cache.get("1105754019961507853").setName(`Bump回数 : ${channelname2}`)
        } if (embedText.includes('アップを検知しました。')) {
          // コンソールログに記録
          client.channels.resolve('1126649244292481116').send(`[dis速]dis速を検知しました！`)
          var channelname = client.channels.cache.get(process.env.VOICE_CHANNEL_ID).name;
          var channelname2 = ++channelname;
        client.channels.cache.get(process.env.VOICE_CHANNEL_ID).setName(`${channelname2}`)
       client.channels.cache.get("1105754019961507853").setName(`Bump回数 : ${channelname2}`)
        }
      }
})

    client.on("guildMemberAdd", member => {
        if (member.guild.id !== process.env.SERVER_ID);
      var embedAdd = new EmbedBuilder()
  .addFields(
    {
      name: "ユーザーが来店しました！",
      value: `**☕Gamer Cafeに${member.user} / ${member.user.tag}が来店しました！**\nhttps://discord.com/channels/1091335874098233344/1094423574321836063 を確認して認証してください。\n認証が完了したら https://discord.com/channels/1091335874098233344/1094427445945442406や\n　　　　　　　　 https://discord.com/channels/1091335874098233344/1098599968182370394 へどうぞ～！\nhttps://discord.com/channels/1091335874098233344/1100391722908909620 で必要なロールも取得してね！\nあと、この鯖は超過疎鯖なんで気軽に喋ってね！`
    })
  .setColor("#33ff00")
  .setFooter({
    text: "Made by 接客Bot",
  })
  .setTimestamp();
      member.guild.channels.cache.get(process.env.CHANNEL_ID).send(`<@&1103987123251585046>歓迎してあげてね♪`);
      member.guild.channels.cache.get(process.env.CHANNEL_ID).send({ embeds: [embedAdd] });
      member.guild.channels.cache.get('1094423574321836064').send(`${member.user.username} / ${member.id} が来店しました。\n荒らしですか？→「>>ban ID」`)
    });
        
    client.on("guildMemberRemove", member => {
        if (member.guild.id !== process.env.SERVER_ID);
      var embedRemove = new EmbedBuilder()
  .addFields({
      name: "ユーザーが退店しました...",
      value: `**☕Gamer Cafeから${member.user} / ${member.user.tag}が退店しました...**\n1人減るとさみしくなるね...`
    })
  .setColor("#ff0000")
  .setFooter({
    text: "Made by 接客Bot",
  })
  .setTimestamp();
        member.guild.channels.cache.get(process.env.CHANNEL_ID).send({ embeds: [embedRemove] });
      member.guild.channels.cache.get('1094423574321836064').send(`${member.user.username} / ${member.id} が退店しました。\n即抜けでしたか？→「>>ban ID]」`)
    });

client.on('messageReactionAdd', (reaction, user) => {  
  const react_message = reaction.message
  const react_member = react_message.guild.members.resolve(user)
  console.log(`${reaction.message.guild} で ${user.tag} が ${reaction.emoji.name} をリアクションしました`)
  if (reaction.message.id === '1138354909859811398') {
  if (reaction.emoji.name === '🔰') {
    react_member.roles.add('1103987123251585046')
  } if (reaction.emoji.name === '⏫') {
    react_member.roles.add('1100392209544658945')
  } if (reaction.emoji.name === '🚨') {
    react_member.roles.add('1119925558575374427')
  } if (reaction.emoji.name === '📢') {
    react_member.roles.add('1105465002363727952')
  }} if (reaction.message.id === '1138355042567585883') {
  if (reaction.emoji.name === '🇦') {
    react_member.roles.add('1109058167159136256')
  } if (reaction.emoji.name === '🇧') {
    react_member.roles.add('1109057744188739604')
  } if (reaction.emoji.name === '🇨') {
    react_member.roles.add('1109057666556375061')
  } if (reaction.emoji.name === '🇩') {
    react_member.roles.add('1109058554897371156')
  } if (reaction.emoji.name === '🇪') {
    react_member.roles.add('1109059438012289157')
  } if (reaction.emoji.name === '🇫') {
    react_member.roles.add('1109059133652606996')
  } if (reaction.emoji.name === '🇬') {
    react_member.roles.add('1109058504670597140')
  } if (reaction.emoji.name === '🇭') {
    react_member.roles.add('1109061114727251988')
  } if (reaction.emoji.name === '🇮') {
    react_member.roles.add('1109061032107835453')
  } if (reaction.emoji.name === '🇯') {
    react_member.roles.add('1109060249199058954')
  } if (reaction.emoji.name === '🇰') {
    react_member.roles.add('1109057947541184632')
  } if (reaction.emoji.name === '🇱') {
    react_member.roles.add('1109328356253651075')
  } if (reaction.emoji.name === '🇲') {
    react_member.roles.add('1113798279981961236')
  }}
})

client.on('messageReactionRemove', (reaction, user) => {  
  const react_message_remove = reaction.message
  const react_member_remove = react_message_remove.guild.members.resolve(user)
  console.log(`${reaction.message.guild} で ${user.tag} が ${reaction.emoji.name} をリアクションしました`)
  if (reaction.message.id === '1138354909859811398') {
  if (reaction.emoji.name === '🔰') {
    react_member_remove.roles.remove('1103987123251585046')
  } if (reaction.emoji.name === '⏫') {
    react_member_remove.roles.remove('1100392209544658945')
  } if (reaction.emoji.name === '🚨') {
    react_member_remove.roles.remove('1119925558575374427')
  } if (reaction.emoji.name === '📢') {
    react_member_remove.roles.remove('1105465002363727952')
  }} if (reaction.message.id === '1138355042567585883') {
  if (reaction.emoji.name === '🇦') {
    react_member_remove.roles.remove('1109058167159136256')
  } if (reaction.emoji.name === '🇧') {
    react_member_remove.roles.remove('1109057744188739604')
  } if (reaction.emoji.name === '🇨') {
    react_member_remove.roles.remove('1109057666556375061')
  } if (reaction.emoji.name === '🇩') {
    react_member_remove.roles.remove('1109058554897371156')
  } if (reaction.emoji.name === '🇪') {
    react_member_remove.roles.remove('1109059438012289157')
  } if (reaction.emoji.name === '🇫') {
    react_member_remove.roles.remove('1109059133652606996')
  } if (reaction.emoji.name === '🇬') {
    react_member_remove.roles.remove('1109058504670597140')
  } if (reaction.emoji.name === '🇭') {
    react_member_remove.roles.remove('1109061114727251988')
  } if (reaction.emoji.name === '🇮') {
    react_member_remove.roles.remove('1109061032107835453')
  } if (reaction.emoji.name === '🇯') {
    react_member_remove.roles.remove('1109060249199058954')
  } if (reaction.emoji.name === '🇰') {
    react_member_remove.roles.remove('1109057947541184632')
  } if (reaction.emoji.name === '🇱') {
    react_member_remove.roles.remove('1109328356253651075')
  } if (reaction.emoji.name === '🇲') {
    react_member_remove.roles.remove('1113798279981961236')
  }}
})

const BUTTON_ID_PREFIX = "role_"
//ボタンを出す※readyイベントが発生する度にボタンが送信されるので注意
async function ButtonCreate(ChannelId, RoleId){
	const channel = await client.channels.fetch(ChannelId)
	const Button = new ButtonBuilder()
		.setCustomId(`${BUTTON_ID_PREFIX}${RoleId}`)
		.setStyle(ButtonStyle.Primary)
		.setLabel("認証する")
		.setEmoji("☕");
	channel.send({
		components: [
			new ActionRowBuilder()
				.setComponents(Button)
		]
	})
}

//受信
client.on("interactionCreate", async interaction => {
	if (!interaction.isButton()) return
	if (!interaction.customId.startsWith(BUTTON_ID_PREFIX)) return
	const me = await interaction.guild.members.fetchMe()
	if (!me.permissions.has(PermissionsBitField.Flags.ManageRoles)){
		return interaction.reply({
			content: "botに［ロールの管理］の権限がありません。サーバーの管理者に問い合わせてください。",
			ephemeral: true
		})
	}
	const roleId = String(interaction.customId.slice(BUTTON_ID_PREFIX.length))
	const roles = await interaction.guild.roles.fetch()
	if (!roles.has(roleId)) {
		return interaction.reply({
 			content: "ロールが存在しません。サーバーの管理者に問い合わせてください。",
    		ephemeral: true
    	})
    }
	const role = roles.get(roleId)
	const member = await interaction.member.fetch()
	if (member.roles.cache.has(roleId)) {
		try {
			await member.roles.remove(role)
       client.channels.resolve('1126649244292481116').send(`**@${member.displayName}**から**@${role.name}**を剥奪しました。`)
			return interaction.reply({
				content: `${role}を剥奪しました。`,
				ephemeral: true
			})
		} catch (error) {
			console.error(error)
            client.channels.resolve('1126649244292481116').send(`**@${member.displayName}**から**@${role.name}**の剥奪に失敗しました。`)
     		return interaction.reply({
      			content: `${role}の剥奪に失敗しました。`,
      			ephemeral: true
       		})
		}
	}
	try {
		await member.roles.add(role)
    client.channels.resolve('1126649244292481116').send(`**@${member.displayName}**に**@${role.name}**を付与しました。`)
		return interaction.reply({
			content: `${role}を付与しました。`,
			ephemeral: true
		})
	} catch (error) {
		console.error(error)
        client.channels.resolve('1126649244292481116').send(`**@${member.displayName}**に**@${role.name}**の付与に失敗しました。`)
   		return interaction.reply({
   			content: `${role}の付与に失敗しました。`,
   			ephemeral: true
   		})
	}
})

/*client.on("messageCreate", message => {
	if (message.content === "接客Botはボタンを設置します")
	//ChannelIdとRoleIdには任意の値を入れること。
	//※ボタンが送信されたらこの部分は削除しても構いません。
  ButtonCreate("1094423574321836063", "1094438822948913152")
})*/

const embed = new EmbedBuilder()
  .setTitle("必要なロールを選択してください。")
  .addFields(
    {
      name: "🔰新規歓迎し隊",
      value: "新規さんが来店したときに通知します。",
      inline: true
    },
    {
      name: "⏫bumpし隊",
      value: "bumpやディス速をUPできるときに通知します。",
      inline: true
    },
    {
      name: "🚨過疎対策メンバー",
      value: "サーバーが過疎なときに通知します。",
      inline: true
    },
    {
     name: "📢接客Botお知らせ通知",
     value: "接客Botのお知らせを通知します。\n\n※__**[連携ロール](https://discord.com/channels/1091335874098233344/1098530365271982133)**__も取得していただけると幸いです。", 
      inline: true
    },
  )
  .setColor("#33ff00")
  .setFooter({
    text: "Made by 接客Bot",
  })
  .setTimestamp();

/*client.once("messageCreate", message=> {
if (message.author.bot) return;
  if (message.content === 'role_panel')
    //message.channel.send({embeds: [embed]})
    message.channel.send({embeds: [gamerole]})
} )

/*client.on("messageCreate", message=> {
  message.react('🔰')
  message.react('⏫')
  message.react('🚨')
  message.react('📢')})

client.on("messageCreate", message=> {
  message.react('🇦')
  message.react('🇧')
  message.react('🇨')
  message.react('🇩')
  message.react('🇪')
  message.react('🇫')
  message.react('🇬')
  message.react('🇭')
  message.react('🇮')
  message.react('🇯')
  message.react('🇰')
  message.react('🇱')
  message.react('🇲')
} )

/*async function ButtonCreate2(ChannelID2, RoleID2, RoleID3, RoleID4, RoleID5, RoleID6){
  const channel2 = await client.channels.fetch(ChannelID2)
  
const buttons = new ButtonBuilder()
                        .setCustomId(`${BUTTON_ID_PREFIX}${RoleID2}`)
                        .setEmoji('📢')
                        .setLabel('お知らせ通知')
                        .setDisabled(false)
                        .setStyle(ButtonStyle.Primary)
                    const buttons2 = new ButtonBuilder()
                        .setCustomId(`${BUTTON_ID_PREFIX}${RoleID3}`)
                        .setEmoji('🔰')
                        .setLabel('新規歓迎し隊')
                        .setDisabled(false)
                        .setStyle(ButtonStyle.Primary)
                    const buttons3= new ButtonBuilder()
                        .setCustomId(`${BUTTON_ID_PREFIX}${RoleID4}`)
                        .setEmoji('⏫')
                        .setLabel('bumpし隊')
                        .setDisabled(false)
                        .setStyle(ButtonStyle.Primary);
                    const buttons4= new ButtonBuilder()
                        .setCustomId(`${BUTTON_ID_PREFIX}${RoleID5}`)
                        .setEmoji('📢')
                        .setLabel('接客Botお知らせ通知')
                        .setDisabled(false)
                        .setStyle(ButtonStyle.Primary);
                   const buttons5= new ButtonBuilder()
                        .setCustomId(`${BUTTON_ID_PREFIX}${RoleID6}`)
                        .setEmoji('🚨')
                        .setLabel('過疎対策メンバー')
                        .setDisabled(false)
                        .setStyle(ButtonStyle.Primary);
                  channel2.send({
                     embeds: [embed] ,
        components: [
            new ActionRowBuilder()
                .setComponents(buttons, buttons4, buttons2, buttons3, buttons5)
        ]
    })
  }
                

client.once("messageCreate", message => {
	if (message.content === "接客Botさん。ボタンを設置してください。")
	//ChannelIdとRoleIdには任意の値を入れること。
	//※ボタンが送信されたらこの部分は削除しても構いません。
	ButtonCreate2("1100391722908909620", "1103827604248723696", "1103987123251585046", "1100392209544658945", "1105465002363727952", "1119925558575374427")
})*/

const gamerole = new EmbedBuilder()
  .setTitle("プレイしているゲームを選択してください。")
  .addFields(
    {
      name: ":regional_indicator_a:Minecraft",
      value: " ",
      inline: true
    },
    {
      name: ":regional_indicator_b:APEX",
      value: " ",
      inline: true
    },
    {
      name: ":regional_indicator_c:原神",
      value: " ",
      inline: true
    },
    {
      name: ":regional_indicator_d:VALORANT",
      value: " ",
      inline: true
    },
    {
      name: ":regional_indicator_e:MONSTER HUNTER",
      value: " ",
      inline: true
    },
    {
      name: ":regional_indicator_f:ARK",
      value: " ",
      inline: true
    },
    {
      name: ":regional_indicator_g:Rust",
      value: " ",
      inline: true
    },
    {
      name: ":regional_indicator_h:DRAGON QUEST",
      value: " ",
      inline: true
    },
    {
      name: ":regional_indicator_i:FINAL FANTASY",
      value: " ",
      inline: true
    },
    {
      name: ":regional_indicator_j:BIOHAZARD",
      value: " ",
      inline: true
    },
    {
      name: ":regional_indicator_k:Fortnite",
      value: " ",
      inline: true
    },
    {
      name: ":regional_indicator_l:ROBLOX",
      value: " ",
      inline: true
    },
    {
      name: ":regional_indicator_m:プロセカ",
      value: " ",
      inline: true
    },
  )
  .setColor("#00ff00")
  .setFooter({
    text: "Made by 接客Bot",
  })
  .setTimestamp();

/*async function ButtonCreate3(ChannelId3, RoleId6, RoleId7, RoleId8, RoleId9, RoleId10, RoleId16){
    const channel3 = await client.channels.fetch(ChannelId3)
    const gamerole1 = new ButtonBuilder()
        .setCustomId(`${BUTTON_ID_PREFIX}${RoleId6}`)
        .setStyle(ButtonStyle.Primary)
        .setLabel("Minecraft")
        .setEmoji("🌏");
  const gamerole2 = new ButtonBuilder()
        .setCustomId(`${BUTTON_ID_PREFIX}${RoleId7}`)
        .setStyle(ButtonStyle.Primary)
        .setLabel("APEX")
        .setEmoji("🔫");
  const gamerole3 = new ButtonBuilder()
        .setCustomId(`${BUTTON_ID_PREFIX}${RoleId8}`)
        .setStyle(ButtonStyle.Primary)
        .setLabel("原神")
        .setEmoji("⚔️");
  const gamerole4 = new ButtonBuilder()
        .setCustomId(`${BUTTON_ID_PREFIX}${RoleId9}`)
        .setStyle(ButtonStyle.Primary)
        .setLabel("VALORANT")
        .setEmoji("🔫");
  const gamerole5 = new ButtonBuilder()
        .setCustomId(`${BUTTON_ID_PREFIX}${RoleId10}`)
        .setStyle(ButtonStyle.Primary)
        .setLabel("MONSTER HUNTER")
        .setEmoji("⚔️");
  channel3.send({ embeds : [gamerole] ,
        components: [
            new ActionRowBuilder()
                .setComponents(gamerole1, gamerole2, gamerole3, gamerole4, gamerole5)
        ]
    })
}
  async function ButtonCreate4(ChannelId4, RoleId11, RoleId12, RoleId13, RoleId14, RoleId15, RoleId16){
    const channel4 = await client.channels.fetch(ChannelId4)
  const gamerole6 = new ButtonBuilder()
        .setCustomId(`${BUTTON_ID_PREFIX}${RoleId11}`)
        .setStyle(ButtonStyle.Primary)
        .setLabel("ARK")
        .setEmoji("🐉");
  const gamerole7 = new ButtonBuilder()
        .setCustomId(`${BUTTON_ID_PREFIX}${RoleId12}`)
        .setStyle(ButtonStyle.Primary)
        .setLabel("Rust")
        .setEmoji("🪓");
  const gamerole8 = new ButtonBuilder()
        .setCustomId(`${BUTTON_ID_PREFIX}${RoleId13}`)
        .setStyle(ButtonStyle.Primary)
        .setLabel("DRAGON QUEST")
        .setEmoji("⚔️");
  const gamerole9 = new ButtonBuilder()
        .setCustomId(`${BUTTON_ID_PREFIX}${RoleId14}`)
        .setStyle(ButtonStyle.Primary)
        .setLabel("FINAL FANTASY")
        .setEmoji("⚔️");
  const gamerole10 = new ButtonBuilder()
        .setCustomId(`${BUTTON_ID_PREFIX}${RoleId15}`)
        .setStyle(ButtonStyle.Primary)
        .setLabel("BIOHAZARD")
        .setEmoji("🧟‍♂️");
    channel4.send({
      components: [
        new ActionRowBuilder()
        .setComponents(gamerole6, gamerole7, gamerole8, gamerole9, gamerole10)
        ]
    })
  }
    async function ButtonCreate5(ChannelId5, RoleId16, RoleId17, RoleId18){
      const channel5 = await client.channels.fetch(ChannelId5)
  const gamerole11 = new ButtonBuilder()
        .setCustomId(`${BUTTON_ID_PREFIX}${RoleId16}`)
        .setStyle(ButtonStyle.Primary)
        .setLabel("Fortnite")
        .setEmoji("🔫");
  const gamerole12 = new ButtonBuilder()
        .setCustomId(`${BUTTON_ID_PREFIX}${RoleId17}`)
        .setStyle(ButtonStyle.Primary)
        .setLabel("Roblox")
        .setEmoji("🌏");
  const gamerole13 = new ButtonBuilder()
        .setCustomId(`${BUTTON_ID_PREFIX}${RoleId18}`)
        .setStyle(ButtonStyle.Primary)
        .setLabel("プロセカ")
        .setEmoji("🎵");
    channel5.send({
        components: [
            new ActionRowBuilder()
                .setComponents(gamerole11, gamerole12, gamerole13)
        ]
    })
}

client.once("messageCreate", message =>　{
if (message.content === "接客Botはゲームロールパネルを設置します。")
ButtonCreate3("1100391722908909620", "1109058167159136256", "1109057744188739604", "1109057666556375061", "1109058554897371156", "1109059438012289157")
ButtonCreate4("1100391722908909620", "1109059133652606996", "1109058504670597140", "1109061114727251988", "1109061032107835453", "1109060249199058954")
ButtonCreate5("1100391722908909620", "1109057947541184632", "1109328356253651075", "1113798279981961236")
})*/

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`${filePath} に必要な "data" か "execute" がありません。`);
	}
}

client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`${interaction.commandName} が見つかりません。`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: '休憩中だよ\n少し待ってからもう一度試してみてね', ephemeral: true });
	}
});

client.on('interactionCreate', interaction => {
  if (!interaction.isCommand()) return;
  console.log(`使用されたコマンド: ${interaction.commandName}`);
  const userName = interaction.user.username;
  console.log(`実行したユーザー: ${userName}`);
  client.channels.resolve('1126649244292481116').send(`${interaction.commandName}を${userName}が使用しました。`)
});

client.login(process.env.DISCORD_BOT_TOKEN);
