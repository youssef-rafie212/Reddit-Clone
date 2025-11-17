import { Module } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { AdminsController } from './admins.controller';
import { adminsDbModule } from './db/admins.db.module';

@Module({
    imports: [adminsDbModule],
    controllers: [AdminsController],
    providers: [AdminsService],
})
export class AdminsModule {}
