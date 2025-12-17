import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import doetenv from 'dotenv';
import chalk from 'chalk';

const TIMEZONE: string = '-03:00';
const ENABLECORS: boolean = true;
const BASE_URL: string = 'http://localhost:';

async function bootstrap() {
  doetenv.config();
  const app = await NestFactory.create(AppModule);

  swaggerSetup(app);

  await app.listen(process.env.PORT ?? 3000);

  logStartupMessage(Number(process.env.PORT ?? 3000));
}

bootstrap();

function swaggerSetup(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('Generation drugstore API')
    .setDescription('API responsible for managing drugstore products')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/swagger', app, document);
}

function logStartupMessage(port: number) {
  const logger: Logger = new Logger('Startup');

  console.log(
    '\n' + chalk.bold.cyan('╔════════════════════════════════════════╗'),
  );
  console.log(
    chalk.bold.cyan('║') +
    chalk.bold.white('   🚀 SERVER STARTED SUCCESSFULLY! 🚀   ') +
    chalk.bold.cyan('║'),
  );
  console.log(
    chalk.bold.cyan('╚════════════════════════════════════════╝') + '\n',
  );

  console.log(
    chalk.bold.green('✓') +
    chalk.white(' Application: ') +
    chalk.bold.yellow('Generation Drugstore API'),
  );
  console.log(
    chalk.bold.green('✓') + chalk.white(' Port: ') + chalk.bold.yellow(port),
  );
  console.log(
    chalk.bold.green('✓') +
    chalk.white(' URL: ') +
    chalk.bold.blue.underline(`${BASE_URL}${port}`),
  );
  console.log(
    chalk.bold.green('✓') +
    chalk.white(' Environment: ') +
    chalk.bold.magenta(process.env.NODE_ENV || 'development'),
  );
  console.log(
    chalk.bold.green('✓') +
    chalk.white(' CORS: ') +
    chalk.bold.green(ENABLECORS ? 'Enabled' : 'Disabled'),
  );
  console.log(
    chalk.bold.green('✓') +
    chalk.white(' Timezone: ') +
    chalk.bold.cyan(TIMEZONE),
  );

  console.log('\n' + chalk.gray('────────────────────────────────────────'));
  console.log(
    chalk.bold.white('  Press ') +
    chalk.bold.red('CTRL+C') +
    chalk.bold.white(' to stop the server'),
  );
  console.log(chalk.gray('────────────────────────────────────────') + '\n');

  logger.log(chalk.green('Server ready to receive requests!'));
}