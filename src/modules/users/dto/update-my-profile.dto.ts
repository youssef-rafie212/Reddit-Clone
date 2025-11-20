import {
    IsEmail,
    IsMongoId,
    IsNotEmpty,
    IsOptional,
    IsString,
    Matches,
    MaxLength,
    MinLength,
    Validate,
} from 'class-validator';
import { ValidCountry } from 'src/modules/auth/validation/valid-country';

export class UpdateMyProfileDto {
    @IsNotEmpty({ message: 'messages.nameRequired' })
    @MinLength(3, { message: 'messages.invalidNameLength' })
    @MaxLength(20, { message: 'messages.invalidNameLength' })
    @IsString({ message: 'messages.invalidName' })
    @IsOptional()
    name?: string;

    @IsEmail({}, { message: 'messages.invalidEmail' })
    @IsNotEmpty({ message: 'messages.emailRequired' })
    @IsOptional()
    email?: string;

    @Matches(/^\+\d{6,20}$/, { message: 'messages.invalidPhone' })
    @IsNotEmpty({ message: 'messages.phoneRequired' })
    @IsOptional()
    phone?: string;

    @IsNotEmpty({ message: 'messages.countryRequired' })
    @IsMongoId({ message: 'messages.invalidCountry' })
    @Validate(ValidCountry)
    @IsOptional()
    country?: string;

    @IsNotEmpty({ message: 'messages.bioRequired' })
    @MinLength(3, { message: 'messages.invalidBioLength' })
    @MaxLength(100, { message: 'messages.invalidBioLength' })
    @IsString({ message: 'messages.invalidBio' })
    @IsOptional()
    bio?: string;

    avatar?: string;
}
