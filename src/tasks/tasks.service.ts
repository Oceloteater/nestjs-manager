import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TasksRepository } from './tasks.repository';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private taskRepository: TasksRepository,
  ) {}

  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }
  //
  // getTasksWithFilter(filterData: GetTasksFilterDto): Task[] {
  //   const { status, search } = filterData;
  //   let tasks = this.getAllTasks();
  //
  //   if (status) {
  //     tasks = tasks.filter((task: Task) => task.status === status);
  //   }
  //
  //   if (search) {
  //     tasks = tasks.filter((task: Task) => {
  //       return task.title.includes(search) || task.description.includes(search);
  //     });
  //   }
  //
  //   return tasks;
  // }

  async getTaskById(id: string): Promise<Task> {
    const found = await this.taskRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return found;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto);
  }

  // updateTaskStatus(id: string, status: TaskStatus): Task {
  //   const task = this.getTask(id);
  //   task.status = TaskStatus[status];
  //   return task;
  // }
  //
  // deleteTask(id: string): string {
  //   const found = this.getTask(id);
  //   this.tasks = this.tasks.filter((task: Task) => task.id !== found.id);
  //   return 'Task deleted';
  // }
}
