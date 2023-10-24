import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  type Relation,
  ManyToOne,
  ManyToMany
} from 'typeorm'
import { PhotoMetadata } from './PhotoMetadata'
import { Author } from './Author'
import { Album } from './Album'

@Entity()
export class Photo {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({
    length: 100,
    type: 'varchar'
  })
  name!: string

  @Column('text')
  description!: string

  @Column('varchar')
  filename!: string

  @Column('integer')
  views!: number

  @Column('boolean')
  isPublished!: boolean

  @OneToOne(() => PhotoMetadata, (photoMetadata) => photoMetadata.photo)
  metadata!: Relation<PhotoMetadata>

  @ManyToOne(() => Author, (author) => author.photos)
  author!: Author

  @ManyToMany(() => Album, (album) => album.photos)
  albums!: Album[]
}
