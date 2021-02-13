import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { Game } from './entities/games.entity';
import { GamesService } from './games.service';

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Get()
  getAll(): Game[] {
    return this.gamesService.getAll();
  }

  // @Get('search')
  // search(@Query('year') searchingYear: string) {
  //   return `We are searching for a game after: ${searchingYear}`;
  // }

  @Get(':id')
  getOne(@Param('id') gameId: number): Game {
    return this.gamesService.getOne(gameId);
  }

  @Post()
  create(@Body() gameData: CreateGameDto) {
    return this.gamesService.create(gameData);
  }

  @Delete(':id')
  remove(@Param('id') gameId: number) {
    return this.gamesService.deleteOne(gameId);
  }

  @Patch(':id')
  patch(@Param('id') gameId: number, @Body() updateData: UpdateGameDto) {
    return this.gamesService.patch(gameId, updateData)
  }
}
