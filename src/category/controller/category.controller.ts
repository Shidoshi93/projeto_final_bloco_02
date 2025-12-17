import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseBoolPipe, ParseIntPipe, Post, Put } from "@nestjs/common";
import { CategoryService } from "../service/category.service";
import { CreateCategoryDto, UpdateCategoryDto } from "../dtos";
import { DeleteResult } from "typeorm";
import { Category } from "../entities/category.entity";

@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll() {
        return this.categoryService.findAll();
    }

    @Get('/name/:name')
    @HttpCode(HttpStatus.OK)
    async findByName(@Param('name') name: string) {
        return await this.categoryService.findByName(name);
    }

    @Get('/is-active/:isActive')
    @HttpCode(HttpStatus.OK)
    async findByIsActive(@Param('isActive', ParseBoolPipe) isActive: boolean) {
        return await this.categoryService.findByIsActive(isActive);
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    async findById(@Param('id', ParseIntPipe) id: number) {
        return this.categoryService.findById(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createCategory(@Body() body: CreateCategoryDto): Promise<Category> {
        return this.categoryService.createCategory(body);
    }

    @Put('/:id')
    @HttpCode(HttpStatus.OK)
    async updateCategory(
        @Param('id', ParseIntPipe) id: number,
        @Body() body: UpdateCategoryDto
    ): Promise<Category> {
        return this.categoryService.updateCategory(id, body);
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteCategory(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
        return this.categoryService.deleteCategory(id);
    }
}