export class Task {
  constructor(
    name: string,
    isComplete: boolean = false,
    createdAt: Date = new Date(),
  ) {
    this.name = name;
    this.isComplete = isComplete;
    this.createdAt = createdAt;
  }
  name: string;
  isComplete: boolean;
  createdAt: Date;
}
