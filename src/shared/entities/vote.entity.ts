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
import { Movie } from './movie.entity';
import { User } from './user.entity';

@Entity('votes')
export class Vote {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ name: 'user_id' })
  userId: string;

  @Column({ name: 'movie_id' })
  movieId: string;

  @Column()
  score: number;

  @ManyToOne(() => User, (user) => user.votes)
  @JoinColumn({ name: 'user_id' })
  users: User[];

  @ManyToOne(() => Movie, (movie) => movie.votes)
  @JoinColumn({ name: 'movie_id' })
  movies: Movie[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
