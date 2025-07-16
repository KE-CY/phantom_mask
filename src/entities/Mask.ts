import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { PharmacyMask } from "./PharmacyMask";
import { PurchaseHistory } from "./PurchaseHistory";

@Entity()
export class Mask {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name!: string;

  @Column({ name: 'is_active', default: true })
  isActive!: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt?: Date;

  // Ref
  @OneToMany(() => PurchaseHistory, ph => ph.mask)
  purchaseHistories?: PurchaseHistory[];

  @OneToMany(() => PharmacyMask, pm => pm.mask)
  pharmacyMasks?: PharmacyMask[];
}