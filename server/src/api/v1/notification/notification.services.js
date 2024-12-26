import BasicServices from "../basic.services";
import Notification from "./notification.model";

export class NotificationServices extends BasicServices {
  constructor() {
    super(Notification);
  }
}

const notificationServices = new NotificationServices();

export default notificationServices;
