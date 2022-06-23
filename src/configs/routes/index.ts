import { VoteModule } from '../../modules/votes/vote.module';
import { MovieModule } from '../../modules/movies/movie.module';
import { UserModule } from '../../modules/users/user.module';
import { ActorModule } from '../../modules/actors/actors.module';
import { CastModule } from '../../modules/casts/casts.module';

export const routerConfig = [
  {
    path: '/users',
    module: UserModule,
  },
  {
    path: '/movies',
    module: MovieModule,
  },
  {
    path: '/votes',
    module: VoteModule,
  },
  {
    path: '/actors',
    module: ActorModule,
  },
  {
    path: '/casts',
    module: CastModule,
  },
];
