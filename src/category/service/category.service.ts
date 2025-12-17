import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "../entities/category.entity";
import { DeleteResult, ILike, Repository } from "typeorm";
import { CreateCategoryDto, UpdateCategoryDto } from "../dtos";

@Injectable()
export class CategoryService {
    private readonly logger = new Logger(CategoryService.name);

    constructor(
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,
    ) {}

    async findAll() {
        this.logger.log('Fetching all categories');
        try {
            const categories = await this.categoryRepository.find();

            this.logger.log(`Found ${categories.length} categories`);
            return categories;
        } catch (error) {
            this.logger.error('Failed to fetch categories', error.stack);
            throw new InternalServerErrorException('Could not fetch categories');
        }
    }

    async findById(id: number) {
        this.logger.log(`Fetching category with ID: ${id}`);
        try {
            const category = await this.categoryRepository.findOne({ 
                where: { id } 
            });
            if (!category) {
                this.logger.error(`Category with ID: ${id} not found`);
                throw new NotFoundException(`Category with ID: ${id} not found`);
            }

            this.logger.log(`Found category with ID: ${id}`);
            return category;
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }

            this.logger.error(`Failed to fetch category with ID: ${id}`, error.stack);
            throw new InternalServerErrorException('Could not fetch category');
        }
    }

    async findByName(name: string) {
        this.logger.log(`Fetching categories with name: ${name}`);
        try {
            const categories = await this.categoryRepository.find({
                where: { name: ILike(`%${name}%`) },
            });
            if (categories.length === 0) {
                this.logger.error(`No categories found with name: ${name}`);
                throw new NotFoundException(`No categories found with name: ${name}`);
            }

            this.logger.log(`Found ${categories.length} categories with name: ${name}`);
            return categories;
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }

            this.logger.error(`Failed to fetch categories with name: ${name}`, error.stack);
            throw new InternalServerErrorException('Could not fetch categories');
        }
    }

    async findByIsActive(isActive: boolean) {
        this.logger.log(`Fetching categories with isActive: ${isActive}`);
        try {
            const categories = await this.categoryRepository.find({
                where: { isActive },
            });
            if (categories.length === 0) {
                this.logger.error(`No categories found with isActive: ${isActive}`);
                throw new NotFoundException(`No categories found with isActive: ${isActive}`);
            }

            this.logger.log(`Found ${categories.length} categories with isActive: ${isActive}`);
            return categories;
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }

            this.logger.error(`Failed to fetch categories with isActive: ${isActive}`, error.stack);
            throw new InternalServerErrorException('Could not fetch categories');
        }
    }

    async createCategory(payload: CreateCategoryDto) {
        this.logger.log('Creating a new category');
        try {
            
            await this.categoryRepository.find({
                where: {name: payload.name }
            }).then((categories) => {
                if (categories.length > 0) {
                    this.logger.error(`Category with name: ${payload.name} already exists`);
                    throw new BadRequestException(`Category with name: ${payload.name} already exists`);
                }
            });

            const newCategory = this.categoryRepository.create(payload);
            const savedCategory = await this.categoryRepository.save(newCategory);

            this.logger.log(`Category created with ID: ${savedCategory.id}`);
            return savedCategory;
        } catch (error) {
            if (error instanceof BadRequestException) {
                throw error;
            }

            this.logger.error('Failed to create category', error.stack);
            throw new InternalServerErrorException('Could not create category');
        }
    }

    async updateCategory(id: number, payload: UpdateCategoryDto) {
        this.logger.log(`Updating category with ID: ${id}`);
        try {
            const category = await this.categoryRepository.findOne({ 
                where: { id } 
            });

            if (!category) {
                this.logger.error(`Category with ID: ${id} not found`);
                throw new NotFoundException(`Category with ID: ${id} not found`);
            }

            const updatedCategory = await this.categoryRepository.save({ ...category, ...payload });

            this.logger.log(`Category with ID: ${id} updated`);
            return updatedCategory;
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }

            this.logger.error(`Failed to update category with ID: ${id}`, error.stack);
            throw new InternalServerErrorException('Could not update category');
        }
    }

    async deleteCategory(id: number): Promise<DeleteResult> {
        this.logger.log(`Deleting category with ID: ${id}`);
        try {
            const category = await this.categoryRepository.findOne({ 
                where: { id } 
            });

            if (!category) {
                this.logger.error(`Category with ID: ${id} not found`);
                throw new NotFoundException(`Category with ID: ${id} not found`);
            }

            return await this.categoryRepository.delete(id);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }

            this.logger.error(`Failed to delete category with ID: ${id}`, error.stack);
            throw new InternalServerErrorException('Could not delete category');
        }
    }
}
