export interface Message {
  id: string;
  content: string;
  timestamp: string;
  sender: 'user' | 'company';
  read: boolean;
}

export interface Chat {
  id: string;
  name: string;
  company: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  isStarred: boolean;
}