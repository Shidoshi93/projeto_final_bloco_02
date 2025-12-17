import { Injectable } from "@nestjs/common";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { Category } from "../../category/entities/category.entity";

@Injectable()
export class TestService implements TypeOrmOptionsFactory {

    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: 'sqlite' as const,
            database: ':memory:',
            entities: [Category],
            synchronize: true,
            logging: false,
            dropSchema: true,
        };
    }
}