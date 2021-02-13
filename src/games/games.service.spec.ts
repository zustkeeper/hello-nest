import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { GamesService } from './games.service';

describe('GamesService', () => {
  let service: GamesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GamesService],
    }).compile();

    service = module.get<GamesService>(GamesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an array', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getOne', () => {
    it('should return a game', () => {
      service.create({
        title: 'Test Game',
        genres: ['test'],
        year: 2000,
      });
      const game = service.getOne(1);
      expect(game).toBeDefined();
      expect(game.id).toEqual(1);
    });

    it('should throw NotFoundException error', () => {
      try {
        service.getOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual('Game with ID 999 not found.');
      }
    });
  });

  describe('deleteOne', () => {
    it('deletes a game', () => {
      service.create({
        title: 'Test Game',
        genres: ['test'],
        year: 2000,
      });
      const beforeDelete = service.getAll().length;
      service.deleteOne(1);
      const afterDelete = service.getAll().length;

      expect(afterDelete).toBeLessThan(beforeDelete);
    });

    it('should return a NotFoundException', () => {
      try {
        service.deleteOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('create', () => {
    it('should create a game', () => {
      const beforeCreate = service.getAll().length;
      service.create({
        title: 'Test Game',
        genres: ['test'],
        year: 2000,
      });
      const afterCreate = service.getAll().length;
      expect(afterCreate).toBeGreaterThan(beforeCreate);
    });
  });

  describe('patch', () => {
    it('should update a game', () => {
      service.create({
        title: 'Test Game',
        genres: ['test'],
        year: 2000,
      });
      service.patch(1, { title: 'Update Test' });
      const game = service.getOne(1);
      expect(game.title).toEqual('Update Test');
    });
    it('should return a NotFoundException', () => {
      try {
        service.patch(999, {});
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
