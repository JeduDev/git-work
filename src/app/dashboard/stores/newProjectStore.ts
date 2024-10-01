import { create } from "zustand";

interface ProjectInfo {
  name?: string;
  description?: string;
  thumbnail?: string;
  id?: string;
}

interface NewProjectStore {
  projectInfo: ProjectInfo | null;
  updateName: (name: string) => void;
  updateDescription: (description: string) => void;
  updateThumbnail: (thumbnail: string) => void;
  clear: () => void;
}

const useNewProjectStore = create<NewProjectStore>((set) => ({
  projectInfo: {
    name: "",
    description: "",
    thumbnail: "",  
  },
  updateName: (name: string) =>
    set((state) => ({
      projectInfo: {
        ...state.projectInfo,
        name,
      },
    })),
  
  updateDescription: (description: string) =>
    set((state) => ({
      projectInfo: {
        ...state.projectInfo,
        description,
      },
    })),

  updateThumbnail: (thumbnail: string) =>
    set((state) => ({
      projectInfo: {
        ...state.projectInfo,
        thumbnail,
      },
    })),
  clear: () => set({ projectInfo: {
      name: "",
      description: "",
      thumbnail: "",
    } 
  }),

}));

export default useNewProjectStore;
