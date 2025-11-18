import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema, Document } from 'mongoose';
import { User } from 'src/modules/users/entities/user.entity';

@Schema({ timestamps: true })
export class Community {
    @Prop()
    name: string;

    @Prop()
    description: string;

    @Prop()
    avatar: string;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
    owner: User | string;

    @Prop({ type: Boolean, default: false })
    isPrivate: boolean;

    @Prop({ type: Number, default: 0 })
    membersCount: number;

    @Prop({ type: Number, default: 0 })
    postsCount: number;

    @Prop({ default: 'active', enum: ['active', 'deleted'] })
    status: string;
}

export type CommunityDocument = Community & Document;

export const CommunitySchema = SchemaFactory.createForClass(Community);
