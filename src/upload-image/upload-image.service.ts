import { GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class UploadImageService {
    private readonly s3: S3Client
    private readonly bucketName = 'pkg-pms';
    private readonly region = 'ap-southeast-1';
    constructor(
    ) {
        const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } = process.env;
        if (!AWS_ACCESS_KEY_ID || !AWS_SECRET_ACCESS_KEY) {
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
    async uploadImage(file: Express.Multer.File, id: string) {
        if (!file) {
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

    async generateUploadUrl(imageName: string, contentType: string) {
        const key = `web-pms-service/${imageName}`;
        const commands = new PutObjectCommand({
            Bucket: this.bucketName,
            Key: key,
            ContentType: contentType,
        });
        const uploadUrl = await getSignedUrl(this.s3, commands, { expiresIn: 120 });
        const fileUrl = `https://${this.bucketName}.s3.${this.region}.amazonaws.com/${key}`;

        return {
            uploadUrl,
            fileUrl,
        }
    }

    async generateImageUrl(imageName: string) {
        const key = `web-pms-service/${imageName}`;
        const command = new GetObjectCommand({
            Bucket: this.bucketName,
            Key: key,
        });
        const viewUrl = await getSignedUrl(this.s3, command, { expiresIn: 3600 });
        return {
            viewUrl,
        };
    }
}
