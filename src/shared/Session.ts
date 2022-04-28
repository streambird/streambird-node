import { DeviceFingerprint } from "./DeviceFingerprint";
import { Factor } from "./Factor";

export type Session = {
  id: string;
  userId: string;
  startedAt: number;
  expiresAt: number;
  lastActiveAt: number;
  factors: Array<Factor>;
  deviceFingerprint: DeviceFingerprint;
  updatedAt: number;
  createdAt: number;
}