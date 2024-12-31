export interface IProject {
  id: number;
  title: string;
  description?: string | null;
  startDate: string;
  endDate?: string | null;
  status: string;
  imageUrl: string;
  url?: string | null;
  stack: string[];
  createdAt?: string | null;
  updatedAt?: string | null;
}

export type ICreateProject = Omit<IProject, 'id' | 'createdAt' | 'updatedAt'>;
