import { ConfigService } from '@nestjs/config'
import { ChatgptService } from '@/chatgpt/chatgpt.service'
import { Start, Update, Ctx, On, Message } from 'nestjs-telegraf'
import { Scenes, Telegraf } from 'telegraf'
import { lastValueFrom } from 'rxjs'

type Context = Scenes.SceneContext

@Update()
export class TelegramService extends Telegraf<Context> {
	constructor(
		private readonly configService: ConfigService,
		private readonly gpt: ChatgptService
	) {
		super(configService.get('TELEGRAM_API'))
	}
	@Start()
	onStart(@Ctx() ctx: Context) {
		ctx.replyWithHTML(`<b>Hello, ${ctx.from.username}</b>
This is chatbot with ChatGPT!
Type any phrase and you will get an answer!
        `)
	}

	@On('text')
	async onMessage(@Message('text') message: string, @Ctx() ctx: Context) {
		const text = await lastValueFrom(this.gpt.generateResponse(message))
		await ctx.replyWithMarkdown(text)
	}
}
