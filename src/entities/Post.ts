import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id!: number

  @Column('varchar')
  name!: string

  // @Column('varchar')
  // text!: string
}
