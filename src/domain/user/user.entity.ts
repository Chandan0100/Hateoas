import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryColumn('uuid')
  uuid: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  first_name: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  last_name: string;

  @Column({ type: 'varchar', length: 50, unique: true, nullable: false })
  email: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
