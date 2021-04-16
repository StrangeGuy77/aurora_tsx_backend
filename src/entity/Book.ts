import { Entity, Column, ManyToOne } from 'typeorm';
import { Users } from './User';
import { Base } from './utils/base.model';

@Entity()
export class Book extends Base {
  @Column('varchar', {
    length: 50,
  })
  title: string;

  @Column('character varying', { length: 2000 })
  description: string;

  @Column('varchar', {
    length: 30,
  })
  author: string;

  @Column('float')
  price: number;

  @Column('varchar', {
    length: 5,
  })
  extension: string;

  @Column('varchar', {
    length: 50,
  })
  publisher: string;

  @Column('date')
  writingYear: Date;

  @Column('varchar', {
    array: true,
  })
  categories: string[];

  @Column('varchar', {
    length: 50,
  })
  filename: string;

  @Column('integer', { default: 0 })
  views: number;

  @Column('integer', { default: 0 })
  likes: number;

  @Column('integer', { default: 0 })
  timesDownloaded: number;

  @ManyToOne((_) => Users, (user) => user.id)
  user: Users;
}
