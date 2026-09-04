import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({
  tableName: "forms",
  timestamps: true,
  underscored: true,
})
export class Form extends Model {
  @Column
  full_name: string;

  @Column
  is_bmstu_student: boolean;

  @Column({ type: DataType.STRING })
  university_name?: string | null;

  @Column({ type: DataType.STRING })
  passport?: string | null;

  @Column({ type: DataType.STRING })
  phone?: string | null;

  @Column({ type: DataType.STRING })
  email?: string | null;

  @Column({ type: DataType.STRING })
  study_group?: string | null;

  @Column
  telegram: string;

  @Column
  activities: string;

  @Column({ type: DataType.STRING })
  source: string | null;
}
