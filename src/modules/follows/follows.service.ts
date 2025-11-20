import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Follow } from './entities/follow.entity';
import { Model } from 'mongoose';

@Injectable()
export class FollowsService {
    constructor(
        @InjectModel(Follow.name) private readonly followModel: Model<Follow>,
    ) {}

    async getAll(
        filter: { [key: string]: any },
        page: number = 1,
        limit: number = 10,
    ) {
        const skip = (page - 1) * limit;

        const [totalCount, follows] = await Promise.all([
            this.followModel.find(filter).countDocuments(),
            this.followModel.find(filter).skip(skip).limit(limit),
        ]);

        const totalPages = Math.ceil(totalCount / limit);

        return { follows, totalCount, page, totalPages };
    }
}
