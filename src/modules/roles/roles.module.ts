import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { rolesDbModule } from './db/roles.db.module';

@Module({
    imports: [rolesDbModule],
    controllers: [RolesController],
    providers: [RolesService],
})
export class RolesModule {}
