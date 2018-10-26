import { IBotConfig, ILogger, IWebhookConfig } from "./api";
import { QuestBot } from "./bot/QuestBot";
import { DiscordWebhook } from "./webhooks/DiscordWebhook";

const logger: ILogger = console;

export function runBot() {
  let cfg = require("./../bot.json") as IBotConfig;
  try {
    const cfgProd = require("./../bot.prod.json") as IBotConfig;
    cfg = { ...cfg, ...cfgProd };
  } catch {
    logger.info("Create a 'bot.prod.json' file to use actual settings for the bot.");
  }
  const bot = new QuestBot(cfg, logger);
  bot.start();
}

export function sendHook() {
  let cfg = require("./../webhook.json") as IWebhookConfig;
  try {
    const cfgProd = require("./../webhook.prod.json") as IWebhookConfig;
    cfg = { ...cfg, ...cfgProd };
  } catch {
    logger.info("Create a 'webhook.prod.json' file to use actual settings for the bot.");
  }
  const hook = new DiscordWebhook(cfg, logger);

  hook.send("", {
          embeds: [{
            description: "The new magazine issue is out now!",
            image: {
              // tslint:disable-next-line:max-line-length
              url: "https://clanquest.org/wiki/images/thumb/7/78/October_2018_001_%28Cover%29.png/463px-October_2018_001_%28Cover%29.png",
            },
            title: "Questholic October 2018",
            url: "https://clanquest.org/wiki/Questaholic_-_October_2018",
          }],
        })
      .then(logger.info)
      .catch(logger.error);
}
