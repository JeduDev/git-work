import { getDocumentDataById } from "@/mockData";
import { create } from "zustand";

interface Document {
    id?: string;
    name?: string;
    description?: string;
    thumbnail?: string;
    createdAt?: Date;
    part?: number;
    branch?: string;
    content?: any;
}

interface DocumentStore {
    currentDocument: Document | null;
    setDocumentData: (currentDocument?: Document) => void;
    modalOpened: boolean;
    isLoading: boolean;
    setModalOpened: (modalOpened: boolean) => void;
    modalMenu: "view" | "new" | "edit";
    setModalMenu: (modalMenu: "view" | "new" | "edit") => void;
    setCurrentDocument: (documentId: string) => void;
}

const useDocumentStore = create<DocumentStore>((set, get) => ({
    currentDocument: null,
    setDocumentData: (currentDocument?: Document) => set({ currentDocument }),
    modalOpened: false,
    isLoading: false,
    modalMenu: "view",
    setModalMenu: (modalMenu: "view" | "new" | "edit") => set({ modalMenu }),
    setModalOpened: (modalOpened: boolean) => set({ modalOpened }),
    setCurrentDocument: async (documentId: string) => {

        set({ isLoading: true });

        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        const data = getDocumentDataById(documentId);

        if (data) {
            set({ currentDocument: data });
            set({ isLoading: false });
        }

    }
}));

export default useDocumentStore;