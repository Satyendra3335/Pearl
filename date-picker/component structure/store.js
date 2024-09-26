import create from 'zustand';

export const useStore = create((set) => ({
  startDate: '',
  endDate: '',
  recurrence: 'Daily',
  setStartDate: (date) => set(() => ({ startDate: date })),
  setEndDate: (date) => set(() => ({ endDate: date })),
  setRecurrence: (recurrence) => set(() => ({ recurrence })),
}));
