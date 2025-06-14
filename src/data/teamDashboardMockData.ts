
export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'in_progress' | 'todo';
  priority: 'high' | 'medium' | 'low';
  due_date: string;
  assigned_to: string;
  created_at: string;
}

export interface Team {
  id: string;
  name: string;
  description: string;
  created_at: string;
}

export const mockTeams: Team[] = [
  {
    id: '1',
    name: 'Frontend Warriors',
    description: 'Developing the new user interface',
    created_at: new Date('2025-05-01T10:00:00Z').toISOString(),
  },
  {
    id: '2',
    name: 'Backend Titans',
    description: 'Powering the application logic',
    created_at: new Date('2025-05-01T11:00:00Z').toISOString(),
  },
  {
    id: '3',
    name: 'Data Mavericks',
    description: 'Analyzing user data for insights',
    created_at: new Date('2025-05-02T09:30:00Z').toISOString(),
  },
];

export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Implement new login page design',
    description: 'Update the login page to match the new Figma mockups.',
    status: 'in_progress',
    priority: 'high',
    due_date: new Date(new Date().setDate(new Date().getDate() + 3)).toISOString(),
    assigned_to: 'Alice',
    created_at: new Date('2025-06-10T14:00:00Z').toISOString(),
  },
  {
    id: '2',
    title: 'Setup user authentication endpoint',
    description: 'Create a new endpoint for user login and registration.',
    status: 'completed',
    priority: 'high',
    due_date: new Date('2025-06-12T18:00:00Z').toISOString(),
    assigned_to: 'Bob',
    created_at: new Date('2025-06-09T09:00:00Z').toISOString(),
  },
  {
    id: '3',
    title: 'Refactor database schema for performance',
    description: 'Optimize queries and add necessary indexes.',
    status: 'todo',
    priority: 'medium',
    due_date: new Date(new Date().setDate(new Date().getDate() + 7)).toISOString(),
    assigned_to: 'Charlie',
    created_at: new Date('2025-06-11T11:00:00Z').toISOString(),
  },
  {
    id: '4',
    title: 'Build weekly user activity report',
    description: 'Generate a report of user engagement metrics.',
    status: 'todo',
    priority: 'low',
    due_date: new Date(new Date().setDate(new Date().getDate() + 14)).toISOString(),
    assigned_to: 'Diana',
    created_at: new Date('2025-06-12T16:30:00Z').toISOString(),
  },
  {
    id: '5',
    title: 'Fix button alignment on mobile',
    description: 'The primary action button is misaligned on screens smaller than 375px.',
    status: 'in_progress',
    priority: 'medium',
    due_date: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(),
    assigned_to: 'Alice',
    created_at: new Date('2025-06-13T10:00:00Z').toISOString(),
  },
];
