import { MovieModule } from '../../modules/movies/movie.module';
import { UserModule } from '../../modules/users/user.module';

export const routerConfig = [
  {
    path: '/users',
    module: UserModule,
  },
  {
    path: '/movies',
    module: MovieModule,
  },
];
