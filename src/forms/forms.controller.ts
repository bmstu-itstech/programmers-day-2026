import { Body, Controller, Post, Req } from "@nestjs/common";
import { FormsService } from "./forms.service.js";
import { CreateFormDTO } from "./dto/create-form.dto.js";

@Controller("forms")
export class FormsController {
  constructor(private readonly formsService: FormsService) {}

  @Post()
  async create(
    @Req() req: Request,
    @Body() dto: CreateFormDTO,
  ): Promise<number> {
    let form = await this.formsService.create(dto);
    return form.id;
  }
}
