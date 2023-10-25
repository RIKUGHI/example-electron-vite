import 'reflect-metadata'
import { DataSource } from 'typeorm'
// import { Photo } from '../entities/Photo'
// import { PhotoMetadata } from '../entities/PhotoMetadata'
// import { Author } from '../entities/Author'
// import { Album } from '../entities/Album'
import { Post } from '../entities/Post'
// import { PostRefactoring1698153432139 } from '../migrations/1698153432139-PostRefactoring'
import { CreatePosts1698213471347 } from '../migrations/1698213471347-CreatePosts'
import { CreateComments1698216700137 } from '../migrations/1698216700137-CreateComments'
import { app } from 'electron'
import { join } from 'path'

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: join(app.getPath('userData'), 'database/test_db.sqlite'),
  entities: [Post],
  // synchronize: true,
  logging: true,
  // migrations: [CreatePosts1698213471347]
  migrations: [CreatePosts1698213471347, CreateComments1698216700137]
})
