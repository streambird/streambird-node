import { FactorAuthenticationType, FactorDeliveryChannel } from "./Enums";
import { Method } from "./Method";

export type Factor = {
  deliveryChannel: FactorDeliveryChannel;
  type: FactorAuthenticationType;
  method: Method;
}