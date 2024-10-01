import { mockData } from "@/mockData";
import { create } from "zustand";
import usePanelStore from "./panelStore";

// Definición de los tipos
type Project = {
  name: string;
  thumbnail: string;
  description?: string;
  id: string;
};

type NewProject = {
  name: string;
  description: string;
  thumbnail: string;
  id: string | null
};

type ProjectUpdate = {
  name?: string;
  description?: string;
  thumbnail?: string;
  id: string;
};

interface ProjectGroup {
  lastEdited: string;
  items: Project[];
}

interface FeedState {
  projectSelected: string | null;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  feedData: ProjectGroup[];
  setFeedData: (mockData: ProjectGroup[]) => void;
  setProjectSelected: (projectId: string | null) => void;
  addNewProject: (project: NewProject) => { status: string, id: string | null };
  updateProject: (updatedProject: ProjectUpdate) => { status: string, id: string | null};
  deleteProject: (projectId: string) => { status: string, feedData: ProjectGroup[] | null } ;
}

const useFeedStore = create<FeedState>((set, get) => ({
  projectSelected: null,
  isLoading: true,
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
  feedData: [],

  // Ahora acepta un parámetro opcional
  setFeedData: (data: ProjectGroup[] = []) => {
    set({ feedData: data });
  },

  setProjectSelected: (projectId: string | null) => {
    set({ projectSelected: projectId });
  },

  addNewProject: (project: NewProject) => {
    const { feedData } = get();

    if (doesProjectExist(feedData, project.name)) {
      return {
        status: "name already exists",
        id: null,
      };
    }

    const projectCount = getProjectsCount(feedData);

    if (projectCount >= 8) {
      return {
        status: "max project reached",
        id: null,
      };
    }

    if (!true) {
      return {
        status: "error creating project",
        id: null,
      };
    }

    const newProjectId = crypto.randomUUID();
    const newProject: Project = {
      ...project,
      id: newProjectId
    };

    set((state) => ({
      feedData: updateFeedData(state.feedData, newProject),
    }));

    return {
      status: "success",
      id: newProjectId,
    };
  },

  updateProject: (updatedProject: ProjectUpdate) => {

    const { feedData } = get();

    if (doesProjectExist(feedData, updatedProject?.name || "")) {
      return {
        status: "name already exists",
        id: null,
      };
    }

    set((state) => ({
      feedData: updateProjectData(state.feedData, updatedProject),
    }))

    if (!true) {
      return {
        status: "error updating project",
        id: null,
      };
    }

    return {
      status: "success",
      id: updatedProject.id,
    }
  },

  deleteProject: (projectId: string) => {

    if (!true) {
      return {
        status: "error creating project",
        feedData: null,
      };
    }

    set((state) => ({
      feedData: deleteProjectData(state.feedData, projectId),
    }));

    return {
      status: "success",
      feedData: get().feedData,
    }

  },
}));

// Función para verificar si un proyecto ya existe por su nombre
const doesProjectExist = (feedData: ProjectGroup[], projectName: string | null): boolean => {
  return feedData.some((group) =>
    group.items.some((item) => item.name === projectName)
  );
};

const getProjectsCount = (feedData: ProjectGroup[]): number => {
  return feedData.reduce((acc, group) => acc + group.items.length, 0);
};

const updateFeedData = (feedData: ProjectGroup[], project: Project): ProjectGroup[] => {
  const today = "Today";

  const existingGroupIndex = feedData.findIndex(
    (group) => group.lastEdited === today
  );

  if (existingGroupIndex >= 0) {
    return feedData.map((group, index) => {
      if (index === existingGroupIndex) {
        const updatedItems = [project, ...group.items];
        return { ...group, items: updatedItems };
      }
      return group;
    });
  }

  const newGroup: ProjectGroup = {
    lastEdited: today,
    items: [project],
  };

  return [newGroup, ...feedData];
};



// Otras funciones no cambiadas
const updateProjectData = (feedData: ProjectGroup[], updatedProject: ProjectUpdate): ProjectGroup[] => {
  return feedData.map((group) => ({
    ...group,
    items: group.items.map((project) =>
      project.id === updatedProject.id ? { ...project, ...updatedProject } : project
    ),
  }));
};

const deleteProjectData = (feedData: ProjectGroup[], projectId: string): ProjectGroup[] => {
  return feedData
    .map((group) => ({
      ...group,
      items: group.items.filter((project) => project.id !== projectId),
    }))
    .filter((group) => group.items.length > 0);
};

export default useFeedStore;
