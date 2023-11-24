export interface Todo {
  id: number;
  title: string;
  description: string | null;
  status: string;
  active_flg: boolean;
  created_at: string;
  created_by: string;
  updated_at: string | null;
  updated_by: string | null;
}
