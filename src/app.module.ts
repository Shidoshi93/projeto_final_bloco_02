import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { DevService } from './data/service/dev.service';
import { ProdService } from './data/service/prod.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      useClass: process.env.NODE_ENV === 'development'
        ? DevService
        : ProdService,
      imports: [ConfigModule],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
