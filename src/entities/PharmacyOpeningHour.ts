import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { Pharmacy } from "./Pharmacy";

@Entity({ name: 'pharmacy_opening_hour' })
export class PharmacyOpeningHour {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Pharmacy, pharmacy => pharmacy.pharmacyOpeningHours, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'pharmacy_id' })
  pharmacy?: Pharmacy;

  @Column({ type: 'int', name: 'day_Of_week' })
  dayOfWeek!: number;

  @Column({ type: 'time', name: 'open_time' })
  openTime!: string;

  @Column({ type: 'time', name: 'close_time' })
  closeTime!: string;

  @Column({ default: false, name: 'is_overnight' })
  isOvernight!: boolean;
}
