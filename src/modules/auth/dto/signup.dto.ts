import {
    IsEmail,
    IsEnum,
    IsMongoId,
    IsNotEmpty,
    IsOptional,
    IsString,
    Matches,
    MaxLength,
    MinLength,
    Validate,
} from 'class-validator';
import { DeviceType } from '../enums/device.type.enum';
import { PasswordsMatch } from '../validation/passwords-match';
import { Duplicate } from '../validation/duplicate';
import { ValidCountry } from '../validation/valid-country';

export class SignupDto {
    @MaxLength(20, { message: 'messages.invalidNameLength' })
    @MinLength(3, { message: 'messages.invalidNameLength' })
    @IsString({ message: 'messages.invalidName' })
    @IsNotEmpty({ message: 'messages.nameRequired' })
    name: string;

    @Validate(Duplicate)
    @IsEmail({}, { message: 'messages.invalidEmail' })
    @IsNotEmpty({ message: 'messages.emailRequired' })
    email: string;

    @Validate(Duplicate)
    @Matches(/^\+\d{6,20}$/, { message: 'messages.invalidPhone' })
    @IsNotEmpty({ message: 'messages.phoneRequired' })
    phone: string;

    @MaxLength(20, { message: 'messages.invalidPasswordLength' })
    @MinLength(6, { message: 'messages.invalidPasswordLength' })
    @IsString({ message: 'messages.invalidPassword' })
    @IsNotEmpty({ message: 'messages.passwordRequired' })
    password: string;

    @Validate(PasswordsMatch)
    @IsString({ message: 'messages.invalidPasswordConfirm' })
    @IsNotEmpty({ message: 'messages.passwordConfirmRequired' })
    passwordConfirm: string;

    @Validate(ValidCountry)
    @IsMongoId({ message: 'messages.invalidCountry' })
    @IsNotEmpty({ message: 'messages.countryRequired' })
    @IsOptional()
    country: string;

    @IsString({ message: 'messages.invalidFcmToken' })
    @IsNotEmpty({ message: 'messages.fcmTokenRequired' })
    @IsOptional()
    fcmToken?: string;

    @IsEnum(DeviceType, { message: 'messages.invalidDeviceType' })
    @IsNotEmpty({ message: 'messages.deviceTypeRequired' })
    @IsOptional()
    deviceType?: DeviceType;
}
