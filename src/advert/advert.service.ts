import { Injectable } from '@nestjs/common';
import { CreateAdvertDto } from './dto/create-advert.dto';
import { UpdateAdvertDto } from './dto/update-advert.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AdvertEntity } from './entities/advert.entity';
import { Repository } from 'typeorm';
import { QueriesAdvertDTO } from './dto/queries-advert.dto';

@Injectable()
export class AdvertService {
  constructor(
    @InjectRepository(AdvertEntity)
    private readonly advertRepository: Repository<AdvertEntity>,
  ) {}

  create(createAdvertDto: CreateAdvertDto) {
    try {
      return this.advertRepository.save(createAdvertDto);
    } catch (error) {
      throw new Error(error);
    }
  }

  findAll(queries: QueriesAdvertDTO) {
    let max_price: number
    let min_rooms: number

    // Convert to int
    if (queries.max_price) max_price = parseInt(queries.max_price);
    if (queries.min_rooms) min_rooms = parseInt(queries.min_rooms);

    // SELECT * from advert WHERE price <= max_price AND nb_rooms >= min_rooms
    let queryBuilder = this.advertRepository.createQueryBuilder("advert")

    if(max_price && max_price > 0) {
      queryBuilder.andWhere("advert.price <= :max_price", { max_price: max_price })
    }

    if(min_rooms && min_rooms > 0) {
      queryBuilder.andWhere("advert.nb_rooms >= :min_rooms", { min_rooms: min_rooms })
    }

    // Ajouter un filtre pour la surface minimale et maximale

    return queryBuilder.getMany();
  }

  findOne(id: number) {
    return this.advertRepository.findOneBy({
      id: id
    });
  }

  update(id: number, updateAdvertDto: UpdateAdvertDto) {
    return this.advertRepository.update(id, updateAdvertDto);
  }

  remove(id: number) {
    return this.advertRepository.softDelete(id);
  }
}
