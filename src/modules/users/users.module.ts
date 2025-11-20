import { Module, forwardRef } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { usersDbModule } from './db/users.db.module';
import { UserTokensModule } from '../user-tokens/user-tokens.module';
import { AuthModule } from '../auth/auth.module';
import { FollowsModule } from '../follows/follows.module';
import { CommunitiesModule } from '../communities/communities.module';
import { PostsModule } from '../posts/posts.module';
import { BlocksModule } from '../blocks/blocks.module';

@Module({
    imports: [
        usersDbModule,
        UserTokensModule,
        forwardRef(() => AuthModule),
        FollowsModule,
        CommunitiesModule,
        PostsModule,
        BlocksModule,
    ],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService, usersDbModule],
})
export class UsersModule {}
