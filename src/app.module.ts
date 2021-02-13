import { Module } from '@nestjs/common';
import { GamesModule } from './games/games.module';
import { AppController } from './app.controller';

@Module({
  imports: [GamesModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
