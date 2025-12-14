import { FilmDTO, ScheduleDTO } from 'src/films/dto/films.dto';

export type ApiListResponse<Type> = {
  total: number;
  items: Type[];
};

export interface FilmsRepository {
  findAll(): Promise<ApiListResponse<FilmDTO>>;
  findById(id: string): Promise<FilmDTO | null>;
  findSchedule(filmId: string): Promise<ApiListResponse<ScheduleDTO>>;
}
