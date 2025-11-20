import { User, UserDocument } from 'src/modules/users/entities/user.entity';
import { SharedVariables } from '../shared-variables/shared-variables';
import { Injectable } from '@nestjs/common';
import { CountryDocument } from 'src/modules/countries/entities/country.entity';
import {
    Community,
    CommunityDocument,
} from 'src/modules/communities/entities/community.entity';
import { PostDocument } from 'src/modules/posts/entities/post.entity';

@Injectable()
export class ReturnObject {
    constructor(private readonly sharedVariables: SharedVariables) {}

    getUserAvatar(avatar: string | null) {
        return avatar === '' || avatar === null
            ? this.sharedVariables.ADDRESS +
                  this.sharedVariables.USER_AVATAR_IMAGES +
                  'default.png'
            : avatar.startsWith('https')
              ? avatar
              : this.sharedVariables.ADDRESS +
                this.sharedVariables.USER_AVATAR_IMAGES +
                avatar;
    }

    getCommunityAvatar(avatar: string | null) {
        return avatar === '' || avatar === null
            ? this.sharedVariables.ADDRESS +
                  this.sharedVariables.COMMUNITY_AVATAR_IMAGES +
                  'default.png'
            : avatar.startsWith('https')
              ? avatar
              : this.sharedVariables.ADDRESS +
                this.sharedVariables.COMMUNITY_AVATAR_IMAGES +
                avatar;
    }

    getCountryImage(image: string) {
        return (
            this.sharedVariables.ADDRESS +
            this.sharedVariables.COUNTRY_IMAGES +
            image
        );
    }

    getPostMedia(media: string) {
        return (
            this.sharedVariables.ADDRESS +
            this.sharedVariables.POST_MEDIA +
            media
        );
    }

    user(user: UserDocument) {
        return {
            id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            avatar: this.getUserAvatar(user.avatar),
            country:
                user.country && this.country(user.country as CountryDocument),
        };
    }

    country(country: CountryDocument) {
        return {
            id: country._id,
            name: country.name,
            image: this.getCountryImage(country.image),
        };
    }

    userProfile(user: UserDocument) {
        return {
            id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            avatar: this.getUserAvatar(user.avatar),
            country:
                user.country && this.country(user.country as CountryDocument),
            bio: user.bio,
            notificationsCount: user.notificationsCount,
            followersCount: user.followersCount,
            postsCount: user.postsCount,
            commentsCount: user.commentsCount,
            communitiesCount: user.communitiesCount,
        };
    }

    community(community: CommunityDocument) {
        return {
            id: community._id,
            name: community.name,
            avatar: this.getCommunityAvatar(community.avatar),
            membersCount: community.membersCount,
            postsCount: community.postsCount,
        };
    }

    post(post: PostDocument) {
        return {
            id: post._id,
            title: post.title,
            content: post.content,
            media: post.media.forEach((media) => this.getPostMedia(media)),
            author: {
                name: (post.author as User).name,
                avatar: this.getUserAvatar((post.author as User).avatar),
            },
            community: {
                name: (post.community as Community).name,
                avatar: this.getCommunityAvatar(
                    (post.community as Community).avatar,
                ),
            },
            commentsCount: post.commentsCount,
            upvotesCount: post.upvotesCount,
            downvotesCount: post.downvotesCount,
        };
    }
}
