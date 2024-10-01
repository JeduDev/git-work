import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/misc/dropdown-menu";
import { Edit, Eye, Trash } from "lucide-react";
import useDocumentStore from "../stores/documentStore";
import usePanelStore from "../stores/panelStore";

export default function DocumentDropDownMenu({
  className,
  documentId,
  children,
}: {
  className?: string;
  documentId: string;
  children: React.ReactNode;
}) {
  const setModalOpened = useDocumentStore((state) => state.setModalOpened);
  const setModalMenu = useDocumentStore((state) => state.setModalMenu);
  const setCurrentDocument = useDocumentStore(
    (state) => state.setCurrentDocument
  );
  const deleteDocument = usePanelStore((state) => state.deleteDocument);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className={className}>
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        onClick={(e) => e.stopPropagation()}
      className="w-56 bg-[#0c0c0c] text-white border-gray-500/50 py-2">
        <DropdownMenuLabel>Document actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={async (e) => {
            e.stopPropagation();
            setModalMenu("view");
            setModalOpened(true);
            await setCurrentDocument(documentId);
          }}
          className="hover:bg-gray-500/20 cursor-pointer"
        >
          <Eye className="mr-2 h-4 w-4" />
          <span>View</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={async (e) => {
            e.stopPropagation();
            setModalMenu("edit");
            setModalOpened(true);
            await setCurrentDocument(documentId);
          }}
          className="hover:bg-gray-500/20 cursor-pointer"
        >
          <Edit className="mr-2 h-4 w-4" />
          <span>Edit</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={(e) => {
            e.stopPropagation();
            setModalOpened(false);
            deleteDocument(documentId);
          }}
          className="hover:bg-red-500/20 cursor-pointer text-red-600"
        >
          <Trash className="mr-2 h-4 w-4 " />
          <span>Remov ese</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
