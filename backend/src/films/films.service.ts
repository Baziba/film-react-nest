import { Injectable } from '@nestjs/common';
import { ApiListResponse } from '../repositories/films.repository.interface';
import { FilmDTO, ScheduleDTO } from '../repositories/films/dto/films.dto';
import { FilmsPostgresDbRepository } from '../repositories/films/postgres/films.postgres.repository';
import ScheduleEntity from '../repositories/films/postgres/entities/schedule.entity';
import FilmEntity from '../repositories/films/postgres/entities/film.entity';

@Injectable()
export class FilmsService {
  constructor(
    private readonly postgresDbRepository: FilmsPostgresDbRepository,
  ) {}

  async findAll(): Promise<ApiListResponse<FilmDTO>> {
    return this.postgresDbRepository.findAll();
  }

  async findById(id: string): Promise<FilmEntity | null> {
    return this.postgresDbRepository.findById(id);
  }

  async findSchedule(filmId: string): Promise<ApiListResponse<ScheduleEntity>> {
    return this.postgresDbRepository.findSchedule(filmId);
  }

  async findSessionById(id: string): Promise<ScheduleEntity | null> {
    return this.postgresDbRepository.findSessionById(id);
  }

  async setTakenSeat(filmId: string, sessionId: string, seats: string[]) {
    return this.postgresDbRepository.setTakenSeat(filmId, sessionId, seats);
  }
}
