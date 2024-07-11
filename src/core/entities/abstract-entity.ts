import { BaseEntity, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

export default abstract class AbstractEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;
}
