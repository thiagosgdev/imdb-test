import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Actor } from './actor.entity';
import { Movie } from './movie.entity';

@Entity('casts')
export class Cast {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ name: 'actor_id' })
  actorId: string;

  @Column({ name: 'movie_id' })
  movieId: string;

  @Column()
  role: string;

  @ManyToOne(() => Actor, (actor) => actor.casts)
  @JoinColumn({ name: 'actor_id' })
  actors: Actor[];

  @ManyToOne(() => Movie, (movie) => movie.casts)
  @JoinColumn({ name: 'movie_id' })
  movies: Movie[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
