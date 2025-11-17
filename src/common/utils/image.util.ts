import sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import * as path from 'path';

export class ImageUtil {
    static async processAndSaveAvatar(fileBuffer: Buffer): Promise<string> {
        const filename = `${uuidv4()}.png`;
        const uploadDir = './public/uploads/users/avatars';

        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        const filePath = path.join(uploadDir, filename);

        await sharp(fileBuffer)
            .resize(400, 400, {
                fit: sharp.fit.cover,
                position: 'center',
                withoutEnlargement: false,
            })
            .toFormat('png')
            .toFile(filePath);

        return filename;
    }
}
