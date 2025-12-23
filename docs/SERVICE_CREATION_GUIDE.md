# 📘 คู่มือการสร้าง Service ใหม่ใน web-pms-service

## 🏗️ สถาปัตยกรรมโปรเจกต์ (Project Architecture)

โปรเจกต์นี้ใช้ **Clean Architecture** ร่วมกับ **Domain-Driven Design (DDD)** บน **NestJS Framework**

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          Clean Architecture Layers                           │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   ┌────────────────────────────────────────────────────────────────────┐    │
│   │  INTERFACES LAYER (interfaces/)                                     │    │
│   │  - Controllers: รับ HTTP Request                                    │    │
│   │  - DTOs: Validate ข้อมูล Input/Output                               │    │
│   └────────────────────────────────────────────────────────────────────┘    │
│                                    │                                         │
│                                    ▼                                         │
│   ┌────────────────────────────────────────────────────────────────────┐    │
│   │  APPLICATION LAYER (application/)                                   │    │
│   │  - Service: Orchestrator/Facade                                     │    │
│   │  - Commands: Write Operations (Create/Update/Delete)                │    │
│   │  - Queries: Read Operations (Get/List/Search)                       │    │
│   └────────────────────────────────────────────────────────────────────┘    │
│                                    │                                         │
│                                    ▼                                         │
│   ┌────────────────────────────────────────────────────────────────────┐    │
│   │  INFRASTRUCTURE LAYER (infrastructure/)                             │    │
│   │  - Repositories: Data Access Implementation (TypeORM)               │    │
│   │  - Services: External Services (Auth, Email, etc.)                  │    │
│   └────────────────────────────────────────────────────────────────────┘    │
│                                    │                                         │
│                                    ▼                                         │
│   ┌────────────────────────────────────────────────────────────────────┐    │
│   │  DOMAIN LAYER (domain/)                                             │    │
│   │  - Entities: TypeORM Entities (Database Schema)                     │    │
│   │  - Interfaces: Contracts (Repository/Service Interfaces)            │    │
│   └────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 📂 โครงสร้างโฟลเดอร์ (Folder Structure)

```
src/
├── app.module.ts                    # Main Application Module
├── main.ts                          # Application Entry Point
├── common/                          # Shared utilities
│   ├── config/                      # Configuration files
│   ├── database/                    # Database module
│   ├── filters/                     # Exception filters
│   └── interceptors/                # Response interceptors
├── shared/                          # Shared enums, types
│   └── enum/                        # Enum definitions
│
└── [feature-module]/                # Feature Module (e.g., vehicle-service-review)
    ├── [feature].module.ts          # Module definition
    ├── domain/
    │   ├── entities/
    │   │   └── [entity].entity.ts   # TypeORM Entity
    │   └── interfaces/
    │       ├── [entity].repository.interface.ts
    │       └── [entity].service.interface.ts
    ├── application/
    │   ├── [feature].service.ts     # Application Service
    │   ├── commands/                # Write operations
    │   │   ├── create-[entity].use-case.ts
    │   │   └── update-[entity].use-case.ts
    │   └── queries/                 # Read operations
    │       └── get-[entity].use-case.ts
    ├── infrastructure/
    │   └── repositories/
    │       └── [entity].repository.ts
    └── interfaces/
        ├── controllers/
        │   └── [entity].controller.ts
        └── dtos/
            ├── create-[entity].dto.ts
            ├── update-[entity].dto.ts
            └── [entity].dto.ts
```

---

## 🔄 Data Flow (การไหลของข้อมูล)

```
HTTP Request
     │
     ▼
┌─────────────┐   DTO Validation    ┌─────────────────┐
│  Controller │ ◄────────────────── │   DTO (Input)   │
└─────────────┘                     └─────────────────┘
     │
     │ เรียก Service
     ▼
┌─────────────┐
│   Service   │ (Orchestrator)
└─────────────┘
     │
     │ เรียก Use Case
     ▼
┌─────────────┐
│  Use Case   │ (Command/Query)
└─────────────┘
     │
     │ เรียก Repository (ผ่าน Interface)
     ▼
┌─────────────┐
│ Repository  │ (TypeORM Implementation)
└─────────────┘
     │
     │ Query/Insert/Update
     ▼
┌─────────────┐
│  Database   │ (PostgreSQL)
└─────────────┘
```

---

## 📋 ขั้นตอนการสร้าง Service ใหม่ (Step-by-Step)

### ตัวอย่าง: สร้าง `vehicle-service-review-detail` Module

---

### **Step 1: สร้าง Entity (Domain Layer)**

📁 `src/vehicle-service-review-detail/domain/entities/vehicle-service-review-detail.entity.ts`

```typescript
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { VehicleServiceReview } from 'src/vehicle-service-review/domain/entities/vehicle-service-review.entity';

@Entity('vehicle_service_review_detail')
export class VehicleServiceReviewDetail {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    // Foreign Key เชื่อมกับ VehicleServiceReview
    @Column({ type: 'uuid', nullable: false })
    vehicle_service_review_id: string;

    // Relationship
    @ManyToOne(() => VehicleServiceReview)
    @JoinColumn({ name: 'vehicle_service_review_id' })
    vehicleServiceReview: VehicleServiceReview;

    // ... other columns

    @Column({ type: 'boolean', default: true })
    is_active: boolean;

    @CreateDateColumn({ type: 'timestamp with time zone' })
    created_at: Date;

    @Column({ type: 'uuid', nullable: false })
    created_by: string;

    @UpdateDateColumn({ type: 'timestamp with time zone' })
    updated_at: Date;

    @Column({ type: 'uuid', nullable: true })
    updated_by: string;
}
```

---

### **Step 2: สร้าง Interface (Domain Layer)**

📁 `src/vehicle-service-review-detail/domain/interfaces/vehicle-service-review-detail.repository.interface.ts`

```typescript
import { VehicleServiceReviewDetailDto } from '../../interfaces/dtos/vehicle-service-review-detail.dto';
import { CreateVehicleServiceReviewDetailDto } from '../../interfaces/dtos/create-vehicle-service-review-detail.dto';

export interface IVehicleServiceReviewDetailRepositoryInterface {
    create(createDto: CreateVehicleServiceReviewDetailDto): Promise<VehicleServiceReviewDetailDto>;
    findByVehicleServiceReviewId(vehicleServiceReviewId: string): Promise<VehicleServiceReviewDetailDto[]>;
    findById(id: string): Promise<VehicleServiceReviewDetailDto | null>;
    // ... other methods
}
```

📁 `src/vehicle-service-review-detail/domain/interfaces/vehicle-service-review-detail.service.interface.ts`

```typescript
import { VehicleServiceReviewDetailDto } from '../../interfaces/dtos/vehicle-service-review-detail.dto';
import { CreateVehicleServiceReviewDetailDto } from '../../interfaces/dtos/create-vehicle-service-review-detail.dto';

export interface IVehicleServiceReviewDetailServiceInterface {
    create(createDto: CreateVehicleServiceReviewDetailDto): Promise<VehicleServiceReviewDetailDto>;
    findByVehicleServiceReviewId(vehicleServiceReviewId: string): Promise<VehicleServiceReviewDetailDto[]>;
    // ... other methods
}
```

---

### **Step 3: สร้าง DTOs (Interfaces Layer)**

📁 `src/vehicle-service-review-detail/interfaces/dtos/create-vehicle-service-review-detail.dto.ts`

```typescript
import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateVehicleServiceReviewDetailDto {
    @ApiProperty({ description: 'Vehicle Service Review ID', example: '85dd4432-e679-4f54-a878-89d2dc2b6cba' })
    @IsUUID()
    @IsNotEmpty()
    vehicle_service_review_id: string;

    // ... other fields

    @ApiProperty({ description: 'Created by user ID' })
    @IsUUID()
    @IsNotEmpty()
    created_by: string;
}
```

📁 `src/vehicle-service-review-detail/interfaces/dtos/vehicle-service-review-detail.dto.ts`

```typescript
export class VehicleServiceReviewDetailDto {
    id: string;
    vehicle_service_review_id: string;
    // ... other fields
    is_active: boolean;
    created_at: Date;
    created_by: string;
    updated_at: Date;
    updated_by: string;
}
```

---

### **Step 4: สร้าง Repository (Infrastructure Layer)**

📁 `src/vehicle-service-review-detail/infrastructure/repositories/vehicle-service-review-detail.repository.ts`

```typescript
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VehicleServiceReviewDetail } from '../../domain/entities/vehicle-service-review-detail.entity';
import { IVehicleServiceReviewDetailRepositoryInterface } from '../../domain/interfaces/vehicle-service-review-detail.repository.interface';
import { CreateVehicleServiceReviewDetailDto } from '../../interfaces/dtos/create-vehicle-service-review-detail.dto';
import { VehicleServiceReviewDetailDto } from '../../interfaces/dtos/vehicle-service-review-detail.dto';

@Injectable()
export class VehicleServiceReviewDetailRepository implements IVehicleServiceReviewDetailRepositoryInterface {
    constructor(
        @InjectRepository(VehicleServiceReviewDetail)
        private readonly repository: Repository<VehicleServiceReviewDetail>,
    ) {}

    async create(createDto: CreateVehicleServiceReviewDetailDto): Promise<VehicleServiceReviewDetailDto> {
        const entity = this.repository.create(createDto);
        return await this.repository.save(entity);
    }

    async findByVehicleServiceReviewId(vehicleServiceReviewId: string): Promise<VehicleServiceReviewDetailDto[]> {
        return await this.repository.find({
            where: { vehicle_service_review_id: vehicleServiceReviewId },
        });
    }

    async findById(id: string): Promise<VehicleServiceReviewDetailDto | null> {
        return await this.repository.findOneBy({ id });
    }
}
```

---

### **Step 5: สร้าง Use Cases (Application Layer)**

📁 `src/vehicle-service-review-detail/application/commands/create-vehicle-service-review-detail.use-case.ts`

```typescript
import { Inject, Injectable } from '@nestjs/common';
import type { IVehicleServiceReviewDetailRepositoryInterface } from '../../domain/interfaces/vehicle-service-review-detail.repository.interface';
import { CreateVehicleServiceReviewDetailDto } from '../../interfaces/dtos/create-vehicle-service-review-detail.dto';
import { VehicleServiceReviewDetailDto } from '../../interfaces/dtos/vehicle-service-review-detail.dto';

@Injectable()
export class CreateVehicleServiceReviewDetailUseCase {
    constructor(
        @Inject('IVehicleServiceReviewDetailRepository')
        private readonly repository: IVehicleServiceReviewDetailRepositoryInterface,
    ) {}

    async execute(createDto: CreateVehicleServiceReviewDetailDto): Promise<VehicleServiceReviewDetailDto> {
        return await this.repository.create(createDto);
    }
}
```

📁 `src/vehicle-service-review-detail/application/queries/get-vehicle-service-review-detail.use-case.ts`

```typescript
import { Inject, Injectable } from '@nestjs/common';
import type { IVehicleServiceReviewDetailRepositoryInterface } from '../../domain/interfaces/vehicle-service-review-detail.repository.interface';
import { VehicleServiceReviewDetailDto } from '../../interfaces/dtos/vehicle-service-review-detail.dto';

@Injectable()
export class GetVehicleServiceReviewDetailUseCase {
    constructor(
        @Inject('IVehicleServiceReviewDetailRepository')
        private readonly repository: IVehicleServiceReviewDetailRepositoryInterface,
    ) {}

    async executeByReviewId(vehicleServiceReviewId: string): Promise<VehicleServiceReviewDetailDto[]> {
        return await this.repository.findByVehicleServiceReviewId(vehicleServiceReviewId);
    }

    async executeById(id: string): Promise<VehicleServiceReviewDetailDto | null> {
        return await this.repository.findById(id);
    }
}
```

---

### **Step 6: สร้าง Service (Application Layer)**

📁 `src/vehicle-service-review-detail/application/vehicle-service-review-detail.service.ts`

```typescript
import { Injectable } from '@nestjs/common';
import { IVehicleServiceReviewDetailServiceInterface } from '../domain/interfaces/vehicle-service-review-detail.service.interface';
import { CreateVehicleServiceReviewDetailUseCase } from './commands/create-vehicle-service-review-detail.use-case';
import { GetVehicleServiceReviewDetailUseCase } from './queries/get-vehicle-service-review-detail.use-case';
import { CreateVehicleServiceReviewDetailDto } from '../interfaces/dtos/create-vehicle-service-review-detail.dto';
import { VehicleServiceReviewDetailDto } from '../interfaces/dtos/vehicle-service-review-detail.dto';

@Injectable()
export class VehicleServiceReviewDetailService implements IVehicleServiceReviewDetailServiceInterface {
    constructor(
        private readonly createUseCase: CreateVehicleServiceReviewDetailUseCase,
        private readonly getUseCase: GetVehicleServiceReviewDetailUseCase,
    ) {}

    async create(createDto: CreateVehicleServiceReviewDetailDto): Promise<VehicleServiceReviewDetailDto> {
        return await this.createUseCase.execute(createDto);
    }

    async findByVehicleServiceReviewId(vehicleServiceReviewId: string): Promise<VehicleServiceReviewDetailDto[]> {
        return await this.getUseCase.executeByReviewId(vehicleServiceReviewId);
    }
}
```

---

### **Step 7: สร้าง Controller (Interfaces Layer)**

📁 `src/vehicle-service-review-detail/interfaces/controllers/vehicle-service-review-detail.controller.ts`

```typescript
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/employee/infrastructure/services/jwt-auth.guard';
import { VehicleServiceReviewDetailService } from '../../application/vehicle-service-review-detail.service';
import { CreateVehicleServiceReviewDetailDto } from '../dtos/create-vehicle-service-review-detail.dto';

@ApiTags('Vehicle Service Review Details')
@Controller('vehicle-service-review-detail')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class VehicleServiceReviewDetailController {
    constructor(
        private readonly service: VehicleServiceReviewDetailService,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create vehicle service review detail' })
    async create(@Body() createDto: CreateVehicleServiceReviewDetailDto) {
        return await this.service.create(createDto);
    }

    @Get('by-review/:vehicleServiceReviewId')
    @ApiOperation({ summary: 'Get details by vehicle service review ID' })
    async findByReviewId(@Param('vehicleServiceReviewId') vehicleServiceReviewId: string) {
        return await this.service.findByVehicleServiceReviewId(vehicleServiceReviewId);
    }
}
```

---

### **Step 8: สร้าง Module**

📁 `src/vehicle-service-review-detail/vehicle-service-review-detail.module.ts`

```typescript
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleServiceReviewDetail } from './domain/entities/vehicle-service-review-detail.entity';
import { VehicleServiceReviewDetailController } from './interfaces/controllers/vehicle-service-review-detail.controller';
import { VehicleServiceReviewDetailService } from './application/vehicle-service-review-detail.service';
import { CreateVehicleServiceReviewDetailUseCase } from './application/commands/create-vehicle-service-review-detail.use-case';
import { GetVehicleServiceReviewDetailUseCase } from './application/queries/get-vehicle-service-review-detail.use-case';
import { VehicleServiceReviewDetailRepository } from './infrastructure/repositories/vehicle-service-review-detail.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([VehicleServiceReviewDetail]),
    ],
    controllers: [VehicleServiceReviewDetailController],
    providers: [
        VehicleServiceReviewDetailService,
        CreateVehicleServiceReviewDetailUseCase,
        GetVehicleServiceReviewDetailUseCase,
        {
            provide: 'IVehicleServiceReviewDetailRepository',
            useClass: VehicleServiceReviewDetailRepository,
        },
    ],
    exports: [VehicleServiceReviewDetailService],
})
export class VehicleServiceReviewDetailModule {}
```

---

### **Step 9: ลงทะเบียน Entity ใน Database Module**

📁 `src/common/database/database.module.ts`

```typescript
import { VehicleServiceReviewDetail } from 'src/vehicle-service-review-detail/domain/entities/vehicle-service-review-detail.entity';

// เพิ่ม Entity ใน entities array
entities: [
    Employee,
    VehicleServiceReview,
    VehicleServiceReviewDetail,  // ← เพิ่มตรงนี้
],
```

---

### **Step 10: Import Module ใน App Module**

📁 `src/app.module.ts`

```typescript
import { VehicleServiceReviewDetailModule } from './vehicle-service-review-detail/vehicle-service-review-detail.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        DatabaseModule,
        EmployeeModule,
        VehicleServiceReviewModule,
        VehicleServiceReviewDetailModule,  // ← เพิ่มตรงนี้
    ],
})
export class AppModule {}
```

---

## 🔗 ความสัมพันธ์ระหว่าง Entities

### vehicle-service-review-detail และ step-one, step-two, step-three, step-four

```
┌─────────────────────────────────────┐
│       VehicleServiceReview          │
│  (ข้อมูลหลักของ Service Review)     │
│  - id (PK)                          │
│  - appointment_running              │
│  - customer_info                    │
│  - vehicle_info                     │
└─────────────────────────────────────┘
                    │
                    │ 1:N (One-to-Many)
                    ▼
┌─────────────────────────────────────┐
│    VehicleServiceReviewDetail       │
│  (รายละเอียดของ Service Review)     │
│  - id (PK)                          │
│  - vehicle_service_review_id (FK)   │ ──► เชื่อมกับ VehicleServiceReview
│  - detail_info                      │
└─────────────────────────────────────┘
                    │
        ┌───────────┼───────────┬───────────┐
        │           │           │           │
        ▼           ▼           ▼           ▼
┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐
│   StepOne   │ │   StepTwo   │ │  StepThree  │ │  StepFour   │
│  - id (PK)  │ │  - id (PK)  │ │  - id (PK)  │ │  - id (PK)  │
│  - v_s_r_id │ │  - v_s_r_id │ │  - v_s_r_id │ │  - v_s_r_id │
│  - step_data│ │  - step_data│ │  - step_data│ │  - step_data│
└─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘

(v_s_r_id = vehicle_service_review_id)
```

### ตัวอย่าง Entity สำหรับ StepOne

```typescript
@Entity('step_one')
export class StepOne {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'uuid', nullable: false })
    vehicle_service_review_id: string;

    @ManyToOne(() => VehicleServiceReview)
    @JoinColumn({ name: 'vehicle_service_review_id' })
    vehicleServiceReview: VehicleServiceReview;

    // Step-specific fields
    @Column({ type: 'varchar', nullable: true })
    step_one_field_1: string;

    @Column({ type: 'boolean', default: false })
    is_completed: boolean;

    // Common fields
    @CreateDateColumn({ type: 'timestamp with time zone' })
    created_at: Date;

    @Column({ type: 'uuid', nullable: false })
    created_by: string;
}
```

---

## 📝 สรุป Checklist การสร้าง Service ใหม่

| ลำดับ | Task | Layer | File Location |
|-------|------|-------|---------------|
| 1 | สร้าง Entity | Domain | `domain/entities/[name].entity.ts` |
| 2 | สร้าง Repository Interface | Domain | `domain/interfaces/[name].repository.interface.ts` |
| 3 | สร้าง Service Interface | Domain | `domain/interfaces/[name].service.interface.ts` |
| 4 | สร้าง DTOs | Interfaces | `interfaces/dtos/*.dto.ts` |
| 5 | สร้าง Repository | Infrastructure | `infrastructure/repositories/[name].repository.ts` |
| 6 | สร้าง Use Cases (Commands) | Application | `application/commands/*.use-case.ts` |
| 7 | สร้าง Use Cases (Queries) | Application | `application/queries/*.use-case.ts` |
| 8 | สร้าง Service | Application | `application/[name].service.ts` |
| 9 | สร้าง Controller | Interfaces | `interfaces/controllers/[name].controller.ts` |
| 10 | สร้าง Module | Root | `[name].module.ts` |
| 11 | ลงทะเบียน Entity | Common | `common/database/database.module.ts` |
| 12 | Import Module | App | `app.module.ts` |

---

## 🎯 Best Practices

1. **Naming Convention**: ใช้ kebab-case สำหรับ folder และ file names
2. **Single Responsibility**: 1 Use Case = 1 Operation
3. **Dependency Injection**: ใช้ Interface + DI Token
4. **Validation**: ใช้ class-validator ใน DTOs เสมอ
5. **Documentation**: ใช้ Swagger decorators ทุก endpoint
6. **Error Handling**: ใช้ NestJS built-in exceptions
7. **Type Safety**: ใช้ TypeScript types/interfaces ให้ครบ
