import { create } from 'zustand';

const useEarthquakeStore = create((set) => ({
  selectedId: null,
  setSelectedId: (id) => set({ selectedId: id }),
}));

export default useEarthquakeStore;
