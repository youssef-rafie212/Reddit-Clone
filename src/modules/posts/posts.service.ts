import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
    constructor(
        @InjectModel(Post.name) private readonly postModel: Model<Post>,
    ) {}

    async getAll(
        filter: { [key: string]: any },
        page: number = 1,
        limit: number = 10,
    ) {
        const skip = (page - 1) * limit;

        const [totalCount, posts] = await Promise.all([
            this.postModel.find(filter).countDocuments(),
            this.postModel.find(filter).skip(skip).limit(limit),
        ]);

        const totalPages = Math.ceil(totalCount / limit);

        return { posts, totalCount, page, totalPages };
    }
}
