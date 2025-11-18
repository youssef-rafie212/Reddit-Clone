import { Controller, Get, Post, Patch, Delete } from '@nestjs/common';
import { CommunitiesService } from './communities.service';

@Controller('communities')
export class CommunitiesController {
    constructor(private readonly communitiesService: CommunitiesService) {}

    @Post()
    create() {}

    @Get()
    findAll() {}

    @Get(':id')
    findOne() {}

    @Patch(':id')
    update() {}

    @Delete(':id')
    remove() {}
}
