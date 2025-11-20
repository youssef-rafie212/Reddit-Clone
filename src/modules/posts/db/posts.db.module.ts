import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from '../entities/post.entity';

export const postsDbModule = MongooseModule.forFeature([
    { name: Post.name, schema: PostSchema },
]);
