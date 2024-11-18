import { BehaviorSubject } from 'rxjs';
import { Task } from '@/shared/interfaces/task.class';

class TaskService {
  public tasks = new BehaviorSubject<Task[]>([
    new Task('Task 1'),
    new Task('Task 2', true),
    new Task('Task 3'),
  ]);
  create(task: Task) {
    if (this.tasks.getValue().filter((t) => t.name === task.name).length > 0)
      return;
    this.tasks.next([...this.tasks.getValue(), task]);
  }
  remove(name: string) {
    this.tasks.next([...this.tasks.getValue().filter((t) => t.name !== name)]);
  }
  changeStatus(name: string) {
    const task = this.tasks.getValue().find((p) => p.name === name);
    if (task) {
      task.isComplete = !task.isComplete;
    }

    this.tasks.next([...this.tasks.getValue()]);
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new TaskService();
