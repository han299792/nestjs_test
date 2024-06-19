import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from './global/config/database.module';
import { DatabaseService } from './global/config/database.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule, 
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [DatabaseModule],
      useClass: DatabaseService,
      inject: [DatabaseService],
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
