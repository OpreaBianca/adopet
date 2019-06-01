export interface User {
  name: string;
  email: string;
  profile: string;
  phone: string;
  password: string;
  emergencyNotificationOn: boolean;
  location?: string;
  facebook?: string;
  twitter?: string;
  website?: string;
  instagram?: string;
  description?: string;
}