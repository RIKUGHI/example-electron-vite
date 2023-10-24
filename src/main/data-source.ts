import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { Photo } from '../entities/Photo'
import { PhotoMetadata } from '../entities/PhotoMetadata'
import { Author } from '../entities/Author'
import { Album } from '../entities/Album'
import { Post } from '../entities/Post'
import { PostRefactoring1698153432139 } from '../migrations/1698153432139-PostRefactoring'

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'database/test_db.sqlite',
  entities: [],
  synchronize: true,
  logging: true,
  migrations: [PostRefactoring1698153432139]
})
