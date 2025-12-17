import { INestApplication, ValidationPipe, BadRequestException } from "@nestjs/common";
import { App } from "supertest/types";
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { CreateCategoryDto } from "../../src/category/dtos";
import { AppModule } from "../../src/app.module";

const createCategory: CreateCategoryDto = {
    name: 'Category Test',
    description: 'Description Test',
    isActive: true
};

describe('CategoryService', () => {
    process.env.NODE_ENV = 'development';
    let app: INestApplication<App>;
    let categoryId: number;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        
        // Adicionar ValidationPipe para simular comportamento real da API
        app.useGlobalPipes(
            new ValidationPipe({
                whitelist: true,
                forbidNonWhitelisted: true,
                transform: true,
                exceptionFactory: (errors) => {
                    const errorMessages = errors.map(error => {
                        const constraints = error.constraints || {};
                        const messages = Object.values(constraints);
                        return messages.join(', ');
                    });
                    return new BadRequestException({
                        message: errorMessages.join(' | '),
                        error: 'Bad Request',
                        statusCode: 400,
                    });
                },
            }),
        );
        
        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });

    it('POST /category should create a new category', async () => {
        const response = await request(app.getHttpServer())
            .post('/category')
            .send(createCategory)
            .expect(201);

        expect(response.body).toHaveProperty('id');
        expect(response.body.name).toBe('Category Test');
        expect(response.body.isActive).toBe(true);

        categoryId = response.body.id;
    });

    it('POST /category should fail when name or any required field is missing', async () => {
        const response = await request(app.getHttpServer())
            .post('/category')
            .send({ description: 'No Name Category', isActive: true })
            .expect(400);

        expect(response.body.message).toContain(
            'name should be between 1 and 100 characters, name should not be empty'
        );
    });

    it('POST /category should fail when trying to create a category with a name that already exists', async () => {
        const response = await request(app.getHttpServer())
            .post('/category')
            .send(createCategory)
            .expect(400);

        expect(response.body.message).toContain(
            'Category with name: Category Test already exists'
        );
    });

    it('GET /category should retrieve all categories', async () => {
        const response = await request(app.getHttpServer())
            .get('/category')
            .expect(200);

        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
    });

    it('GET /category/:id should retrieve the created category by ID', async () => {
        const response = await request(app.getHttpServer())
            .get(`/category/${categoryId}`)
            .expect(200);

        expect(response.body.id).toBe(categoryId);
        expect(response.body.name).toBe('Category Test');
        expect(response.body.isActive).toBe(true);
    });

    it('GET /category/name/:name should retrieve categories by name', async () => {
        const response = await request(app.getHttpServer())
            .get('/category/name/Category Test')
            .expect(200);

        expect(response.body.length).toBeGreaterThan(0);
        expect(response.body[0].name).toBe('Category Test');
    });

    it('GET /category/is-active/:isActive should retrieve categories by isActive status', async () => {
        const response = await request(app.getHttpServer())
            .get('/category/is-active/true')
            .expect(200);

        expect(response.body.length).toBeGreaterThan(0);
        expect(response.body[0].isActive).toBe(true);
    });

    it('PUT /category/:id should update the category only with name', async () => {
        const response = await request(app.getHttpServer())
            .put(`/category/${categoryId}`)
            .send({ name: 'Updated Category' })
            .expect(200);

        expect(response.body.id).toBe(categoryId);
        expect(response.body.name).toBe('Updated Category');
        expect(response.body.description).toBe('Description Test');
        expect(response.body.isActive).toBe(true);
    });

    it('PUT /category/:id should update the category with all fields', async () => {
        const response = await request(app.getHttpServer())
            .put(`/category/${categoryId}`)
            .send({ name: 'Final Category', description: 'Final Description', isActive: false })
            .expect(200);

        expect(response.body.id).toBe(categoryId);
        expect(response.body.name).toBe('Final Category');
        expect(response.body.description).toBe('Final Description');
        expect(response.body.isActive).toBe(false);
    });


    it('DELETE /category/:id should delete the category', async () => {
        await request(app.getHttpServer())
            .delete(`/category/${categoryId}`)
            .expect(204);

        await request(app.getHttpServer())
            .get(`/category/${categoryId}`)
            .expect(404);
    });
});