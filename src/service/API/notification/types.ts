import { SearchListQueryParams } from '../types';
import {
  NotificationEnums,
  NotificationPriorityEnums,
  NotificationStatusEnums,
  NotificationStrategyEnums
} from '@/constants/business/enums';

export interface SearchNotificationParams extends SearchListQueryParams {
  keySearch?: string;
  type?: NotificationEnums;
  startDate?: string;
  endDate?: string;
}

export interface Notification {
  id: string;
  title: string;
  content: string;
  receiveDate: string;
  status: NotificationStatusEnums;
  statusName: string;
  url: string;
  sender?: string;
  organization?: string;
  sentDate?: string;
  record?: string;
}

export interface RequestBodyNotification extends Pick<Notification, 'content' | 'title' | 'status'> {
  receivers: string[];
  sender: string;
  type: NotificationEnums;
  sendDate: string;
  sendAll: NotificationStrategyEnums;
  priority: NotificationPriorityEnums;
  url: string;
}
