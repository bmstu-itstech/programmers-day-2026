import { Module } from "@nestjs/common";
import { FormsModule } from "./forms/forms.module.js";
import { SequelizeModule } from "@nestjs/sequelize";
import { Form } from "./forms/models/form.model.js";

@Module({
  imports: [
    SequelizeModule.forRoot({
      database: "progday",
      dialect: "sqlite",
      username: "progday",
      password: "s3cr3tpw",
      storage: ":memory:",
      models: [Form],
      synchronize: true,
    }),
    FormsModule,
  ],
})
export class AppModule {}
