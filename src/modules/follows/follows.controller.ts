import { Controller, Get, Post, Body, Patch, Delete } from '@nestjs/common';
import { FollowsService } from './follows.service';

@Controller('follows')
export class FollowsController {
    constructor(private readonly followsService: FollowsService) {}

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
