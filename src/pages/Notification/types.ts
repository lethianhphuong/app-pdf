import { NotificationApi } from '@/service/API';

export interface NotificationParams extends Omit<NotificationApi.SearchNotificationParams, 'startDate' | 'endDate'> {
  date?: string[];
}
