import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Matches,
} from "class-validator";

const GROUP_REGEX =
  /^((((ИУ|ИБМ|МТ|СМ|БМТ|РЛ|Э|РК|ФН|Л|СГН|РКТ|АК|ПС|РТ|ЛТ|К|ЮР|МК|ИУК)[1-9]\d?)|(ИБМ|ЮР(\.ДК)?))(К)?[ИЦ]?-(((1[0-2])|(\d))((\d)|(\.\d\d+))([АМБ]?(В)?)))$/;
const TELEGRAM_REGEX = /^@[A-z0-9_]{5,32}$/;
const PASSPORT_REGEX = /^\d{4} \d{6}$/;

export class CreateFormDTO {
  @IsString()
  @IsNotEmpty()
  readonly full_name: string;

  @IsBoolean()
  readonly is_bmstu_student: boolean;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly university_name: string | null;

  @IsOptional()
  @IsString()
  @Matches(PASSPORT_REGEX)
  readonly passport: string | null;

  @IsOptional()
  @IsString()
  @IsPhoneNumber("RU")
  readonly phone: string | null;

  @IsEmail()
  readonly email: string;

  @IsOptional()
  @IsString()
  @Matches(GROUP_REGEX)
  readonly study_group: string;

  @IsString()
  @IsNotEmpty()
  @Matches(TELEGRAM_REGEX)
  readonly telegram: string;

  @IsArray()
  @IsString({ each: true })
  readonly activities: string[];

  @IsString()
  @IsOptional()
  readonly source: string | null;
}
