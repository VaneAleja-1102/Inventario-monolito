import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Product } from './Product';

@Entity({ name: 'inventory' })
export class Inventory {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToOne(() => Product, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'product_id' })
  product!: Product;

  @Column({ type: 'int', default: 0 })
  quantity!: number;
}
