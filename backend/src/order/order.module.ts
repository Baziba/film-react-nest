import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { FilmsService } from '../films/films.service';
import { FilmsPostgresDbRepository } from '../repositories/films/postgres/films.postgres.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import FilmEntity from '../repositories/films/postgres/entities/film.entity';
import ScheduleEntity from '../repositories/films/postgres/entities/schedule.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FilmEntity, ScheduleEntity])],
  controllers: [OrderController],
  providers: [OrderService, FilmsService, FilmsPostgresDbRepository],
})
export class OrderModule {}
