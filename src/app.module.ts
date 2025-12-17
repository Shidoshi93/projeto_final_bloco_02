import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { DevService } from './data/service/dev.service';
import { ProdService } from './data/service/prod.service';
import { CategoryModule } from './category/category.module';
import { AppController } from './app.controller';
import { Test } from '@nestjs/testing';
import { TestService } from './data/service/test.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      /* useClass: process.env.NODE_ENV === 'development'
        ? DevService
        : process.env.NODE_ENV === 'test'
        ? TestService
        : ProdService, */
      useClass: DevService,
      imports: [ConfigModule],
    }),
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
