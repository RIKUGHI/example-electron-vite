import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  type Relation
} from 'typeorm'
import { Photo } from './Photo'

@Entity()
export class PhotoMetadata {
  @PrimaryGeneratedColumn()
  id!: number

  @Column('int')
  height!: number

  @Column('int')
  width!: number

  @Column('varchar')
  orientation!: string

  @Column('varchar')
  compressed!: boolean

  @Column('varchar')
  comment!: string

  @OneToOne(() => Photo, (photo) => photo.metadata)
  @JoinColumn()
  photo!: Relation<Photo>
}
