import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Pattern {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  created:Date;

  @Column()
  updated:Date;
}
