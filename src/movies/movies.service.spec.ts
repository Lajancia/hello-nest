import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => { //테스트 실행 형식
    expect(service).toBeDefined();
  });

  it("should be 4", () => {
    expect(2+3).toEqual(5)
  })

  describe("getAll", () => {
    it("should return array", () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe("getOne", () => {
    it("should return a movie", () => {
      service.create({
        title: "test MOvie",
        genres: ['test'],
        year: 2000,
      });
      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    });
    it("should throw 404 error", () => {
      try {
        service.getOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException)
        expect(e.message).toEqual('movie with id 999 not found');
      }
    })
  });

  describe("deleteOne", () => {
    it("delets a movie", () => {
      service.create({
        title: 'Test Movie',
        genres: ['test'],
        year: 200,
      });
      console.log(service.getAll)
      const allMovies = service.getAll().length;
      service.deleteOne(1)
      const afterDelete = service.getAll().length;

      expect(afterDelete).toBeLessThan(allMovies);
    })
    it("it should return a 404", () => {
      try {
        service.deleteOne(999);

      }catch (e) {
        expect(e).toBeInstanceOf(NotFoundException)
    
      }
    })
  })

  describe("create", () => {
    it("should create a movie", () => {
      const beforeCreate = service.getAll().length
      service.create({
        title: 'Test Movie',
        genres: ['test'],
        year: 2000,
      });
      const afterCreate = service.getAll().length;
      console.log(beforeCreate,afterCreate)
      expect(afterCreate).toBeGreaterThan(beforeCreate)
    })
  })

  describe("update", () => {
    it("should updata a movie", () => {
      service.create({
        title: 'Test Movie',
        genres: ['test'],
        year: 2000,
      });
      service.update(1, { title: "Updated Test" });
      const movie = service.getOne(1);
      expect(movie.title).toEqual('Updated Test')
    })
  })
   it("it should throw a Not Found Exception", () => {
      try {
        service.update(999, {});

      }catch (e) {
        expect(e).toBeInstanceOf(NotFoundException)
    
      }
    })
});
