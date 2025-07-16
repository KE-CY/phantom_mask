import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { Mask } from "./Mask";
import { Pharmacy } from "./Pharmacy";

@Entity({ name: 'pharmacy_mask' })
export class PharmacyMask {
  @PrimaryGeneratedColumn()
  id?: number;

  @ManyToOne(() => Pharmacy, pharmacy => pharmacy.pharmacyMasks, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'pharmacy_id' })
  pharmacy!: Pharmacy;

  @ManyToOne(() => Mask, mask => mask.pharmacyMasks, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'mask_id' })
  mask!: Mask;

  @Column('numeric', { precision: 10, scale: 2 })
  price!: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt?: Date;
}