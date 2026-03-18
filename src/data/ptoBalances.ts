export interface PTOBalance {
  planName: string;
  availableHours: number;
  usedHours: number;
  totalAllotment: number;
  pendingRequests: number;
}

export const ptoBalance: PTOBalance = {
  planName: 'Flexible Time Off',
  availableHours: 48,
  usedHours: 16,
  totalAllotment: 64,
  pendingRequests: 0,
};
