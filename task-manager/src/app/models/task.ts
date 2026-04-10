export interface Task {
  id: string;              // MockAPI usually gives string IDs
  title: string;
  description: string;
  status: string;

  isDeleted: boolean;
  isTrashed: boolean;

  createdAt: string;
  updatedAt: string;

  userId: string;
}