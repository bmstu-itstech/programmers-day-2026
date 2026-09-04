import { Body, Controller, Post } from "@nestjs/common";
import { FormsService } from "./forms.service.js";
import { CreateFormDTO } from "./dto/create-form.dto.js";

@Controller("forms")
export class FormsController {
  constructor(private readonly formsService: FormsService) {}

  @Post()
  async create(@Body() dto: CreateFormDTO) {
    await this.formsService.create(dto);
  }
}
