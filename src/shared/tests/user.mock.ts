import { CreateUserParamsDTO } from '../../modules/users/dto/createUserParams.dto';
import { UpdateUserParamsDTO } from '../../modules/users/dto/updateUserParams.dto';
import { UserDTO } from '../../modules/users/dto/user.dto';

export const mockUser: UserDTO = {
  id: 'any_id',
  name: 'Test',
  email: 'test@test.com',
  password: null,
  isAdmin: false,
  createdAt: new Date(),
  updatedAt: null,
  deletedAt: null,
};

export const mockCreateUserParamsDTO = (): CreateUserParamsDTO => {
  return {
    name: 'any_name',
    email: 'any_email@test.com',
    password: 'any_password',
    passwordConfirmation: 'any_password',
  };
};

export const mockUpdateUserParamsDTO = (): UpdateUserParamsDTO => {
  return {
    name: 'updated_name',
    email: 'updated_email@test.com',
  };
};
