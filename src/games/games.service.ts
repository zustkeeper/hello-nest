import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { Game } from './entities/games.entity';

@Injectable()
export class GamesService {
  private games: Game[] = [];

  getAll(): Game[] {
    return this.games;
  }

  getOne(id: number): Game {
    const game = this.games.find((game) => game.id === id); //parseInt(id), +id
    if (!game) {
      throw new NotFoundException(`Game with ID ${id} not found.`);
    }
    return game;
  }

  deleteOne(id: number) {
    this.getOne(id);
    this.games = this.games.filter((game) => game.id !== +id);
  }

  create(gameData: CreateGameDto) {
    this.games.push({
      id: this.games.length + 1,
      ...gameData,
    });
  }

  patch(id: number, updateData: UpdateGameDto) {
    const game = this.getOne(id);
    this.deleteOne(id);
    this.games.push({
      ...game,
      ...updateData
    })
  }
}
