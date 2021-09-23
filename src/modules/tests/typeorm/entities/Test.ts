import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('tests')
class Test {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  categorie: string;

  @Column()
  time_limit: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Test;
