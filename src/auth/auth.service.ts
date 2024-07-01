import { Injectable } from '@nestjs/common';
import { SignupDTO } from './dto/signup.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { SigninDTO } from './dto/signin.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) { }

    async signin(signInDto: SigninDTO) {
        const user = await this.userService.findOneByEmail(signInDto.email)

        if (!user) {
            throw new Error('User not found');
        }

        const isPasswordCorrect = bcrypt.compareSync(signInDto.password, user.password);

        if(!isPasswordCorrect){
            throw new Error('Password is incorrect');
        }

        const access_token = this.jwtService.sign({
            id: user.id,
            email: user.email,
        });
        
        return { access_token };
    }

    signup(signupDto: SignupDTO) {
        const hashPassword = bcrypt.hashSync(signupDto.password, 10);

        signupDto.password = hashPassword;

        console.log(signupDto);

        const user = this.userService.create(signupDto);
        
        return user;
    }
}
