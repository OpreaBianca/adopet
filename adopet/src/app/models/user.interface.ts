export interface User {
  name: string;
  email: string;
  profileID: number;
  phone: string;
  password: string;
  emergencyNotificationOn: boolean;
  description?: string;
  location?: string;
}