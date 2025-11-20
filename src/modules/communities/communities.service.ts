import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Community } from './entities/community.entity';
import { Model } from 'mongoose';
import { ReturnObject } from 'src/common/return-object/return-object';

@Injectable()
export class CommunitiesService {
    constructor(
        @InjectModel(Community.name)
        private readonly communityModel: Model<Community>,
        private readonly returnObject: ReturnObject,
    ) {}

    async getAll(
        filter: { [key: string]: any },
        page: number = 1,
        limit: number = 10,
    ) {
        const skip = (page - 1) * limit;

        const [totalCount, communities] = await Promise.all([
            this.communityModel.find(filter).countDocuments(),
            this.communityModel.find(filter).skip(skip).limit(limit),
        ]);

        const communitiesObjects = communities.map((community) =>
            this.returnObject.community(community),
        );

        const totalPages = Math.ceil(totalCount / limit);

        return { communitiesObjects, totalCount, page, totalPages };
    }
}
