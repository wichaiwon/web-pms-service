import { Body, Controller, Get, Post, Query, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiQuery, ApiTags } from "@nestjs/swagger";
import { UploadImageService } from "./upload-image.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { JwtAuthGuard } from "src/employee/infrastructure/services/jwt-auth.guard";

@ApiTags('s3 image')
@Controller('s3')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class UploadImageController {
    constructor(
        private readonly uploadImageService: UploadImageService
    ) { }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    @ApiOperation({ summary: 'Upload an image to AWS S3' })
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
                id: {
                    type: 'string',
                },
            },
        },
    })
    async uploadImage(
        @UploadedFile() file: Express.Multer.File,
        @Body('id') id: string
    ) {
        return await this.uploadImageService.uploadImage(file, id);
        
    }

    @Get('presigned-url')
    @ApiOperation({ summary: 'Generate a presigned upload URL for AWS S3' })
    @ApiQuery({ name: 'imageName', type: 'string' })
    @ApiQuery({ name: 'contentType', type: 'string' })
    async generatePresignedUrl(
        @Query('imageName') imageName: string,
        @Query('contentType') contentType: string
    ) {
       return await this.uploadImageService.generateUploadUrl(imageName, contentType);
       
    }

    @Get('view-url')
    async getViewUrl(@Query('imageName') imageName: string) {
        return await this.uploadImageService.generateImageUrl(imageName);
        
    }
}
