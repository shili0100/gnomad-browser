"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.showNotification = void 0;
const react_1 = __importStar(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
const PubSub_1 = __importDefault(require("./PubSub"));
const NotificationsAnchor = styled_components_1.default.div `
  position: relative;
  margin-bottom: 20px;
`;
const NotificationsContainer = styled_components_1.default.div `
  position: absolute;
  z-index: 2;
  top: 1rem;
  right: 1rem;
`;
const STATUS_COLOR = {
    success: '#2E7D32',
    info: '#424242',
    warning: '#F0C94D',
    error: '#DD2C00',
};
const Notification = styled_components_1.default.div `
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 240px;
  min-height: 30px;
  padding: 0.5rem 0.5rem 0.5rem calc(10px + 0.5rem);
  border: 1px solid #333;
  border-radius: 3px;
  margin-bottom: 1rem;
  background: linear-gradient(
    to right,
    ${(props) => STATUS_COLOR[props.status]} 10px,
    #fafafa 10px
  );
  box-shadow: 2px 2px 5px #3338;
`;
const notificationService = new PubSub_1.default();
exports.showNotification = notificationService.publish.bind(notificationService);
class Notifications extends react_1.Component {
    constructor() {
        super(...arguments);
        this.state = {
            notifications: [],
        };
        this.removeTimeouts = new Map();
        this.nextNotificationId = 0;
        this.addNotification = ({ title, message = null, status = 'info', duration = 3 }) => {
            const id = `${this.nextNotificationId++}`; // eslint-disable-line no-plusplus
            const notification = {
                id,
                title,
                message,
                status,
            };
            this.setState((state) => ({
                notifications: [notification, ...state.notifications],
            }));
            this.removeTimeouts.set(id, setTimeout(() => {
                this.removeNotification(id);
            }, duration * 1000));
        };
    }
    componentDidMount() {
        notificationService.subscribe(this.addNotification);
    }
    componentWillUnmount() {
        notificationService.unsubscribe(this.addNotification);
        this.removeTimeouts.forEach((timeout) => {
            clearTimeout(timeout);
        });
    }
    removeNotification(id) {
        this.setState((state) => ({
            notifications: state.notifications.filter((n) => n.id !== id),
        }));
        this.removeTimeouts.delete(id);
    }
    render() {
        const { notifications } = this.state;
        return (react_1.default.createElement(NotificationsAnchor, null,
            react_1.default.createElement(NotificationsContainer, null, notifications.map((notification) => {
                const { id, title, message, status } = notification;
                return (react_1.default.createElement(Notification, { key: id, status: status },
                    react_1.default.createElement("strong", null, title),
                    message));
            }))));
    }
}
exports.default = Notifications;
//# sourceMappingURL=Notifications.js.map