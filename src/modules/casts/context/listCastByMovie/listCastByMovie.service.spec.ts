import { Test, TestingModule } from '@nestjs/testing';
import MockDate from 'mockdate';
import { getRepositoryToken } from '@nestjs/typeorm';

import { Cast } from '../../../../shared/entities/cast.entity';
import { mockCastList } from '../../../../shared/tests/cast.mock';
import { ListCastByMovieService } from './listCastByMovie.service';

const mockCastRepository = {
  find: () => {
    return Promise.resolve(mockCastList);
  },
};

describe('List Cast by Movie Service', () => {
  let service: ListCastByMovieService;

  beforeEach(async () => {
    MockDate.set(new Date());

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ListCastByMovieService,
        {
          provide: getRepositoryToken(Cast),
          useValue: mockCastRepository,
        },
      ],
    }).compile();

    service = module.get<ListCastByMovieService>(ListCastByMovieService);
  });

  it('Should be defined!', () => {
    expect(service).toBeDefined();
  });

  it('Should return the cast list on find() success', async () => {
    const response = await service.execute('any_movie_id');
    expect(response.length).toBeGreaterThan(1);
  });
});
