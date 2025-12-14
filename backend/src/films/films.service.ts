import { Injectable } from '@nestjs/common';
import { FilmsMongoDbRepository } from 'src/films/films.mongo.repository';
import { ApiListResponse } from './films.repository.interface';
import { FilmDTO, ScheduleDTO } from './dto/films.dto';

@Injectable()
export class FilmsService {
  constructor(private readonly mongoDBRepository: FilmsMongoDbRepository) {}

  async findAll(): Promise<ApiListResponse<FilmDTO>> {
    return this.mongoDBRepository.findAll();
  }

  async findById(id: string): Promise<FilmDTO | null> {
    return this.mongoDBRepository.findById(id);
  }

  async findSchedule(id: string): Promise<ApiListResponse<ScheduleDTO>> {
    return this.mongoDBRepository.findSchedule(id);
  }

  async setTakenSeat(filmId: string, sessionId: string, seat: string) {
    return this.mongoDBRepository.setTakenSeat(filmId, sessionId, seat);
  }
}
