import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Post } from 'src/modules/posts/entities/post.entity';
import { User } from 'src/modules/users/entities/user.entity';

@Schema({ timestamps: true })
export class Comment {
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Post' })
    post: Post | string;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
    author: string | User;

    @Prop()
    content: string;

    @Prop({ default: 0 })
    repliesCount: number;

    @Prop({ default: 0 })
    upvotesCount: number;

    @Prop({ default: 0 })
    downvotesCount: number;

    @Prop({
        type: MongooseSchema.Types.ObjectId,
        ref: 'Comment',
        default: null,
    })
    parentComment?: string | Comment;

    @Prop({ default: 'active', enum: ['active', 'deleted'] })
    status: string;
}

export type CommentDocument = Comment & Document;

export const CommentSchema = SchemaFactory.createForClass(Comment);
