import { Body, Controller, Get, Post, Query, UploadedFile, UseInterceptors } from "@nestjs/common";
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from "@nestjs/swagger";
import { UploadImageService } from "./upload-image.service";
import { FileInterceptor } from "@nestjs/platform-express";

@ApiTags('Upload Image')
@Controller('upload-image')
export class UploadImageController {
    constructor(
        private readonly uploadImageService: UploadImageService
    ) { }

    @Post()
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
        const result = await this.uploadImageService.uploadImage(file, id);
        return result;
    }

    @Get('view-url')
    async getViewUrl(@Query('imageName') imageName: string) {
        const result = await this.uploadImageService.generateImageUrl(imageName);
        return {
            success: true,
            message: 'View URL generated successfully',
            data: result,
        }
    }
}
