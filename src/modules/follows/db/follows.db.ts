import { MongooseModule } from '@nestjs/mongoose';
import { Follow, FollowSchema } from '../entities/follow.entity';

export const followsDbModule = MongooseModule.forFeature([
    { name: Follow.name, schema: FollowSchema },
]);
