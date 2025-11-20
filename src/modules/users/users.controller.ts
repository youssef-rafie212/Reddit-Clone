import {
    Body,
    Controller,
    Get,
    Patch,
    Query,
    Req,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthenticateGuard } from '../auth/guards/authenticate.guard';
import { ApiUtil } from 'src/common/utils/api-util';
import { I18nService } from 'nestjs-i18n';
import { UpdateMyProfileDto } from './dto/update-my-profile.dto';
import { avatarInterceptor } from './interceptors/avatar.interceptor';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Controller('users')
@UseGuards(AuthenticateGuard)
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
        private readonly i18nService: I18nService,
    ) {}

    @Get('my-profile')
    async getMyProfile(@Req() request: Request) {
        const profile = await this.usersService.getMyProfile(
            request['user']['id'],
        );

        return ApiUtil.formatResponse(
            200,
            this.i18nService.t('messages.profileFetched'),
            profile,
        );
    }

    @Patch('my-profile')
    @UseInterceptors(avatarInterceptor)
    async updateMyProfile(
        @Req() request: Request,
        @Body() data: UpdateMyProfileDto,
        @UploadedFile() avatar?: Express.Multer.File,
    ) {
        const profile = await this.usersService.updateMyProfile(
            request['user']['id'],
            data,
            avatar,
        );

        return ApiUtil.formatResponse(
            200,
            this.i18nService.t('messages.profileUpdated'),
            profile,
        );
    }

    @Get('my-followers')
    async myFollowers(
        @Req() request: Request,
        @Query('page') page?: number,
        @Query('limit') limit?: number,
    ) {
        const data = await this.usersService.myFollowers(
            request['user']['id'],
            page,
            limit,
        );

        return ApiUtil.formatResponse(
            200,
            this.i18nService.t('messages.followersFetched'),
            data.followers,
            data.totalCount,
            data.page,
            data.totalPages,
        );
    }

    @Get('my-communities')
    async myCommunities(
        @Req() request: Request,
        @Query('page') page?: number,
        @Query('limit') limit?: number,
    ) {
        const data = await this.usersService.myCommunities(
            request['user']['id'],
            page,
            limit,
        );

        return ApiUtil.formatResponse(
            200,
            this.i18nService.t('messages.communitiesFetched'),
            data.communities,
            data.totalCount,
            data.page,
            data.totalPages,
        );
    }

    @Get('my-posts')
    async myPosts(
        @Req() request: Request,
        @Query('page') page?: number,
        @Query('limit') limit?: number,
    ) {
        const data = await this.usersService.myPosts(
            request['user']['id'],
            page,
            limit,
        );

        return ApiUtil.formatResponse(
            200,
            this.i18nService.t('messages.postsFetched'),
            data.posts,
            data.totalCount,
            data.page,
            data.totalPages,
        );
    }

    @Patch('my-password')
    async updatePassword(
        @Req() request: Request,
        @Body() data: UpdatePasswordDto,
    ) {
        await this.usersService.updatePassword(request['user']['id'], data);

        return ApiUtil.formatResponse(
            200,
            this.i18nService.t('messages.passwordUpdated'),
        );
    }

    @Get('my-blocks')
    async myBlocks(
        @Req() request: Request,
        @Query('page') page?: number,
        @Query('limit') limit?: number,
    ) {
        const data = await this.usersService.myBlocks(
            request['user']['id'],
            page,
            limit,
        );

        return ApiUtil.formatResponse(
            200,
            this.i18nService.t('messages.blocksFetched'),
            data.blocks,
            data.totalCount,
            data.page,
            data.totalPages,
        );
    }
}
