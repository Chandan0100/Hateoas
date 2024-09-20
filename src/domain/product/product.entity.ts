import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity('product')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  name: string;

  @ManyToOne(() => User, (user) => user.uuid, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'uuid' })
  user_id: User;

  @Column({ type: 'varchar', length: 50, nullable: true })
  description: string;

  @Column({ type: 'integer', nullable: false })
  amount: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  getLinks() {
    return {
      self: {
        href: `/products/${this.uuid}`,
      },
    };
  }
}
