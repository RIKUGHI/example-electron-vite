import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Photo } from './Photo'

@Entity()
export class Author {
  @PrimaryGeneratedColumn()
  id!: number

  @Column('varchar')
  name!: string

  @OneToMany(() => Photo, (photo) => photo.author) // note: we will create author property in the Photo class below
  photos!: Photo[]
}
