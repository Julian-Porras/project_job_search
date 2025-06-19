export interface UserType {
  id: number;
  first_name: string;
  last_name: string;
  middle_name?: string;
  email_address: string;
  role: number;
  avatar?: string;
  password?: string;
  created_at?: string;
  updated_at?: string;
}

export interface LoginCredentials {
  email_address: string;
  password: string;
}

export interface RegisterCredentials {
  first_name: string;
  last_name: string;
  middle_name?: string;
  email_address: string;
  password: string;
  password_confirmation: string;
}

export interface ProtectedRouteType {
  role: number;
  children: React.ReactNode;
}

export interface JobType {
  id: number;
  title: string;
  description: string;
  company: string;
  location: string;
  posted_at: string;
  employer_id: number;
}
