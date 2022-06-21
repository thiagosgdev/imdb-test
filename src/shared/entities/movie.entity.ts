import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MovieGenre } from '../enums/movieGenre.enum';
import { Vote } from './vote.entity';

@Entity('movies')
export class Movie {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({
    type: 'enum',
    enum: MovieGenre,
    default: MovieGenre.UNDEFINED,
  })
  genre: MovieGenre;

  @Column()
  director: string;

  @OneToMany(() => Vote, (votes) => votes.movies)
  votes?: Vote[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
