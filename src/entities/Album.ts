import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm'
import { Photo } from './Photo'

@Entity()
export class Album {
  @PrimaryGeneratedColumn()
  id!: number

  @Column('varchar')
  name!: string

  @ManyToMany(() => Photo, (photo) => photo.albums)
  @JoinTable()
  photos!: Photo[]
}
