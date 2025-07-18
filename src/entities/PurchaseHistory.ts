import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Mask } from './Mask';
import { Pharmacy } from './Pharmacy';
import { User } from './User';

@Entity({ name: 'purchase_history' })
export class PurchaseHistory {
  @PrimaryGeneratedColumn()
  id?: number;

  @ManyToOne(() => User, user => user.purchaseHistories, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user?: User;

  @ManyToOne(() => Pharmacy, pharmacy => pharmacy.purchaseHistories, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'pharmacy_id' })
  pharmacy?: Pharmacy;

  @ManyToOne(() => Mask, mask => mask.purchaseHistories, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'mask_id' })
  mask?: Mask;

  @Column('numeric', { precision: 10, scale: 2, name: 'transaction_amount' })
  transactionAmount?: number;

  @Column({ name: 'transaction_date', type: 'timestamp' })
  transactionDate?: Date;
}