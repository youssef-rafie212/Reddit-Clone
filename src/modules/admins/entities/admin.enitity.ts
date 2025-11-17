import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema, Document } from 'mongoose';
import { Role } from 'src/modules/roles/entities/role.enitity';

@Schema({ timestamps: true })
export class Admin {
    @Prop()
    name: string;

    @Prop()
    email?: string;

    @Prop()
    phone?: string;

    @Prop()
    password: string;

    @Prop({ default: '' })
    avatar: string;

    @Prop({ default: 'active', enum: ['active', 'deleted', 'blocked'] })
    status: string;

    @Prop({ default: false })
    isSuperAdmin: boolean;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: Role.name })
    role: string | Role;
}

export type AdminDocument = Admin & Document;

export const AdminSchema = SchemaFactory.createForClass(Admin);
