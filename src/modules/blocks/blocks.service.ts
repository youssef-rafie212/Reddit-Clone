import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Block } from './entities/block.entity';
import { Model } from 'mongoose';

@Injectable()
export class BlocksService {
    constructor(
        @InjectModel(Block.name) private readonly blockModel: Model<Block>,
    ) {}

    async getAll(
        filter: { [key: string]: any },
        page: number = 1,
        limit: number = 10,
    ) {
        const skip = (page - 1) * limit;

        const [totalCount, blocks] = await Promise.all([
            this.blockModel.find(filter).countDocuments(),
            this.blockModel.find(filter).skip(skip).limit(limit),
        ]);

        const totalPages = Math.ceil(totalCount / limit);

        return { blocks, totalCount, page, totalPages };
    }
}
