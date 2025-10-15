export interface Document {
  id: string;
  filename: string;
  lastModified: string;
}

export type AppScreen = 'dashboard' | 'processing' | 'editor';

export interface ProcessingStage {
  step: number;
  total: number;
  message: string;
}
