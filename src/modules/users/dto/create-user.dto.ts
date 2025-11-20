import {
    IsEmail,
    IsMongoId,
    IsNotEmpty,
    IsString,
    Matches,
    MaxLength,
    MinLength,
    Validate,
} from 'class-validator';
import { Duplicate } from 'src/modules/auth/validation/duplicate';
import { ValidCountry } from 'src/modules/auth/validation/valid-country';

export class CreateUserDto {
    @MinLength(3, { message: 'messages.invalidNameLength' })
    @MaxLength(20, { message: 'messages.invalidNameLength' })
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

    @IsString({ message: 'messages.invalidPassword' })
    @MinLength(6, { message: 'messages.invalidPasswordLength' })
    @MaxLength(20, { message: 'messages.invalidPasswordLength' })
    @IsNotEmpty({ message: 'messages.passwordRequired' })
    password: string;

    @Validate(ValidCountry)
    @IsMongoId({ message: 'messages.invalidCountry' })
    @IsNotEmpty({ message: 'messages.countryRequired' })
    country: string;

    avatar?: string;

    dataCompleted?: boolean;

    expireAt?: Date;

    otp?: string;

    otpExpireAt?: Date;
}
