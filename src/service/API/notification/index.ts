import { BaseResponse, PageResponse } from '../types';
import { Notification, RequestBodyNotification, SearchNotificationParams } from './types';
import { notificationHttp } from '@/service';
import { isDev } from '@/utilities/env';

export type { SearchNotificationParams, Notification, RequestBodyNotification };

export const getUnreadNotifications = ({ top }: { top: number }) => {
  return notificationHttp.get<PageResponse<Notification>>(
    {
      url: `/api/v1/notification/getTopAndCountUnread?top=${top}`
    },
    {
      errorMessageMode: 'none'
    }
  );
};

export const getNotifications = ({ page = 0, size = 99, ...rest }: SearchNotificationParams) => {
  return notificationHttp.get<PageResponse<Notification>>(
    {
      url: '/api/v1/notification/listv2',
      params: { page, size, ...rest }
    },
    {
      errorMessageMode: 'none'
    }
  );
};

export const sendNotification = (data: RequestBodyNotification) => {
  return notificationHttp.post<PageResponse<Notification>>(
    {
      url: '/api/v1/notification/send',
      data
    },
    {
      retryRequest: {
        count: 5,
        isOpenRetry: true,
        waitTime: 1000
      },
      errorMessageMode: 'none',
      successMessageMode: 'none'
    }
  );
};

export const getUnreadNotificationsCount = () => {
  return notificationHttp.get<BaseResponse<number>>(
    {
      url: '/api/v1/notification/unread'
    },
    {
      errorMessageMode: 'none'
    }
  );
};

export const getUnreadMailsCount = () => {
  return notificationHttp.get<BaseResponse<number>>(
    {
      url: `/api/v1/mail/inbox/unread`
    },
    {
      errorMessageMode: 'none'
    }
  );
};

export const markNoti = (id: string) => {
  return notificationHttp.put<BaseResponse<any>>(
    {
      url: `/api/v1/notification/mark-read`,
      data: [id]
    },
    {
      errorMessageMode: 'none'
    }
  );
};

export const markAllNoti = () => {
  return notificationHttp.put<BaseResponse<any>>(
    {
      url: `/api/v1/notification/read-all`
    },
    {
      errorMessageMode: 'none'
    }
  );
};

export const logoutNoti = () => {
  if (isDev) return;
  return notificationHttp.get<BaseResponse<any>>({
    url: `/api/v1/user-event/log-out`
  });
};
