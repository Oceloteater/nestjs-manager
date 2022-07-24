import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksRepository } from './tasks.repository';

const mockTasksRepository = () => ({
  getTasks: jest.fn(),
  findOne: jest.fn(),
});

const mockUser = {
  id: 'id',
  username: 'name',
  password: 'password1',
  tasks: [],
};

const mockTask = {
  id: 'id',
  title: 'title',
  description: 'description',
  status: 'OPEN',
};

describe('TasksService', () => {
  let service: TasksService;
  let repository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: TasksRepository,
          useFactory: mockTasksRepository,
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
    repository = module.get<TasksRepository>(TasksRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call getTasks() and return result', async () => {
    repository.getTasks.mockResolvedValue('tasks');
    const result = await service.getTasks(null, mockUser);

    expect(repository.getTasks).toBeCalled();
    expect(result).toEqual('tasks');
  });

  it('should call getTasksById() and return result', async () => {
    repository.findOne.mockResolvedValue(mockTask);
    const result = await service.getTaskById('id', mockUser);

    expect(result).toEqual(mockTask);
  });

  it('should call getTasksById() and handle an error', async () => {
    repository.findOne.mockResolvedValue(null);

    expect(service.getTaskById('id', mockUser)).rejects.toThrow(
      NotFoundException,
    );
  });
});
