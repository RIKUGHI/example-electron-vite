import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { Photo } from '../entities/Photo'
import { PhotoMetadata } from '../entities/PhotoMetadata'
import { Author } from '../entities/Author'
import { Album } from '../entities/Album'

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'database/test_db.sqlite',
  entities: [Photo, PhotoMetadata, Author, Album],
  synchronize: true,
  logging: true
})
