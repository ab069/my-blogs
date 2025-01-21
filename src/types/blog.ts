export interface BlogPost {
  id: string;
  title: string;
  description: string;
  content: string;
  tags?: string[];
  createdAt: string;
}
