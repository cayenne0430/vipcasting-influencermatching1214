import { create } from 'zustand';
import type { Message, Chat } from '../types/message';

interface MessageState {
  chats: Chat[];
  activeChat: string | null;
  messages: Message[];
  setActiveChat: (chatId: string) => void;
  sendMessage: (content: string) => void;
  markAsRead: (messageId: string) => void;
}

export const useMessageStore = create<MessageState>((set) => ({
  chats: [
    {
      id: '1',
      name: 'Beauty Co.',
      company: '株式会社ビューティー',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=100',
      lastMessage: '案件の詳細について確認させていただきたい点がございます。',
      timestamp: '14:30',
      unread: 2,
      isStarred: true
    },
    {
      id: '2',
      name: 'Fitness Lab',
      company: 'フィットネスラボ株式会社',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=100',
      lastMessage: '契約書の内容を確認いたしました。',
      timestamp: '昨日',
      unread: 0,
      isStarred: false
    }
  ],
  activeChat: null,
  messages: [
    {
      id: '1',
      content: 'はじめまして。案件に興味を持っていただき、ありがとうございます。',
      timestamp: '14:00',
      sender: 'company',
      read: true
    },
    {
      id: '2',
      content: '商品の使用方法について、詳しく説明していただけますでしょうか？',
      timestamp: '14:15',
      sender: 'user',
      read: true
    },
    {
      id: '3',
      content: 'もちろんです。商品は朝晩の洗顔後にご使用いただくことをお勧めしています。',
      timestamp: '14:30',
      sender: 'company',
      read: false
    }
  ],

  setActiveChat: (chatId) => set({ activeChat: chatId }),
  
  sendMessage: (content) => set((state) => ({
    messages: [
      ...state.messages,
      {
        id: Date.now().toString(),
        content,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sender: 'user',
        read: false
      }
    ]
  })),

  markAsRead: (messageId) => set((state) => ({
    messages: state.messages.map(message =>
      message.id === messageId ? { ...message, read: true } : message
    )
  }))
}));