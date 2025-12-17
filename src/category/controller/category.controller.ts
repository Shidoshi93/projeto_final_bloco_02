import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseBoolPipe, ParseIntPipe, Post, Put } from "@nestjs/common";
import { CategoryService } from "../service/category.service";
import { CreateCategoryDto, UpdateCategoryDto } from "../dtos";
import { DeleteResult } from "typeorm";
import { Category } from "../entities/category.entity";
import { ApiTags, ApiResponse, ApiOperation } from "@nestjs/swagger";

@ApiTags('Category')
@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Listar todas as categorias' })
    @ApiResponse({ status: 200, description: 'Lista de categorias', type: [Category] })
    async findAll(): Promise<Category[]> {
        return this.categoryService.findAll();
    }

    @Get('/name/:name')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Buscar categorias por nome' })
    @ApiResponse({ status: 200, description: 'Categoria encontrada', type: [Category] })
    async findByName(@Param('name') name: string): Promise<Category[]> {
        return await this.categoryService.findByName(name);
    }

    @Get('/is-active/:isActive')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Buscar categorias por status ativo/inativo' })
    @ApiResponse({ status: 200, description: 'Categorias encontradas', type: [Category] })
    async findByIsActive(@Param('isActive', ParseBoolPipe) isActive: boolean): Promise<Category[]> {
        return await this.categoryService.findByIsActive(isActive);
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Buscar categoria por ID' })
    @ApiResponse({ status: 200, description: 'Categoria encontrada', type: Category })
    async findById(@Param('id', ParseIntPipe) id: number): Promise<Category> {
        return this.categoryService.findById(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Atualizar categoria' })
    @ApiResponse({ status: 200, description: 'Categoria atualizada com sucesso', type: Category })
    async createCategory(@Body() body: CreateCategoryDto): Promise<Category> {
        return this.categoryService.createCategory(body);
    }

    @Put('/:id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Atualizar categoria' })
    @ApiResponse({ status: 200, description: 'Categoria atualizada com sucesso', type: Category })
    async updateCategory(
        @Param('id', ParseIntPipe) id: number,
        @Body() body: UpdateCategoryDto
    ): Promise<Category> {
        return this.categoryService.updateCategory(id, body);
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Deletar categoria' })
    @ApiResponse({ status: 204, description: 'Categoria deletada com sucesso' })
    async deleteCategory(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
        return this.categoryService.deleteCategory(id);
    }
}