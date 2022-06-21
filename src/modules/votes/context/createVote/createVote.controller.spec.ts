import { ConflictException, HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import MockDate from 'mockdate';

import {
  mockCreateVoteParamsDTO,
  mockVote,
} from '../../../../shared/tests/vote.mock';
import { mockRequest } from '../../../../shared/tests/request.mock';
import { CreateVoteController } from './createVote.controller';
import { CreateVoteService } from './createVote.service';

const mockCreateVoteService = {
  execute: jest.fn((dto) => {
    return mockVote;
  }),
};

describe('Create Movie Controller', () => {
  let controller: CreateVoteController;
  let service: CreateVoteService;
  beforeEach(async () => {
    MockDate.set(new Date());

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreateVoteController],
      providers: [CreateVoteService],
    })
      .overrideProvider(CreateVoteService)
      .useValue(mockCreateVoteService)
      .compile();

    controller = module.get<CreateVoteController>(CreateVoteController);
    service = module.get<CreateVoteService>(CreateVoteService);
  });

  it('Should call Create Vote Service with the correct values', async () => {
    const executeSpy = jest.spyOn(service, 'execute');
    await controller.handle(mockRequest, mockCreateVoteParamsDTO);
    expect(executeSpy).toHaveBeenCalledWith(
      'any_user_id',
      mockCreateVoteParamsDTO,
    );
  });

  it('Should return the vote on Create Vote Service success', async () => {
    const response = await controller.handle(
      mockRequest,
      mockCreateVoteParamsDTO,
    );
    expect(response).toEqual(mockVote);
  });

  it('Should throw if Create Vote Service throws', async () => {
    jest
      .spyOn(service, 'execute')
      .mockReturnValueOnce(Promise.reject(new ConflictException()));
    const error = controller.handle(mockRequest, mockCreateVoteParamsDTO);
    await expect(error).rejects.toBeInstanceOf(HttpException);
  });
});
