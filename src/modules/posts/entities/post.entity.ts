import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Community } from 'src/modules/communities/entities/community.entity';
import { User } from 'src/modules/users/entities/user.entity';

@Schema({ timestamps: true })
export class Post {
    @Prop()
    title: string;

    @Prop()
    content: string;

    @Prop({ type: [String], default: [] })
    media: string[];

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
    author: User | string;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Community' })
    community: Community | string;

    @Prop({ default: 'active', enum: ['active', 'deleted'] })
    status: string;

    @Prop({ default: false })
    isPrivate: boolean;

    @Prop({ default: 0 })
    commentsCount: number;

    @Prop({ default: 0 })
    upvotesCount: number;

    @Prop({ default: 0 })
    downvotesCount: number;
}

export type PostDocument = Post & Document;

export const PostSchema = SchemaFactory.createForClass(Post);
