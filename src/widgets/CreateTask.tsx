'use client';
import React, { useState } from 'react';
import TaskService from '@/shared/services/task.service';
import { Task } from '@/shared/interfaces/task.class';

export function CreateTask() {
  const [value, setValue] = useState('');
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value && value.length <= 150) {
      TaskService.create(new Task(value));
      setValue('');
    }
  };
  return (
    <div className={'gap-y-5 flex flex-col'}>
      <h2 className="text-2xl font-semibold text-gray-900">Create new task</h2>
      <form onSubmit={handleSubmit}>
        <input
          onChange={(e) => setValue(e.currentTarget.value)}
          type="text"
          value={value}
          placeholder="Task Name"
          className="block w-full px-3 py-2 text-gray-700 placeholder-gray-500 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </form>
    </div>
  );
}
