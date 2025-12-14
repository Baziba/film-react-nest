import mongoose from 'mongoose';
import {
  ApiListResponse,
  FilmsRepository,
} from '../../films.repository.interface';
import { InjectModel } from '@nestjs/mongoose';
import { FilmDTO, ScheduleDTO } from '../dto/films.dto';
import { Film, FilmDocument } from './schema/films.schema';

export class FilmsMongoDbRepository implements FilmsRepository {
  constructor(
    @InjectModel(Film.name) private filmModel: mongoose.Model<FilmDocument>,
  ) {}

  async findAll(): Promise<ApiListResponse<FilmDTO>> {
    const items = await this.filmModel.find({});
    const total = await this.filmModel.countDocuments({});
    return {
      total,
      items: items.map((item) => this.filmMapper(item)),
    };
  }

  async findById(id: string): Promise<FilmDTO | null> {
    const film = await this.filmModel.findOne({ id: id });
    return film ? this.filmMapper(film) : null;
  }

  async findSchedule(filmId: string): Promise<ApiListResponse<ScheduleDTO>> {
    const film = await this.filmModel.findOne({ id: filmId });
    const items = film ? film.schedule.map((s) => this.scheduleMapper(s)) : [];
    const total = 0;
    return {
      items,
      total,
    };
  }

  async setTakenSeat(filmId: string, sessionId: string, seat: string) {
    return this.filmModel.updateOne(
      {
        id: filmId,
        'schedule.id': sessionId,
      },
      {
        $addToSet: { 'schedule.$.taken': seat },
      },
    );
  }

  private filmMapper(film: FilmDTO): FilmDTO {
    return {
      id: film.id,
      rating: film.rating,
      director: film.director,
      tags: film.tags,
      image: film.image,
      cover: film.cover,
      title: film.title,
      about: film.about,
      description: film.description,
      schedule: film.schedule.map((s) => this.scheduleMapper(s)),
    };
  }

  private scheduleMapper(schedule: ScheduleDTO): ScheduleDTO {
    return {
      id: schedule.id,
      daytime: schedule.daytime,
      hall: schedule.hall,
      rows: schedule.rows,
      seats: schedule.seats,
      price: schedule.price,
      taken: schedule.taken,
    };
  }
}
