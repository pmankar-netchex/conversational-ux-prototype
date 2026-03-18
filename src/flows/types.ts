export interface FlowStep {
  type: 'message' | 'prompt' | 'overlay' | 'branch';
  botMessage?: string;
  richContent?: any;
  quickReplies?: string[];
  overlayType?: string;
  branches?: Record<string, number>;
}
