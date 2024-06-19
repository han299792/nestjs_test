import { Column, PrimaryGeneratedColumn, Entity, CreateDateColumn} from 'typeorm';

@Entity('user')
export class User{
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  created_at: Date;
}