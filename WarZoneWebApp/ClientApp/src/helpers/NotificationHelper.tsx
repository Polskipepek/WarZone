import { notification } from 'antd';
import { ReactNode } from 'react';

export const openNotification = (title: ReactNode, description: ReactNode, onClick?: () => void) => {
    notification.open({
        message: title,
        description: description,
        onClick: () => {
            if (onClick) {
                onClick();
            }
        }
    });
};

export const openErrorNotification = (title: ReactNode, description: ReactNode, onClick?: () => void) => {
    notification.error({
        message: title,
        description: description,
        onClick: () => {
            if (onClick) {
                onClick();
            }
        }
    });
};