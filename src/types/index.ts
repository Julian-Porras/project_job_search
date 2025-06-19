export interface JobType {
  id: number;
  title: string;
  description: string;
  company: string;
  location: string;
  posted_at: string;
  employer_id: number;
}

export interface UserType {
  id: number;
  firstName: string;
  lastName: string;
  middleName: string;
  email: string;
  avatar?: string;
  password: string;
  created_at: string;
  updated_at: string;
}