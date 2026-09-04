import { Body, Controller, Post } from "@nestjs/common";
import { FormsService } from "./forms.service.js";
import { CreateFormDTO } from "./dto/create-form.dto.js";
import { ICreateResponse } from "./interfaces/create-response.interface.js";

@Controller("forms")
export class FormsController {
  constructor(private readonly formsService: FormsService) {}

  @Post()
  async create(@Body() dto: CreateFormDTO): Promise<ICreateResponse> {
    const form = await this.formsService.create(dto);
    return {
      id: form.id,
      status: 'confirmed',
      created_at: form.createdAt,
    }
  }
}
