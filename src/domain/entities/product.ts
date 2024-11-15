import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity({ name: 'produto', schema: 'public' })
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'descricao',
    type: 'varchar',
    length: 50,
    nullable: false,
    unique: true,
  })
  description: string;

  @Column({
    name: 'categoria',
    type: 'varchar',
    length: 10,
    nullable: false,
    unique: true,
  })
  category: string;

  @Column({
    name: 'valor',
    type: 'numeric',
    precision: 4,
    scale: 15,
    nullable: false,
  })
  value: string;

  @Column({
    name: 'criado_por',
    type: 'varchar',
    length: 20,
    default: 'KessiaRodrigues',
  })
  createdBy: string;

  @CreateDateColumn({ name: 'criado_em' })
  createdAt: Date;
}
