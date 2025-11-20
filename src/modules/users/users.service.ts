import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './entities/user.entity';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { AppException } from 'src/common/exceptions/app.exception';
import { I18nService } from 'nestjs-i18n';
import { ReturnObject } from 'src/common/return-object/return-object';
import { UpdateMyProfileDto } from './dto/update-my-profile.dto';
import { ImageUtil } from 'src/common/utils/image.util';
import { FileUtil } from 'src/common/utils/file.util';
import { AuthHelper } from '../auth/helpers/auth.helper';
import { FollowsService } from '../follows/follows.service';
import { CommunitiesService } from '../communities/communities.service';
import { CommunityDocument } from '../communities/entities/community.entity';
import { PostsService } from '../posts/posts.service';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { BlocksService } from '../blocks/blocks.service';

@Injectable()
export class UsersService {
    constructor(
        private readonly i18nService: I18nService,
        private readonly returnObject: ReturnObject,
        private readonly authHelper: AuthHelper,
        private readonly followsService: FollowsService,
        private readonly communitiesService: CommunitiesService,
        private readonly postsService: PostsService,
        private readonly blocksService: BlocksService,
        @InjectModel(User.name) private readonly userModel: Model<User>,
    ) {}

    async create(data: CreateUserDto) {
        return await this.userModel.create(data);
    }

    async findOne(filter: { [key: string]: any }) {
        return await this.userModel.findOne(filter);
    }

    async findById(id: string) {
        return await this.userModel.findById(id);
    }

    async getMyProfile(id: string) {
        const user = await this.findById(id);

        if (!user)
            throw new AppException(
                this.i18nService.t('messages.userNotFound'),
                400,
            );

        return this.returnObject.userProfile(user);
    }

    async updateMyProfile(
        id: string,
        data: UpdateMyProfileDto,
        avatar?: Express.Multer.File,
    ) {
        const user = await this.findById(id);

        if (!user)
            throw new AppException(
                this.i18nService.t('messages.userNotFound'),
                400,
            );

        if (data.email) {
            const emailExists = await this.authHelper.duplicate(
                [this.userModel],
                'email',
                data.email,
                user.id,
            );

            if (emailExists) {
                throw new AppException(
                    this.i18nService.t('messages.emailExists'),
                    400,
                );
            }
        }

        if (data.phone) {
            const phoneExists = await this.authHelper.duplicate(
                [this.userModel],
                'phone',
                data.phone,
                user.id,
            );

            if (phoneExists) {
                throw new AppException(
                    this.i18nService.t('messages.phoneExists'),
                    400,
                );
            }
        }

        Object.keys(data).forEach((key) => {
            if (data[key] === undefined || data[key] === null) delete data[key];
        });

        if (avatar) {
            if (user.avatar !== '') {
                const avatarPath = ImageUtil.getAvatarPath(
                    'users',
                    user.avatar,
                );
                FileUtil.deleteFile(avatarPath);
            }
            data.avatar = await ImageUtil.processAndSaveAvatar(avatar.buffer);
        }

        Object.assign(user, data);

        await user.save();

        return this.returnObject.userProfile(user);
    }

    async myFollowers(id: string, page: number = 1, limit: number = 10) {
        const user = await this.findById(id);

        if (!user)
            throw new AppException(
                this.i18nService.t('messages.userNotFound'),
                400,
            );

        const data = await this.followsService.getAll(
            { following: id },
            page,
            limit,
        );

        const followersObjects = data.follows.map((follow) =>
            this.returnObject.user(follow.follower as UserDocument),
        );

        return {
            followers: followersObjects,
            totalCount: data.totalCount,
            page: data.page,
            totalPages: data.totalPages,
        };
    }

    async myCommunities(id: string, page: number = 1, limit: number = 10) {
        const user = await this.findById(id);

        if (!user)
            throw new AppException(
                this.i18nService.t('messages.userNotFound'),
                400,
            );

        const data = await this.communitiesService.getAll(
            { members: id },
            page,
            limit,
        );

        const communitiesObjects = data.communitiesObjects.map((community) =>
            this.returnObject.community(community as CommunityDocument),
        );

        return {
            communities: communitiesObjects,
            totalCount: data.totalCount,
            page: data.page,
            totalPages: data.totalPages,
        };
    }

    async myPosts(id: string, page: number = 1, limit: number = 10) {
        const user = await this.findById(id);

        if (!user)
            throw new AppException(
                this.i18nService.t('messages.userNotFound'),
                400,
            );

        const data = await this.postsService.getAll(
            { author: id },
            page,
            limit,
        );

        const posts = data.posts.map((post) => this.returnObject.post(post));

        return {
            posts,
            totalCount: data.totalCount,
            page: data.page,
            totalPages: data.totalPages,
        };
    }

    async updatePassword(id: string, data: UpdatePasswordDto) {
        const user = await this.findById(id);

        if (!user)
            throw new AppException(
                this.i18nService.t('messages.userNotFound'),
                400,
            );

        const correctPassword: boolean = await (user as any).comparePassword(
            data.oldPassword,
        );

        if (!correctPassword) {
            throw new AppException(
                this.i18nService.t('messages.wrongPassword'),
                400,
            );
        }

        user.password = data.newPassword;
        await user.save();
    }

    async myBlocks(id: string, page: number = 1, limit: number = 10) {
        const user = await this.findById(id);

        if (!user)
            throw new AppException(
                this.i18nService.t('messages.userNotFound'),
                400,
            );

        const data = await this.blocksService.getAll(
            { blocked: id },
            page,
            limit,
        );

        const blocksObjects = data.blocks.map((block) =>
            this.returnObject.user(block.blocker as UserDocument),
        );

        return {
            blocks: blocksObjects,
            totalCount: data.totalCount,
            page: data.page,
            totalPages: data.totalPages,
        };
    }
}
