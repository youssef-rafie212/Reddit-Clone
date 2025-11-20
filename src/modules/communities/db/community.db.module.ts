import { MongooseModule } from '@nestjs/mongoose';
import { Community, CommunitySchema } from '../entities/community.entity';

export const communitiesDbModule = MongooseModule.forFeature([
    { name: Community.name, schema: CommunitySchema },
]);
