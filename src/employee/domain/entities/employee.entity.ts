
import { Branch, EmployeeRole } from 'src/shared/enum/employee/employee.enum'
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('employee')
export class Employee {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ unique: true })
  pkg_id_member: string

  @Column({ unique: true, nullable: true })
  email: string

  @Column({ nullable: false })
  firstname: string

  @Column({ nullable: false })
  lastname: string

  @Column({
    type: 'enum',
    enum: EmployeeRole,
    default: EmployeeRole.MECHANIC,
    nullable: false,
  })
  role: EmployeeRole

  @Column({ unique: true, nullable: false })
  mirai_id: string

  @Column({ nullable: false })
  password: string // Hashed password

  @Column({ nullable: true })
  mirai_password: string
  
  @Column({ nullable: true, type: 'timestamp with time zone' })
  mirai_password_updated_at: Date

  @Column({ nullable: true })
  pin_code: string

  @Column({ type: 'enum', nullable: false, enum: Branch, default: Branch.HEAD_OFFICE })
  branch: Branch

  @Column({ nullable: false ,default: true})
  is_active: boolean

  @Column({ nullable: false ,type:'uuid'})
  created_by: string

  @CreateDateColumn({ type: 'timestamp with time zone' })
  created_at: Date

  @Column({ nullable: true ,type:'uuid'})
  updated_by: string

  @UpdateDateColumn({ type: 'timestamp with time zone', nullable: true })
  updated_at: Date
}
