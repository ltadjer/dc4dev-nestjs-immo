import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryEntity } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  create(createCategoryDto: CreateCategoryDto, user) {
    console.log("create category => user: ", user);
    const category = {
      ...createCategoryDto,
      user: {
        id: user.id
      },
    }

    try {      
      return this.categoryRepository.save(category);
    } catch (error) {
      throw new Error(error);
    }
  }

  findAll() {
    const queryBuilder = this.categoryRepository.createQueryBuilder('category')
    .leftJoinAndSelect('category.user', 'user')

    return queryBuilder.getMany();
  }

  findOne(id: number) {
    const queryBuilder = this.categoryRepository.createQueryBuilder('category')
    .leftJoinAndSelect('category.user', 'user')
    .where('category.id = :id', { id: id });

    return queryBuilder.getOne();
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto, user) {
    const category = await this.findOne(id);
    this.checkIfUserIsOwner(category, user);
    return this.categoryRepository.update(id, updateCategoryDto);
  }

  async remove(id: number, user) {
    const category = await this.findOne(id);

    this.checkIfUserIsOwner(category, user);

    return this.categoryRepository.softDelete(id);
  }

  checkIfUserIsOwner(category, user) {
    if(category.user.id!== user.id) throw new UnauthorizedException("You are not the owner of this category")
  }
}
