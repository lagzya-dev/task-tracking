'use client';
import { useEffect, useState } from 'react';
import TaskService from '@/shared/services/task.service';
import { Task } from '@/shared/interfaces/task.class';
import { EFilterType } from '@/shared/interfaces/filter.enum';

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<EFilterType>(EFilterType.ALL);
  useEffect(() => {
    const sub = TaskService.tasks.subscribe((tasks) => {
      setTasks(tasks);
    });

    return () => sub.unsubscribe();
  });
  function selectFilter(filter: EFilterType) {
    setFilter(filter);
  }
  function handleClickName(name: string) {
    TaskService.changeStatus(name);
  }
  function handleClickDelete(name: string) {
    TaskService.remove(name);
  }
  return (
    <ul role="list" className="divide-y divide-amber-500">
      <div className="flex items-center justify-between gap-x-4 py-5">
        <h2 className="text-2xl font-semibold text-gray-900">Tasks</h2>
        <form className={'flex flex-row gap-x-5'}>
          <div className={'flex gap-x-2'}>
            <label className={'text-gray-900'}>ALL</label>
            <input
              type="checkbox"
              checked={filter === EFilterType.ALL}
              onChange={() => selectFilter(EFilterType.ALL)}
            />
          </div>

          <div className={'flex gap-x-2'}>
            <label className={'text-gray-900'}>COMPLETED</label>
            <input
              type="checkbox"
              checked={filter === EFilterType.COMPLETED}
              onChange={() => selectFilter(EFilterType.COMPLETED)}
            />
          </div>
          <div className={'flex gap-x-2'}>
            <label className={'text-gray-900'}>INCOMPLETE</label>
            <input
              type="checkbox"
              checked={filter === EFilterType.INCOMPLETE}
              onChange={() => selectFilter(EFilterType.INCOMPLETE)}
            />
          </div>
        </form>
      </div>

      {tasks
        .filter((task) => {
          switch (filter) {
            case EFilterType.ALL:
              return task;
            case EFilterType.INCOMPLETE:
              return !task.isComplete;
            case EFilterType.COMPLETED:
              return task.isComplete;
            default:
              return task;
          }
        })
        .map((task) => (
          <li key={task.name} className="flex justify-between gap-x-96 py-5">
            <div className="flex min-w-0 gap-x-4 bg">
              <div className="min-w-52 flex-auto">
                <p
                  className="text-sm/6 font-semibold text-gray-900"
                  onClick={() => handleClickName(task.name)}
                >
                  {task.name}
                </p>
              </div>
            </div>
            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
              {!task.isComplete ? (
                <p className="font-bold text-xs/5 text-red-600">No complete</p>
              ) : (
                <p className="font-bold text-xs/5 text-emerald-500">Complete</p>
              )}

              <p className=" text-xs/5 text-gray-500">
                Created At{' '}
                <time dateTime={task.createdAt.toDateString()}>
                  {task.createdAt.toLocaleString()}
                </time>
              </p>
              <button
                className={'bg-red-600 rounded-2xl px-4 py-1'}
                onClick={() => handleClickDelete(task.name)}
              >
                <span className={'text-xs/2.5'}>Delete</span>
              </button>
            </div>
          </li>
        ))}
    </ul>
  );
}
