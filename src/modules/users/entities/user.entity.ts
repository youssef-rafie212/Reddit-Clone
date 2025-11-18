import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Country } from 'src/modules/countries/entities/country.entity';
import { Schema as MongooseSchema, Query, Document } from 'mongoose';
import bcrypt from 'bcrypt';

@Schema({ timestamps: true })
export class User {
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

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: Country.name })
    country: string | Country;

    @Prop()
    bio: string;

    @Prop()
    otp?: string;

    @Prop()
    otpExpireAt?: Date;

    @Prop({ default: false })
    canResetPassword: boolean;

    @Prop({ default: false })
    dataCompleted: boolean;

    @Prop({ default: false })
    isVerified: boolean;

    @Prop({ default: 'active', enum: ['active', 'deleted', 'blocked'] })
    status: string;

    @Prop({ default: true })
    isNotify: boolean;

    @Prop({ default: 0 })
    notificationsCount: number;

    @Prop({ default: 'user', enum: ['user'] })
    type: string;

    @Prop({ type: Date, expires: 0 })
    expireAt?: Date;
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);

// pre save hook to hash the password before saving
UserSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
    }
    next();
});

// pre find hook to populate wanted fields
UserSchema.pre<Query<UserDocument, UserDocument>>(/^find/, function (next) {
    this.populate('country');
    next();
});

// method to compare passwords with the hashed password
UserSchema.methods.comparePassword = async function (enteredPassword: string) {
    return await bcrypt.compare(enteredPassword, this.password);
};
