import { Entity, Column } from 'typeorm';
import { Base } from './utils/base.model';

@Entity()
export class Wishlist extends Base {
  @Column('varchar', {
    length: 55,
    name: 'test_column',
  })
  testColumn: string;
}
