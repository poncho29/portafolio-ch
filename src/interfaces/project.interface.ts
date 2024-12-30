export interface IProject {
  id: number;
  title: string;
  description?: string | undefined;
  startDate: string;
  endDate?: string | undefined;
  status: string;
  imageUrl: string;
  url?: string | undefined;
  stack: string[];
  createdAt?: string | null;
  updatedAt?: string | null;
}

export type ICreateProject = Omit<IProject, 'id' | 'createdAt' | 'updatedAt'>;
