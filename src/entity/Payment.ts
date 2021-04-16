import { Entity, Column, JoinColumn, ManyToOne } from 'typeorm';
import { Users } from './User';
import { Base } from './utils/base.model';

@Entity()
export class Payment extends Base {
  @Column('json', {
    name: 'payment_method',
  })
  paymentMethod: CardPaymentMethod;

  @Column('varchar', {
    length: 3,
  })
  currency: string;

  @Column('integer', {
    name: 'amount',
  })
  amount: number;

  @Column('varchar', {
    length: 55,
  })
  name: string;

  @Column('varchar', {
    length: 55,
    name: 'description',
  })
  description: string;

  @ManyToOne((_) => Users)
  @JoinColumn()
  user: Users;
}

interface CardPaymentMethod {
  id: string;
  object: string;
  address_city: string;
  address_country: string;
  address_line1: string;
  address_line1_check: string;
  address_line2: any;
  address_state: any;
  address_zip: string;
  address_zip_check: string;
  brand: string;
  country: string;
  cvc_check: string;
  dynamic_last4: any;
  exp_month: number;
  exp_year: number;
  funding: string;
  last4: string;
  metadata: {};
  name: string;
  tokenization_method: null;
}
