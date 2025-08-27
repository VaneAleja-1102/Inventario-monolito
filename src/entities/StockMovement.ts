import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, JoinColumn } from 'typeorm';
import { Product } from './Product';

export type MovementType = 'IN' | 'OUT';

@Entity({ name: 'stock_movements' })
export class StockMovement {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Product, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'product_id' })
  product!: Product;

  @Column({ type: 'varchar', length: 3 })
  type!: MovementType;

  @Column({ type: 'int' })
  quantity!: number;

  @Column({ type: 'text', nullable: true })
  note?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;
}
