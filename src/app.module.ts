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
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
    }),
    TypeOrmModule.forRootAsync({
      useClass: AppModule.getDatabaseService(),
      imports: [ConfigModule],
    }),
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {
  private static getDatabaseService() {
    const env = process.env.NODE_ENV || 'development';
    const services = {
      development: DevService,
      test: TestService,
      production: ProdService,
    };
    return services[env] || DevService;
  }
}
