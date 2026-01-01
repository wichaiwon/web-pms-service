import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class UploadImageService {
    private readonly s3: S3Client
    private readonly bucketName = 'pkg-pms';
    private readonly region = 'ap-southeast-1';
    constructor(
    ) { 
        const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } = process.env;
        if(!AWS_ACCESS_KEY_ID || !AWS_SECRET_ACCESS_KEY) {
            throw new NotFoundException('AWS credentials are not set in environment variables');
        }
        this.s3 = new S3Client({
            region: this.region,
            credentials: {
                accessKeyId: AWS_ACCESS_KEY_ID,
                secretAccessKey: AWS_SECRET_ACCESS_KEY,
            },
        });
    }
    async uploadImage(file: Express.Multer.File , id: string){
        if(!file) {
            throw new NotFoundException('File not found');
        }
        const imageName = `${Date.now()}-${id}`;
        const key = `web-pms-service/${imageName}`;

        const uploadParams = new PutObjectCommand({
            Bucket: this.bucketName,
            Key: key,
            Body: file.buffer,
            ContentType: file.mimetype,
        });
        await this.s3.send(uploadParams);

        const imageUrl = `https://${this.bucketName}.s3.${this.region}.amazonaws.com/${key}`;
        return {
            imageUrl,
            imageName,
            contentType: file.mimetype,
            size: file.size,
        }
    }
}
