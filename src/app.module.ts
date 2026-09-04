import { Module } from "@nestjs/common";
import { FormsModule } from "./forms/forms.module.js";
import { SequelizeModule } from "@nestjs/sequelize";
import { Form } from "./forms/models/form.model.js";

@Module({
  imports: [
    SequelizeModule.forRoot({
      database: "progday",
      dialect: "postgres",
      username: "progday",
      password: "s3cr3tpw",
      host: "localhost",
      port: 5432,
      models: [Form],
      synchronize: true,
      autoLoadModels: true,
    }),
    FormsModule,
  ],
})
export class AppModule {}
