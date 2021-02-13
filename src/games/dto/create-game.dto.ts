import { IsNumber, IsOptional, IsString } from 'class-validator';

// https://github.com/typestack/class-validator

export class CreateGameDto {
  @IsString()
  readonly title: string;
  @IsNumber()
  readonly year: number;
  @IsOptional()
  @IsString({ each: true })
  readonly genres: string[];
}
