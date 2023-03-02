import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Pattern } from "../entities/pattern.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class PhotoService {
  constructor(
    @InjectRepository(Pattern) private patternRepository: Repository<Pattern>,
  ) {}

  async findAll(): Promise<Pattern[]> {
    return this.patternRepository.find();
  }
}
