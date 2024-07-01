import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDTO } from './dto/signup.dto';
import { SigninDTO } from './dto/signin.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  @Post('signin')
  signin(
    @Body() signinDto: SigninDTO
  ) {
    return this.authService.signin(signinDto);
  }

  @Post('signup')
  signup(
    @Body() signupDto: SignupDTO
  ) {
    return this.authService.signup(signupDto);
  }
}
