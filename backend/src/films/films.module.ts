import { Module } from '@nestjs/common';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import { FilmsLocalRepository } from 'src/films/films.local.repository';
import { FilmsMongoDbRepository } from 'src/films/films.mongo.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Film, FilmSchema } from './schema/films.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Film.name, schema: FilmSchema }]),
  ],
  controllers: [FilmsController],
  providers: [FilmsLocalRepository, FilmsMongoDbRepository, FilmsService],
})
export class FilmsModule {}
