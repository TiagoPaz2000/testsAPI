import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Answer from '../../../answers/typeorm/entities/Answer';
import Test from '../../../tests/typeorm/entities/Test';

@Entity('questions')
class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  question: string;

  @Column()
  categorie: string;

  @Column()
  type: number;

  @ManyToOne(() => Test, test => test.questions)
  test: Test;

  @OneToMany(() => Answer, answer => answer.question, { eager: true })
  answers: Answer[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Question;
