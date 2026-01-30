export interface MicroInnovation {
  title: string;
  explanation: string;
  nextStep: string;
  category: string;
}

export enum AppState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  RESULTS = 'RESULTS',
  ERROR = 'ERROR'
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content?: string; // For user messages
  suggestions?: MicroInnovation[]; // For assistant messages
  timestamp: number;
}

export interface InnovationResponse {
  suggestions: MicroInnovation[];
}