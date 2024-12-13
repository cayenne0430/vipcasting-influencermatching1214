```typescript
import React from 'react';
import { Calendar, Clock, CheckCircle } from 'lucide-react';
import { ScheduleTask } from '../../types/schedule';

interface ScheduleListProps {
  tasks: ScheduleTask[];
  onTaskClick: (task: ScheduleTask) => void;
}

const ScheduleList: React.FC<ScheduleListProps> = ({ tasks, onTaskClick }) => {
  // タスクを日付順にソート
  const sortedTasks = [...tasks].sort((a, b) => {
    const dateA = new Date(`${a.dueDate}${a.dueTime ? ' ' + a.dueTime : ''}`);
    const dateB = new Date(`${b.dueDate}${b.dueTime ? ' ' + b.dueTime : ''}`);
    return dateA.getTime() - dateB.getTime();
  });

  const getTaskTypeLabel = (type: ScheduleTask['taskType']) => {
    switch (type) {
      case 'draft': return '下書き提出';
      case 'post': return '投稿';
      case 'meeting': return 'ミーティング';
      default: return 'その他';
    }
  };

  return (
    <div className="space-y-4">
      {sortedTasks.map((task) => (
        <div
          key={task.id}
          onClick={() => onTaskClick(task)}
          className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition cursor-pointer"
        >
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-medium text-gray-900">{task.campaignTitle}</h3>
              <p className="text-sm text-gray-600">{task.companyName}</p>
            </div>
            <span className={`px-2 py-1 rounded-full text-xs ${
              task.status === 'completed' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-yellow-100 text-yellow-800'
            }`}>
              {task.status === 'completed' ? '完了' : '未完了'}
            </span>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              {task.dueDate}
            </div>
            {task.dueTime && (
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {task.dueTime}
              </div>
            )}
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-1" />
              {getTaskTypeLabel(task.taskType)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ScheduleList;
```