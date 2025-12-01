import { Injectable } from '@nestjs/common';
import { FilmsLocalRepository } from 'src/films/films.local.repository';
import { FilmsMongoDbRepository } from 'src/films/films.mongo.repository';

@Injectable()
export class FilmsService {
  constructor(
    private readonly localRepository: FilmsLocalRepository,
    private readonly mongoDBRepository: FilmsMongoDbRepository,
  ) {}

  async findAll() {
    return this.mongoDBRepository.findAll();
  }

  async findById(id: string) {
    return this.mongoDBRepository.findById(id);
  }

  async findSchedule(id: string) {
    return this.mongoDBRepository.findSchedule(id);
  }
}
