import { UpdateMovieParamsDTO } from 'src/modules/movies/dto/updateMovieParams.dto';
import { CreateMovieParamsDTO } from '../../modules/movies/dto/createMovieParams.dto';
import { MovieDTO } from '../../modules/movies/dto/movie.dto';
import { MovieGenre } from '../enums/movieGenre.enum';

export const mockMovie: MovieDTO = {
  id: 'any_id',
  name: 'Lion King',
  description: 'any_description',
  director: 'any_director',
  genre: 'action',
  createdAt: new Date(),
  updatedAt: null,
  deletedAt: null,
};

export const mockUpdatedMovie: MovieDTO = {
  id: 'any_id',
  name: 'Lion King II',
  description: 'updated_description',
  director: 'any_director',
  genre: 'action',
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
};

export const mockCreateMovieParamsDTO: CreateMovieParamsDTO = {
  name: 'Lion King',
  description: 'any_description',
  director: 'any_director',
  genre: MovieGenre.ACTION,
};

export const mockUpdateMovieParams: UpdateMovieParamsDTO = {
  name: 'Lion King II',
  description: 'updated_description',
};
