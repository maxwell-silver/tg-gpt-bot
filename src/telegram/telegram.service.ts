import { Ctx, Message, On, Start, Update } from 'nestjs-telegraf'
import { Scenes, Telegraf } from 'telegraf'

type Context = Scenes.SceneContext

@Update()
export class TelegramService extends Telegraf<Context> {
	@Start()
	async onStart(@Ctx() ctx: Context) {
		await ctx.replyWithHTML(`<b>Hello, ${ctx.from.username}.</b>
This is chatbot with ChatGPT!
Enter any phrase and you will get answer!
		`)
	}

	@On('text')
	async onMessage(@Message('text') message: string, @Ctx() ctx: Context) {
		await ctx.replyWithHTML(`<i>${message}</i>`)
	}
}
