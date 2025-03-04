
export interface RecentUpload {
  id: string;
  name: string;
  imageUrl: string;
  category: string;
  createdAt: string;
}

export interface ItemInference {
  id: string;
  name: string;
  category: string;
  color: string;
  imageUrl: string;
  confidence: number;
}
