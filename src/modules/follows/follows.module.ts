import { Module } from '@nestjs/common';
import { FollowsService } from './follows.service';
import { FollowsController } from './follows.controller';
import { followsDbModule } from './db/follows.db';

@Module({
    imports: [followsDbModule],
    controllers: [FollowsController],
    providers: [FollowsService],
    exports: [FollowsService, followsDbModule],
})
export class FollowsModule {}
