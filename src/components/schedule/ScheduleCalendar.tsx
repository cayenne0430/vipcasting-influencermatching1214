```typescript
import React from 'react';
import { ScheduleTask } from '../../types/schedule';

interface ScheduleCalendarProps {
  tasks: ScheduleTask[];
  onTaskClick: (task: ScheduleTask) => void;
}

const ScheduleCalendar: React.FC<ScheduleCalendarProps> = ({ tasks, onTaskClick }) => {
  // カレンダー表示の実装は将来の拡張として用意
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <p className="text-center text-gray-600">
        カレンダー表示は準備中です
      </p>
    </div>
  );
};

export default ScheduleCalendar;
```