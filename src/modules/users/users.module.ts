import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { usersDbModule } from './db/users.db.module';

@Module({
    imports: [usersDbModule],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService, usersDbModule],
})
export class UsersModule {}
