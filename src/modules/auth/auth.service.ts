import { Injectable } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { AuthHelper } from './helpers/auth.helper';
import { OtpUtil } from 'src/common/utils/otp-util';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { ReturnObject } from 'src/common/return-object/return-object';
import { ImageUtil } from 'src/common/utils/image.util';
import { RequestOtpDto } from './dto/request-otp.dto';
import { AppException } from 'src/common/exceptions/app.exception';
import { I18nService } from 'nestjs-i18n';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { SigninDto } from './dto/signin.dto';
import { UsersService } from '../users/users.service';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../users/entities/user.entity';
import { Model } from 'mongoose';
import { AuthUtil } from 'src/common/utils/auth-util';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly authHelper: AuthHelper,
        private readonly returnObject: ReturnObject,
        private readonly i18nService: I18nService,
        @InjectModel(User.name) private readonly userModel: Model<User>,
    ) {}

    async signup(data: SignupDto, avatar?: Express.Multer.File) {
        const otp = OtpUtil.generateOtp();
        const otpExpireAt = new Date(Date.now() + 10 * 60 * 1000);

        let proccessedAvatarFilename: string;
        if (avatar) {
            proccessedAvatarFilename = await ImageUtil.processAndSaveAvatar(
                avatar.buffer,
            );
        }

        const createData: CreateUserDto = {
            ...data,
            avatar: avatar ? proccessedAvatarFilename! : '',
            otp,
            otpExpireAt,
            expireAt: new Date(Date.now() + 60 * 60 * 1000),
            dataCompleted: true,
        };

        const user = await this.usersService.create(createData);

        const token = await this.authHelper.newToken({
            id: user.id,
            userType: 'user',
        });

        if (data.fcmToken)
            await this.authHelper.newDevice(
                user.id,
                data.fcmToken,
                data.deviceType,
            );

        await this.authHelper.sendOtpWithIdentifier(data.email, otp);

        await user.populate('country');

        const userObj = this.returnObject.user(user);

        return { token, userObj };
    }

    async requestOtp(data: RequestOtpDto) {
        const user = await this.authHelper.getUserByIdentifier(
            this.userModel,
            data.identifier,
        );

        if (!user) {
            throw new AppException(
                this.i18nService.t('messages.userNotFound'),
                400,
            );
        }

        const otp = OtpUtil.generateOtp();
        const otpExpireAt = new Date(Date.now() + 10 * 60 * 1000);

        user.otp = otp;
        user.otpExpireAt = otpExpireAt;
        await user.save();

        await this.authHelper.sendOtpWithIdentifier(data.identifier, otp);
    }

    async verifyOtp(data: VerifyOtpDto) {
        const user = await this.authHelper.getUserByIdentifier(
            this.userModel,
            data.identifier,
        );

        if (!user) {
            throw new AppException(
                this.i18nService.t('messages.userNotFound'),
                400,
            );
        }

        const validOtp = OtpUtil.verifyOtp(
            data.otp,
            user.otp,
            user.otpExpireAt,
        );

        if (!validOtp) {
            throw new AppException(
                this.i18nService.t('messages.invalidOtp'),
                400,
            );
        }

        if (data.reason === 'verify') {
            user.isVerified = true;
            user.expireAt = undefined;
        } else if (data.reason === 'reset') {
            user.canResetPassword = true;
        }

        user.otp = undefined;
        user.otpExpireAt = undefined;

        await user.save();
    }

    async signin(data: SigninDto) {
        const type = AuthUtil.getIdentifierType(data.identifier);

        const user = await this.usersService.findOne({
            [type!]: data.identifier,
            status: 'active',
        });

        if (!user) {
            throw new AppException(
                this.i18nService.t('messages.invalidCredentials'),
                401,
            );
        }

        const correctPassword: boolean = await (user as any).comparePassword(
            data.password,
        );

        if (!correctPassword) {
            throw new AppException(
                this.i18nService.t('messages.invalidCredentials'),
                401,
            );
        }

        const token = await this.authHelper.newToken({
            id: user.id,
            userType: 'user',
        });

        if (user.isVerified === false) {
            throw new AppException(
                this.i18nService.t('messages.accountNotVerified'),
                403,
                'verify_account',
                token,
            );
        }

        if (user.dataCompleted === false) {
            throw new AppException(
                this.i18nService.t('messages.dataIncomplete'),
                403,
                'complete_data',
                token,
            );
        }

        if (data.fcmToken)
            await this.authHelper.newDevice(
                user.id,
                data.fcmToken,
                data.deviceType,
            );

        await user.populate('country');

        const userObj = this.returnObject.user(user);

        return { token, userObj };
    }

    async signout(userId: string) {
        const user = await this.usersService.findById(userId);

        if (!user) {
            throw new AppException(
                this.i18nService.t('messages.userNotFound'),
                404,
            );
        }

        await this.authHelper.deleteAllUserDevices(userId);
        await this.authHelper.deleteAllUserTokens(userId);
    }
}
