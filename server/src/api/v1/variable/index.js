import { NotificationTypes } from "./notification-types";
import { OrderStatuses } from "./order-status";
import { PaymentMethodTypes } from "./payment-method-types";
import { PaymentStatusTypes } from "./payment-status-types";
import { SupportRequestTypes } from "./support-request-type";

export const variables = {
  ["order-statuses"]: OrderStatuses,
  ["notification-types"] : NotificationTypes,
  ["payment-method-types"] : PaymentMethodTypes,
  ["payment-status-types"] : PaymentStatusTypes,
  ["support-request-types"] : SupportRequestTypes,
};
