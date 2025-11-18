import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from 'src/modules/users/entities/user.entity';

@Schema({ timestamps: true })
export class Follow {
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
    follower: User | string;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
    following: User | string;
}

export type FollowDocument = Follow & Document;

export const FollowSchema = SchemaFactory.createForClass(Follow);
