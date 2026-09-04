import { Module } from "@nestjs/common";
import { FormsService } from "./forms.service.js";
import { SequelizeModule } from "@nestjs/sequelize";
import { Form } from "./models/form.model.js";
import { FormsController } from "./forms.controller.js";

@Module({
  imports: [SequelizeModule.forFeature([Form])],
  providers: [FormsService],
  controllers: [FormsController],
})
export class FormsModule {}
