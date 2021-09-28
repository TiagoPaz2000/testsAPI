import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('sentTests')
class SentTest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sender: number;

  @Column()
  receiver: string;

  @Column()
  testId: number;

  @Column()
  token: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default SentTest;
