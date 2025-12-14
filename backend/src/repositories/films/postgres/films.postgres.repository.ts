import {
  ApiListResponse,
  FilmsRepository,
} from '../../films.repository.interface';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import FilmEntity from './entities/film.entity';
import ScheduleEntity from './entities/schedule.entity';

@Injectable()
export class FilmsPostgresDbRepository implements FilmsRepository {
  constructor(
    @InjectRepository(FilmEntity)
    private filmRepository: Repository<FilmEntity>,
    @InjectRepository(ScheduleEntity)
    private scheduleRepository: Repository<ScheduleEntity>,
  ) {}

  async findAll(): Promise<ApiListResponse<FilmEntity>> {
    const items = await this.filmRepository.find();
    const total = items.length ? items.length : 0;
    return {
      total,
      items,
    };
  }

  findById(id: string): Promise<FilmEntity | null> {
    return this.filmRepository.findOne({
      where: { id },
      relations: ['schedule'],
    });
  }

  async findSchedule(filmId: string): Promise<ApiListResponse<ScheduleEntity>> {
    const film = await this.filmRepository.findOne({
      where: { id: filmId },
      relations: ['schedule'],
      order: {
        schedule: {
          daytime: 'ASC',
        },
      },
    });

    const items = film ? film.schedule : [];
    const total = items.length ? items.length : 0;

    return {
      items,
      total,
    };
  }

  findSessionById(id: string): Promise<ScheduleEntity | null> {
    return this.scheduleRepository.findOne({
      where: { id },
    });
  }

  async setTakenSeat(
    filmId: string,
    sessionId: string,
    taken: string[],
  ): Promise<FilmEntity | null> {
    await this.scheduleRepository.update({ id: sessionId, filmId }, { taken });
    return this.findById(filmId);
  }
}
