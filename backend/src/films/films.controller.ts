import { Controller, Get, Param } from '@nestjs/common';
import { FilmsService } from './films.service';
import { FilmDTO, ScheduleDTO } from '../repositories/films/dto/films.dto';
import { ApiListResponse } from '../repositories/films.repository.interface';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get()
  async findAll(): Promise<ApiListResponse<FilmDTO>> {
    return await this.filmsService.findAll();
  }

  @Get(':id/schedule')
  async findSchedule(
    @Param('id') id: string,
  ): Promise<ApiListResponse<ScheduleDTO>> {
    return await this.filmsService.findSchedule(id);
  }
}
