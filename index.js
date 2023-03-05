const { Client, MessageEmbed, GatewayIntentBits } = require('discord.js','discord-rpc');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
var requests = require('requests');
let MyMessage = null
let index
let response
let serverInfo

function loop() {
  setTimeout(async () => {
    requests(`https://list.hogwarp.com/list`, {})
    .on('data', async (chunk) => {
      index = null;
      response = JSON.parse(chunk);
      response = response['servers']

      for (let pas = 0;response[pas]!= undefined;pas++){

        if (response[pas]['ip'] == '198.251.88.195') {
          index = pas;
          break;

        }
      }

      const channelID = '1079483523779535000'; // Remplacez "votre_ID_de_canal" par l'ID du canal que vous voulez utiliser
      let channel = client.channels.cache.get(channelID);

      if (index == undefined){
        client.user.setPresence({activities: [{ name: `Serveur hors ligne !`}]});
        MyMessage = channel
        MyMessage.bulkDelete(100);
        MyMessage = await channel.send({
        components: [
          {
            type: 1,
            components: [
              {
                style: 5,
                label: `Site Web`,
                url : `http://31.220.72.64/`,
                disabled: false,
                emoji: {
                  id: null,
                  name: `📌`
                },
                "type": 2
              }
            ]
          }
        ],
        embeds: [{
          type: "rich",
          title: `Des problèmes sont survenus`,
          description: `Serveur indisponible pour le moment, veuillez contacter un membre de l'équipe.`,
          color: 0x290097,
          timestamp: new Date(), 
          fields: [
            {
              name: `\> \*\*:red_circle: Statut :\*\*`,
              value: `\*\*\`\`\` Hors ligne \`\`\`\*\*`,
              inline: true
            },
            {
              name: `\> \*\*:mage: Joueurs :\*\*`,
              value: `\*\*\`\`\` 0/∞ \`\`\`\*\*`,
              inline: true
            },
            {
              name: `\> \*\*:electric_plug: IP :\*\*`,
              value: `\*\*\`\`\`              31.220.72.64:117778             \`\`\`\*\*`,
            },
            {
              name: `\> \*\*:satellite: Ping :\*\* `,
              value: `\*\*\`\`\` Indisponible \`\`\`\*\*`,
              inline: true
            },
            {
              name: `\> \*\*:label: Tags :\*\*`,
              value: `\*\*\`\`\` Indisponible \`\`\`\*\*`,
              inline: true
            },
          ],//
          image: {
            url: `https://media.discordapp.net/attachments/933102548888469584/933157190192226355/hogwats-legacy-screenshot-17-09-2020-1-min-scaled.png`,
            height: 0,
            width: 0
          },
          footer: {
            text: `By Jb • Updated every minute`
          }
        }]})
        return
      }

      //console.table(response[index]);
      if (channel) {
        serverInfo = response[index];
        const playerCount = serverInfo.player_count;
        const activities = [
          'Bon jeu sur HogwartsRP !',
          `En ligne ${playerCount} joueur${playerCount === 1 ? '' : 's'} !`
        ];
        setInterval(() => {
          const status = activities[Math.floor(Math.random() * activities.length)];
          client.user.setPresence({activities: [{ name: `${status}`}]});
        }, 10000);

          if (MyMessage == undefined) {
              MyMessage = channel
              MyMessage.bulkDelete(100);
              MyMessage = await channel.send({
                components: [
                  {
                    type: 1,
                    components: [
                      {
                        style: 5,
                        label: `Site Web`,
                        url : `http://31.220.72.64/`,
                        disabled: false,
                        emoji: {
                          id: null,
                          name: `📌`
                        },
                        "type": 2
                      }
                    ]
                  }
                ],
              embeds: [{
                type: "rich",
                title: serverInfo.name,
                description: serverInfo.desc,
                color: 0x290097,
                timestamp: new Date(), 
                fields: [
                  {
                    name: `\> \*\*:green_circle: Statut :\*\*`,
                    value: `\*\*\`\`\` En ligne \`\`\`\*\*`,
                    inline: true
                  },
                  {
                    name: `\> \*\*:mage: Joueurs :\*\*`,
                    value: `\*\*\`\`\` ${serverInfo.player_count} / ${serverInfo.max_player_count} \`\`\`\*\*`,
                    inline: true
                  },
                  {
                    name: `\> \*\*:electric_plug: IP :\*\*`,
                    value: `\*\*\`\`\`         ${serverInfo.ip}:${serverInfo.port}        \`\`\`\*\*`,
                  },
                  {
                    name: `\> \*\*:satellite: Ping :\*\* `,
                    value: `\*\*\`\`\` ${serverInfo.tick} \`\`\`\*\*`,
                    inline: true
                  },
                  {
                    name: `\> \*\*:label: Tags :\*\*`,
                    value: `\*\*\`\`\` ${serverInfo.tags} \`\`\`\*\*`,
                    inline: true
                  },
                ],//
                image: {
                  url: `https://media.discordapp.net/attachments/933102548888469584/933157139642466344/hogwats-legacy-screenshot-17-09-2020-5-min-889x500.png`,
                  height: 0,
                  width: 0
                },
                footer: {
                  text: `By Jb • Updated every minute`
                },
                thumbnail: {
                  url: `${serverInfo.icon_url}`,
                  proxy_url: ``,
                  height: 0,
                   width: 0
                }
              }]
            });
          }
          else
          {
            await MyMessage.edit({
            components: [
              {
                type: 1,
                components: [
                  {
                    style: 5,
                    label: `Site Web`,
                    url : `http://31.220.72.64/`,
                    disabled: false,
                    emoji: {
                      id: null,
                      name: `📌`
                    },
                    "type": 2
                  }
                ]
              }
            ],
            embeds: [{
              type: "rich",
              title: serverInfo.name,
              description: serverInfo.desc,
              color: 0x290097,
              timestamp: new Date(),
              fields: [
                {
                  name: `\> \*\*:green_circle: Statut :\*\*`,
                  value: `\*\*\`\`\` En ligne \`\`\`\*\*`,
                  inline: true
                },
                {
                  name: `\> \*\*:mage: Joueurs :\*\*`,
                  value: `\*\*\`\`\` ${serverInfo.player_count} / ${serverInfo.max_player_count} \`\`\`\*\*`,
                  inline: true
                },
                {
                  name: `\> \*\*:electric_plug: IP :\*\*`,
                  value: `\*\*\`\`\`         ${serverInfo.ip}:${serverInfo.port}        \`\`\`\*\*`,
                },
                {
                  name: `\> \*\*:satellite: Ping :\*\* `,
                  value: `\*\*\`\`\` ${serverInfo.tick} \`\`\`\*\*`,
                  inline: true
                },
                {
                  name: `\> \*\*:label: Tags :\*\*`,
                  value: `\*\*\`\`\` ${serverInfo.tags} \`\`\`\*\*`,
                  inline: true
                },
              ],
              image: {
                url: `https://media.discordapp.net/attachments/933102548888469584/933157139642466344/hogwats-legacy-screenshot-17-09-2020-5-min-889x500.png`,
                height: 0,
                widtH: 0
              },
              footer: {
                text: `By Jb • Updated every minute`
              },
              thumbnail: {
                url: `${serverInfo.icon_url}`,
                proxy_url: ``,
                height: 0,
                width: 0
              }
            }]
          });
        }
      } 
      else {
        console.log(`Le canal ${channelID} est introuvable`);
      }
    })
    .on('end', function (err) {
      if (err) return console.log('connection closed due to errors', err);
    });
    loop()
  }, 60000); //60000 = 60000ms = 60s
};

client.on('ready', async () => {
  console.log(`Logged in as ${client.user.tag}!`);
  console.log(`Logged on ${client.guilds.cache.size} server!`);
  loop();
});

client.login('MTA3OTQ4MjE5Mzg1MzgyNTA1NQ.GxW63Z.v3xMO0ITKnhF1cC96g0M7RvDdPVVBoZ_YZwgtM');