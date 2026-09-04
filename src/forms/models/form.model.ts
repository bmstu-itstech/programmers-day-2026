import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({
  tableName: "forms",
  timestamps: true,
  underscored: true,
})
export class Form extends Model {
  @Column
  declare full_name: string;

  @Column
  declare is_bmstu_student: boolean;

  @Column({ type: DataType.STRING })
  declare university_name?: string | null;

  @Column({ type: DataType.STRING })
  declare passport?: string | null;

  @Column({ type: DataType.STRING })
  declare phone?: string | null;

  @Column
  declare email: string;

  @Column({ type: DataType.STRING })
  declare study_group?: string | null;

  @Column
  declare telegram: string;

  @Column
  declare activities: string;

  @Column({ type: DataType.STRING })
  declare source: string | null;
}
