import { Module } from '@nestjs/common';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import { FilmsLocalRepository } from '../repositories/films/local/films.local.repository';
import { FilmsPostgresDbRepository } from '../repositories/films/postgres/films.postgres.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import FilmEntity from '../repositories/films/postgres/entities/film.entity';
import ScheduleEntity from '../repositories/films/postgres/entities/schedule.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FilmEntity, ScheduleEntity])],
  controllers: [FilmsController],
  providers: [FilmsService, FilmsLocalRepository, FilmsPostgresDbRepository],
})
export class FilmsModule {}
