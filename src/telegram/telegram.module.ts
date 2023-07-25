import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TelegrafModule } from 'nestjs-telegraf'

import { TelegramService } from './telegram.service'
import { options } from './telegram-config.factory'

@Module({
	imports: [ConfigModule.forRoot({ isGlobal: true }), TelegrafModule.forRootAsync(options())],
	providers: [TelegramService]
})
export class TelegramModule {}
