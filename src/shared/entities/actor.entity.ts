import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Cast } from './cast.entity';

@Entity('actors')
export class Actor {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  resume: string;

  @OneToMany(() => Cast, (casts) => casts.movies)
  casts?: Cast[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
