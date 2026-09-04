import { Module } from "@nestjs/common";
import { FormsModule } from "./forms/forms.module.js";
import { SequelizeModule } from "@nestjs/sequelize";
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Form } from "./forms/models/form.model.js";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (cfg: ConfigService) => ({
        dialect: 'postgres',
        host: cfg.get('DB_HOST'),
        port: cfg.get('DB_PORT'),
        username: cfg.get('DB_USERNAME'),
        password: cfg.get('DB_PASSWORD'),
        database: cfg.get('DB_DATABASE'),
        models: [Form],
      }),
      inject: [ConfigService],
    }),
    FormsModule,
  ],
})
export class AppModule {}
