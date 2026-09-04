import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Form } from "./models/form.model.js";
import { CreateFormDTO } from "./dto/create-form.dto.js";

@Injectable()
export class FormsService {
  constructor(
    @InjectModel(Form)
    private readonly formModel: typeof Form,
  ) {}

  create(dto: CreateFormDTO): Promise<Form> {
    return this.formModel.create({
      full_name: dto.full_name,
      is_bmstu_student: dto.is_bmstu_student,
      university_name: dto.university_name,
      passport: dto.passport,
      phone: dto.phone,
      email: dto.email,
      study_group: dto.study_group,
      telegram: dto.telegram,
      activities: dto.activities.join(";"),
      source: dto.source,
    });
  }
}
