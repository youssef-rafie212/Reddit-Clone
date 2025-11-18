import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema, Document } from 'mongoose';
import { User } from 'src/modules/users/entities/user.entity';
import { Community } from 'src/modules/communities/entities/community.entity';

@Schema({ timestamps: true })
export class CommunityMember {
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: User.name })
    user: User | string;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: Community.name })
    community: Community | string;
}

export type CommunityDocument = CommunityMember & Document;

export const CommunityMemeberSchema =
    SchemaFactory.createForClass(CommunityMember);
