import { Module } from '@nestjs/common';
import { CommunitiesService } from './communities.service';
import { CommunitiesController } from './communities.controller';
import { communitiesDbModule } from './db/community.db.module';

@Module({
    imports: [communitiesDbModule],
    controllers: [CommunitiesController],
    providers: [CommunitiesService],
    exports: [CommunitiesService],
})
export class CommunitiesModule {}
