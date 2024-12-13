import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface NotificationSetting {
  enabled: boolean;
  frequency: 'immediate' | 'daily' | 'none';
}

interface NotificationSettings {
  campaign: {
    newApplication: NotificationSetting;
    statusChange: NotificationSetting;
    reportSubmission: NotificationSetting;
    applicationDeadline: NotificationSetting;
    reportDeadline: NotificationSetting;
  };
  communication: {
    scoutReply: NotificationSetting;
    messageReceived: NotificationSetting;
    unreadMessage: NotificationSetting;
  };
  influencer: {
    favoriteActivity: NotificationSetting;
    newInfluencer: NotificationSetting;
  };
  system: {
    maintenance: NotificationSetting;
    termsUpdate: NotificationSetting;
    newFeature: NotificationSetting;
    important: NotificationSetting;
  };
}

interface NotificationStore {
  settings: NotificationSettings;
  updateSettings: (category: string, type: string, value: any) => void;
}

const defaultSettings: NotificationSettings = {
  campaign: {
    newApplication: { enabled: true, frequency: 'immediate' },
    statusChange: { enabled: true, frequency: 'immediate' },
    reportSubmission: { enabled: true, frequency: 'immediate' },
    applicationDeadline: { enabled: true, frequency: 'daily' },
    reportDeadline: { enabled: true, frequency: 'daily' }
  },
  communication: {
    scoutReply: { enabled: true, frequency: 'immediate' },
    messageReceived: { enabled: true, frequency: 'immediate' },
    unreadMessage: { enabled: true, frequency: 'daily' }
  },
  influencer: {
    favoriteActivity: { enabled: true, frequency: 'daily' },
    newInfluencer: { enabled: true, frequency: 'daily' }
  },
  system: {
    maintenance: { enabled: true, frequency: 'immediate' },
    termsUpdate: { enabled: true, frequency: 'immediate' },
    newFeature: { enabled: true, frequency: 'immediate' },
    important: { enabled: true, frequency: 'immediate' }
  }
};

export const useNotificationStore = create<NotificationStore>()(
  persist(
    (set) => ({
      settings: defaultSettings,
      updateSettings: (category, type, value) =>
        set((state) => ({
          settings: {
            ...state.settings,
            [category]: {
              ...state.settings[category as keyof NotificationSettings],
              [type]: typeof value === 'string'
                ? { ...state.settings[category as keyof NotificationSettings][type], frequency: value }
                : { ...state.settings[category as keyof NotificationSettings][type], ...value }
            }
          }
        }))
    }),
    {
      name: 'notification-settings'
    }
  )
);