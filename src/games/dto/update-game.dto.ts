import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsString } from 'class-validator';
import { CreateGameDto } from './create-game.dto';


export class UpdateGameDto extends PartialType(CreateGameDto) {
  
}
