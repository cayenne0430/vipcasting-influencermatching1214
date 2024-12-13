```typescript
import { useState, useEffect } from 'react';
import { ScheduleTask } from '../types/schedule';

export const useSchedule = () => {
  const [tasks, setTasks] = useState<ScheduleTask[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // TODO: 実際のAPIからデータを取得する
    // ダミーデータを使用
    const dummyTasks: ScheduleTask[] = [
      {
        id: '1',
        campaignId: '1',
        campaignTitle: '春の新作コスメPRキャンペーン',
        companyName: 'Beauty Co.',
        taskType: 'draft',
        dueDate: '2024-04-10',
        dueTime: '15:00',
        status: 'pending',
        description: '商品レビューの下書き提出'
      },
      {
        id: '2',
        campaignId: '1',
        campaignTitle: '春の新作コスメPRキャンペーン',
        companyName: 'Beauty Co.',
        taskType: 'post',
        dueDate: '2024-04-15',
        dueTime: '12:00',
        status: 'pending',
        description: '商品レビュー投稿'
      },
      // ... 他のタスク
    ];

    setTasks(dummyTasks);
    setLoading(false);
  }, []);

  const updateTaskStatus = (taskId: string, status: 'pending' | 'completed') => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, status } : task
      )
    );
  };

  return {
    tasks,
    loading,
    error,
    updateTaskStatus
  };
};
```