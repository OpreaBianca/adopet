export interface User {
  _id?: string;
  name: string;
  email: string;
  password: string;
  subscription: PushSubscription;
  profile: string;
  phone: string;
  emergencyNotificationOn: boolean;
  address: string;
  facebook: string;
  twitter: string;
  website: string;
  instagram: string;
  description: string;
  profileImageUrl: string;
  profileImage: string;

  bankName: string;
  bankAccount: string;
  bankAccountName: string;
  paypalAccount: string;
  donationsInfo: string;
}