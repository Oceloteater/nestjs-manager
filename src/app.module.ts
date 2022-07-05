import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const connect = require('../config.js');
console.log('connect', connect);

@Module({
  imports: [AuthModule, TasksModule, TypeOrmModule.forRoot(connect)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
