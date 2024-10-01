import { getDocumentsById, getProjectsById } from '@/mockData';
import { create } from 'zustand';

type Document = {
    id?: string;
    name?: string;
    description?: string;
    thumbnail?: string;
    createdAt?: Date;
    part?: number;
    branch?: string;
};

type Branch = {
    id: string;
    name: string;
    createdAt: string;
    status: 'lifted' | 'discard';
};

type Project = {
    name: string;
    thumbnail: string;
    description?: string;
    id?: string;
};

interface PanelState {
    projectInfo: Project | null;
    isLoading: boolean;
    setIsLoading: (isLoading: boolean) => void;
    setProjectInfo: (projectInfo: Project | null) => void;
    submenuSelected: string | 'documents' | 'about' | 'new' | 'edit';
    setSubmenuSelected: (menuSelected: string) => void;
    menuSelected: string | 'overview' | 'new';
    setMenuSelected: (menuSelected: string) => void;
    documentsType: 'list' | 'grid';
    setDocumentsType: (documentsType: 'list' | 'grid') => void;
    documents: Document[];
    addNewDocument: (document: Document) => void;
    deleteDocument: (id?: string) => void;
    branchs: Branch[];
    fetchedDocuments: number;
    documentsToFetch: boolean;
    setProjectId: (projectId: string) => void;
}

const usePanelStore = create<PanelState>((set, get) => ({
    projectInfo: null,
    isLoading: true,
    setIsLoading: (isLoading: boolean) => {
        set({ isLoading })
    },
    setProjectInfo: (projectInfo: Project | null) => {
        set({ projectInfo })
    },
    submenuSelected: "documents",
    setSubmenuSelected: (submenuSelected: string) => {
        set({ submenuSelected })
    },
    menuSelected: "overview",
    setMenuSelected: (menuSelected: string) => {
        console.log(menuSelected)
        set({ menuSelected })
    },
    documentsType: "grid",
    setDocumentsType: (documentsType: 'list' | 'grid') => {
        set({ documentsType })
    },
    documents: [],
    addNewDocument: (document: Document) => {
        set((state) => ({
            documents: [document,...state.documents],
        }));
    },
    deleteDocument: (id?: string) => {
        set((state) => ({
            documents: state.documents.filter((document) => document.id !== id),
        }));
    },
    branchs: [
        {
            id: "1",
            name: "Main",
            createdAt: "2023-03-01",
            status: "lifted",
        },
        {
            id: "2",
            name: "Develop",
            createdAt: "2023-03-02",
            status: "lifted",
        },
        {
            id: "3",
            name: "Develop 2",
            createdAt: "2023-03-02",            
            status: "lifted",
        }
    ],
    fetchedDocuments: 0,
    documentsToFetch: true,
    setProjectId: async (projectId: string | null) => {
        // Restablecer los valores iniciales
        set({ projectInfo: null, documents: [], fetchedDocuments: 0, documentsToFetch: true, isLoading: true });

        const { submenuSelected, setSubmenuSelected } = get();

        if (submenuSelected === "edit") {
            setSubmenuSelected("about");
        }

        try {
            await new Promise((resolve) => setTimeout(resolve, 500));

            const data = getDocumentsById(projectId);
            const getProjectInfo = getProjectsById(projectId);

            // Verificar si los datos son válidos antes de asignar
            if (Array.isArray(data)) {
                set({
                    projectInfo: getProjectInfo, // Solo usamos la propiedad sin "state."
                    documents: [...data],         // Solo usamos la propiedad sin "state."
                    fetchedDocuments: data.length, // Solo usamos la propiedad sin "state."
                    isLoading: false,              // Aseguramos que isLoading se establezca aquí.
                });
            } else {
                set({ isLoading: false }); // Si no es un array, solo actualizamos el estado de carga
            }
        } catch (error) {
            console.error("Error al obtener documentos o información del proyecto", error);
            set({ isLoading: false }); // También restablecemos isLoading en caso de error
        }
    }
    
    
}));

export default usePanelStore;
