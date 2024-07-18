import React, { Component } from 'react';
export declare const showNotification: (obj: any) => void;
type State = any;
declare class Notifications extends Component<Record<string, never>, State> {
    state: {
        notifications: never[];
    };
    removeTimeouts: Map<any, any>;
    nextNotificationId: number;
    componentDidMount(): void;
    componentWillUnmount(): void;
    addNotification: ({ title, message, status, duration }: any) => void;
    removeNotification(id: any): void;
    render(): React.JSX.Element;
}
export default Notifications;
