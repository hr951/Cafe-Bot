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

client.on("ready", () => {
  console.log("Bot準備完了！");
});

//ここから

const keikoku = new EmbedBuilder()
  .setTitle("☕GamerCafeからの重要なお知らせ")
  .setDescription("Important notice from ☕GamerCafe")
.addFields({
  name: "認証してください。",
  value: "☕GamerCafeではユーザーにhttps://discord.com/channels/1091335874098233344/1094423574321836063 で認証をお願いしています。\nこのメッセージを送信後、24時間が経過しますと☕GamerCafeを退店していただく決まりとなっております。\nまた、このメッセージは☕GamerCafeで認証されていない方全員に自動で送信しています。\n質問等あれば` @hi-ro君 / 氷露#3859 `へDMしてください。",
},
          {
  name: "Please authenticate.",
  value: "☕GamerCafe asks users to authenticate at https://discord.com/channels/1091335874098233344/1094423574321836063 .\nIf 24 hours have passed since you sent this message, you will be removed from the ☕GamerCafe.\nAlso, this message is automatically sent to everyone who has not been authenticated by ☕GamerCafe.\nIf you have any questions, please DM ` @hi-ro君 / 氷露#3859 `.",
})
  .setColor("#33ff00")
  .setFooter({
    text: "Made by 接客Bot",
  })
  .setTimestamp();

client.once("messageCreate", message =>{
  if (message.author.bot) return;
  if (message.content === "一斉に警告メッセージを配信してください")
  {
    /*client.users.cache.get('997404010929725440').send({embeds : [keikoku]})
    client.users.cache.get('1104934427647283340').send({embeds : [keikoku]})
    client.users.cache.get('952565271250501713').send({embeds : [keikoku]})
    client.users.cache.get('650391624442183688').send({embeds : [keikoku]})*/
    client.users.cache.get('962670040795201557').send({embeds : [keikoku]})
    message.channel.send({embeds : [keikoku]})
  }
})


/*client.on("messageCreate", message =>{
  var textkon = ["こんにちは","こんちゃ"]
  var textkontya = textkon[Math.floor(Math.random() * textkon.length)]
  if (message.author.bot) return;
  if (message.content === "こんにちは")
  {
    message.channel.send(textkontya)
  }
})

client.on("messageCreate", message =>{
  var text_yoro = ["よろしく！","( ｀・∀・´)ﾉﾖﾛｼｸ!"]
  var textyoro = text_yoro[Math.floor(Math.random() * text_yoro.length)]
  if (message.author.bot) return;
  if (message.content.match(/よろしく|よろ/))
  {
    message.channel.send(textyoro)
  }
})

client.on("messageCreate", message =>{
  if (message.author.bot) return;
  if (message.content.match(/idk|IDK|Idk/))
  {
    message.channel.send("IDKとは「I don't know.」の略でわからないってことだよ！")
  }
})*/

client.on("messageCreate", message =>{
  if (message.author.bot) return;
  if (message.content.match(/死ね|死んで｜殺/))
  {
    let dieid = `https://discord.com/channels/1091335874098233344/${message.channel.id}/${message.id}`
    message.guild.channels.cache.get('1094423574321836064').send(`${message.channel}で${message.author}が\n「**${message.cleanContent}**」\nと発言しました。\n確認してください。\n${dieid}`)
  }
})

/*client.on("messageCreate", message =>{
  if (message.author.bot) return;
  if (message.content.match(/うるさい|黙れ|しゃべんな/))
  {
    message.channel.send("(´・ω・｀)ｼｮﾎﾞーﾝ")
    message.channel.send("そんなこと言ったら僕電源切っちゃうよ？いいの？")
  }
})

client.on("messageCreate", message =>{
  if (message.author.bot) return;
  if (message.content.match(/疲れた|つかれた/))
  {
    message.channel.send("無理㌣ヶ(ｏﾟДﾟ)ﾉ(*ﾉωﾉ)")
  }
})

client.on("messageCreate", message =>{
  if (message.author.bot) return;
  if (message.content === "草")
  { message.delete();
    message.channel.send("<:kusa:1102133202090459148>")
  }
})

client.on("messageCreate", message =>{
  if (message.author.bot) return;
  if (message.content === "わかってる")
  {
    message.channel.send({files: ['https://i1.wp.com/neetola.com/wp-content/uploads/2023/04/FrOs9-HakAEf7V1.jpeg']})
  }
})*/

const channelId = '1098599968182370394'

// メッセージが送信された時に実行される処理
client.on('messageCreate', message => {
  // Bot自身が送信したメッセージの場合は終了
  if (message.author.bot) return;
  
  // メッセージが送信されたチャンネルが指定されたチャンネルでない場合は終了
  if (message.channel.id !== channelId) return;

  // リアクションを追加する絵文字を指定
  const emoji = '👍';
       message.react(emoji);
});

client.on("messageCreate", message =>{
  if (message.author.bot) return;
  if (message.content.match(/死にたい|自殺/))
  {
    let deathid = `https://discord.com/channels/1091335874098233344/${message.channel.id}/${message.id}`
    message.channel.send("大丈夫？\n<@&1094433631197474869>は話聞いてくれるよ？\n絶っ対に早まらないでね？")
    client.users.cache.get('962670040795201557').send(`${message.author.username}が${message.cleanContent}って発言してるよ？\n大丈夫？`)
    message.guild.channels.cache.get('1094423574321836064').send(`${message.channel}で${message.author}が\n「**${message.cleanContent}**」\nと発言しました。\n確認してください。\n絶っ対にこの鯖から死者は出すなよ？\n${deathid}`)
  }
})
    
    client.on('ready', () => {
        setInterval(() => {
            client.user.setActivity({
                name: `/help | Ping : ${client.ws.ping}ms`
            })/*,
              client.channels.cache.get(process.env.VOICE_USER).setName(`Member Count: ${client.guilds.cache.get(process.env.SERVER_ID).memberCount}`)*/
        }, 1000)
    });

    client.on("guildMemberAdd", member => {
        if (member.guild.id !== process.env.SERVER_ID);
      
      var embedAdd = new EmbedBuilder()
  .addFields(
    {
      name: "ユーザーが来店しました！",
      value: `**${member.guild.name}に${member.user}が来店しました！**\nhttps://discord.com/channels/1091335874098233344/1094423574321836063 を確認して認証してください。\n認証が完了したら https://discord.com/channels/1091335874098233344/1094427445945442406や\n　　　　　　　　 https://discord.com/channels/1091335874098233344/1098599968182370394 へどうぞ～！\nhttps://discord.com/channels/1091335874098233344/1100391722908909620 で必要なロールも取得してね！`
    }
  )
  .setColor("#33ff00")
  .setFooter({
    text: "Made by 接客Bot",
  })
  .setTimestamp();
      
      member.guild.channels.cache.get(process.env.CHANNEL_ID).send(`<@&1103987123251585046>歓迎してあげてね♪`);
      member.guild.channels.cache.get(process.env.CHANNEL_ID).send({ embeds: [embedAdd] });
       client.users.cache.get('962670040795201557').send(`${member.user.displayName}が来店しました。`)
    });
        
    client.on("guildMemberRemove", member => {
        if (member.guild.id !== process.env.SERVER_ID);
      
      var embedRemove = new EmbedBuilder()
  .addFields(
    {
      name: "ユーザーが退店しました...",
      value: `**${member.guild.name}から${member.user}が退店しました...**\n1人減るとさみしくなるね...`
    }
  )
  .setColor("#ff0000")
  .setFooter({
    text: "Made by 接客Bot",
  })
  .setTimestamp();
      
        member.guild.channels.cache.get(process.env.CHANNEL_ID).send({ embeds: [embedRemove] });
      client.users.cache.get('962670040795201557').send(`${member.user.displayName}が退店しました。\n即抜けではないですか？`)
    });

client.on('messageCreate', message => {
        if (message.mentions.roles.has(process.env.ROLE_ID)) {
           var channelname = client.channels.cache.get(process.env.VOICE_CHANNEL_ID).name;
           var channelname2 = ++channelname;
           client.channels.cache.get(process.env.VOICE_CHANNEL_ID).setName(`${channelname2}`)
          client.channels.cache.get("1105754019961507853").setName(`Bump回数 : ${channelname2}`)
        }
    });

/*client.on('messageCreate', message => {
  if (message.author.bot) return;
  const file = message.attachments.first()

  if (!file) return // 添付ファイルがなかったらスルー
  if (!file.height && !file.width) return // 画像じゃなかったらスルー

  return message.channel.send(
        file.url
    )
  });*/

  client.on("messageCreate", message =>{
    if (message.author.bot) return;
    
  const week = ['日', '月', '火', '水', '木', '金', '土']
  var date = new Date(Date.now() + ((new Date().getTimezoneOffset() + (9 * 60)) * 60 * 1000));
  var day = date.getDay()
  
    if (message.content.match("おはよう|おはよ|はよー|おっは"))
    {
      message.channel.send(`おはよ！\n今日は` + week[day] + '曜日だよ！\n忘れちゃダメだよ！')
      }
    });

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
       client.users.cache.get('962670040795201557').send(`**@${member.displayName}**から**@${role.name}**を剥奪しました。`)
			return interaction.reply({
				content: `${role}を剥奪しました。`,
				ephemeral: true
			})
		} catch (error) {
			console.error(error)
     		return interaction.reply({
      			content: `${role}の剥奪に失敗しました。`,
      			ephemeral: true
       		})
		}
	}
	try {
		await member.roles.add(role)
    client.users.cache.get('962670040795201557').send(`**@${member.displayName}**に**@${role.name}**を付与しました。`)
		return interaction.reply({
			content: `${role}を付与しました。`,
			ephemeral: true
		})
	} catch (error) {
		console.error(error)
   		return interaction.reply({
   			content: `${role}の付与に失敗しました。`,
   			ephemeral: true
   		})
	}
})
/*
client.on("messageCreate", message => {
	if (message.content === "接客Botはボタンを設置します")
	//ChannelIdとRoleIdには任意の値を入れること。
	//※ボタンが送信されたらこの部分は削除しても構いません。
  ButtonCreate("1094423574321836063", "1094438822948913152")
})*/

const embed = new EmbedBuilder()
  .setTitle("ロールを付与します。")
  .setDescription("必要なロールを選択してください。")
  .addFields(
    {
      name: "📢お知らせ通知",
      value: "お知らせを通知します。",
    },
    {
      name: "📢接客Botお知らせ通知",
      value: "接客Botのお知らせを通知します。",
      },
    {
      name: "🔰新規歓迎し隊",
      value: "新規さんが来店したときに通知します。",
    },
    {
      name: "⏫bumpし隊",
      value: "bumpやディス速をUPできるときに通知します。\n\n※「インタラクションに失敗しました」と表示されたときはもう一度ボタンを押してください。\n※__**[連携ロール](https://discord.com/channels/1091335874098233344/1098530365271982133)**__も取得していただけると幸いです。",
    },
  )
  .setColor("#33ff00")
  .setFooter({
    text: "Made by 接客Bot",
  })
  .setTimestamp();

async function ButtonCreate2(ChannelID2, RoleID2, RoleID3, RoleID4, RoleID5){
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
                  channel2.send({
                     embeds: [embed] ,
        components: [
            new ActionRowBuilder()
                .setComponents(buttons, buttons4, buttons2, buttons3)
        ]
    })
  }
                
/*
client.on("messageCreate", message => {
	if (message.content === "接客Botさん。ボタンを設置してください。")
	//ChannelIdとRoleIdには任意の値を入れること。
	//※ボタンが送信されたらこの部分は削除しても構いません。
	ButtonCreate2("1100391722908909620", "1103827604248723696", "1103987123251585046", "1100392209544658945", "1105465002363727952")
})*/

const gamerole = new EmbedBuilder()
  .setTitle("プレイしているゲームを選択してください。")
  .addFields(
    {
      name: "🌏Minecraft",
      value: "マインクラフトに関する通知を受け取れます。",
    },
    {
      name: "🔫APEX",
      value: "APEXに関する通知を受け取れます。",
    },
    {
      name: "⚔️原神",
      value: "原神に関する通知を受け取れます。",
    },
    {
      name: "🔫VALORANT",
      value: "VALORANTに関する通知を受け取れます。",
    },
    {
      name: "⚔️MONSTER HUNTER",
      value: "モンスターハンターに関する通知を受け取れます。",
    },
    {
      name: "🐉ARK",
      value: "ARKに関する通知を受け取れます。",
    },
    {
      name: "🪓Rust",
      value: "Rustに関する通知を受け取れます。",
    },
    {
      name: "⚔️DRAGON QUEST",
      value: "ドラゴンクエストに関する通知を受け取れます。",
    },
    {
      name: "⚔️FINAL FANTASY",
      value: "ファイナルファンタジーに関する通知を受け取れます。",
    },
    {
      name: "🧟‍♂️BIOHAZARD",
      value: "バイオハザードに関する通知を受け取れます。",
    },
    {
      name: "🔫Fortnite",
      value: "フォートナイトに関する通知を受け取れます。",
    },
    {
      name: "🌏ROBLOX",
      value: "Robloxに関する通知を受け取れます。\n\n※「インタラクションに失敗しました」と表示されたときはもう一度ボタンを押してください。",
    },
  )
  .setColor("#00ff00")
  .setFooter({
    text: "Made by 接客Bot",
  })
  .setTimestamp();

async function ButtonCreate3(ChannelId3, RoleId6, RoleId7, RoleId8, RoleId9, RoleId10, RoleId16){
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
    async function ButtonCreate5(ChannelId5, RoleId16, RoleId17){
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
    channel5.send({
        components: [
            new ActionRowBuilder()
                .setComponents(gamerole11, gamerole12)
        ]
    })
}

/*client.once("messageCreate", message =>　{
if (message.content === "接客Botはゲームロールパネルを設置します。")
ButtonCreate3("1100391722908909620", "1109058167159136256",　"1109057744188739604", "1109057666556375061", "1109058554897371156", "1109059438012289157")
ButtonCreate4("1100391722908909620", "1109059133652606996", "1109058504670597140", "1109061114727251988", "1109061032107835453", "1109060249199058954")
ButtonCreate5("1100391722908909620", "1109057947541184632", "1109328356253651075")
})*/

//ここまで

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
		await interaction.reply({ content: 'エラーが発生しました。', ephemeral: true });
	}
});

client.login(process.env.DISCORD_BOT_TOKEN);
