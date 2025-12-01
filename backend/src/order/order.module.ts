import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Film, FilmSchema } from 'src/films/schema/films.schema';
import { FilmsService } from 'src/films/films.service';
import { FilmsMongoDbRepository } from 'src/films/films.mongo.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Film.name, schema: FilmSchema }]),
  ],
  controllers: [OrderController],
  providers: [OrderService, FilmsService, FilmsMongoDbRepository],
})
export class OrderModule {}
