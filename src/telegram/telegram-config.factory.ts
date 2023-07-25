import { TelegrafModuleAsyncOptions, TelegrafModuleOptions } from 'nestjs-telegraf'
import { ConfigService } from '@nestjs/config'

const telegrafModuleOptions = (config: ConfigService): TelegrafModuleOptions => ({
	token: config.get('TELEGRAM_API_KEY')
})

export const options = (): TelegrafModuleAsyncOptions => ({
	inject: [ConfigService],
	useFactory: (config: ConfigService) => telegrafModuleOptions(config)
})
