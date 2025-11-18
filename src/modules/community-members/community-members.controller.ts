import { Controller } from '@nestjs/common';
import { CommunityMembersService } from './community-members.service';

@Controller('community-members')
export class CommunityMembersController {
    constructor(
        private readonly communityMembersService: CommunityMembersService,
    ) {}
}
