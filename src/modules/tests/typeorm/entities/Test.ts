import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Question from '../../../questions/typeorm/entities/Question';

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

  @Column()
  user_id: number;

  @OneToMany(() => Question, question => question.test, { eager: true })
  questions: Question[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Test;
