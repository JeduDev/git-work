import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/misc/dropdown-menu";
import { CircleCheck, CircleX, Edit, Eye, Trash } from "lucide-react";
import usePanelStore from "../stores/panelStore";
import useFeedStore from "../stores/feedStore";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/misc/dialog";
import { toast } from "sonner";

export default function ProjectDropDownMenu({
  className,
  projectSelected,
  children,
}: {
  className?: string;
  children: React.ReactNode;
  projectSelected?: string;
}) {
  const setProjectSelected = useFeedStore((state) => state.setProjectSelected);
  const setMenuSelected = usePanelStore((state) => state.setMenuSelected);
  const setSubmenuSelected = usePanelStore((state) => state.setSubmenuSelected);
  const setProjectId = usePanelStore((state) => state.setProjectId);

  const [open, setOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className={className}>
          {children}
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 bg-[#0c0c0c] text-white border-gray-500/50 py-2">
          <DropdownMenuLabel>Project actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation();
              setProjectSelected(projectSelected || "");
              setProjectId(projectSelected || "");
              setSubmenuSelected("about");
            }}
            className="hover:bg-gray-500/20 cursor-pointer"
          >
            <Eye className="mr-2 h-4 w-4" />
            <span>View information</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={async (e) => {
              e.stopPropagation();
              await setProjectId(projectSelected || "");
              setProjectSelected(projectSelected || "");
              setMenuSelected("overview");  
              setSubmenuSelected("edit");
            }}
            className="hover:bg-gray-500/20 cursor-pointer"
          >
            <Edit className="mr-2 h-4 w-4" />
            <span>Edit information</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              setOpen(true);
            }}
            className="hover:bg-red-500/20 cursor-pointer text-red-600"
          >
            <Trash className="mr-2 h-4 w-4 " />
            <span>Remove</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <MenuDeleteProject open={open} setOpen={setOpen} />
    </>
  );
}

const MenuDeleteProject = ({ open, setOpen }: { open: boolean, setOpen: any }) => {
  const [confirmText, setConfirmText] = useState<string>("");
  const projectInfo = usePanelStore((state) => state.projectInfo);
  const setProjectSelected = useFeedStore((state) => state.setProjectSelected);
  const setMenuSelected = usePanelStore((state) => state.setMenuSelected);
  const setSubmenuSelected = usePanelStore((state) => state.setSubmenuSelected);
  const setProjectId = usePanelStore((state) => state.setProjectId);
  const setProjectInfo = usePanelStore((state) => state.setProjectInfo);

  const deleteProject = useFeedStore((state) => state.deleteProject);

  return (
    <Dialog
      open={open}
      defaultOpen={false}
      onOpenChange={() => {
        setConfirmText("");
      }}
    >
      <DialogContent onInteractOutside={()=>{
        setOpen(false)
      }} setOpen={setOpen} className="bg-[#1a1a1a] select-none">
        <DialogHeader>
          <DialogTitle className="text-white">
            Are you sure you want to delete this project?
          </DialogTitle>
          <DialogDescription className="text-gray-300 pt-1">
            This action cannot be undone. This will permanently delete your
            project.
          </DialogDescription>
          <div className="text-gray-200 pt-1">
            All the data related to this project will be deleted.
            <ul className="list-disc pl-4 pt-2 text-gray-400 text-[14px]">
              <li>Documents</li>
              <li>Branches</li>
            </ul>
          </div>
          <DialogDescription className="text-gray-300 pt-1">
            If you are sure to delete this project, type
            <span className="text-red-400 mx-1 py-1 px-2 font-semibold rounded-md bg-gray-500/20  select-text">
              remove this project
            </span>
            to confirm.
          </DialogDescription>
          <input
            value={confirmText}
            onChange={(e) => {
              setConfirmText(e.target.value);
            }}
            className="text-white text-sm rounded-md bg-gray-500/20 py-2 px-4 outline-none"
            placeholder='Type "remove this project" to confirm'
          />
          <div className="flex w-full justify-end">
            <DialogClose
              disabled={confirmText !== "remove this project"}
              className="p-2 "
              onClick={() => {
                setOpen(false)
                const data = deleteProject(projectInfo?.id || "");

                if (data.status === "error creating project") {
                  toast.error("There was an error deleting the project", {
                    position: "top-right",
                    cancel: true,
                    icon: <CircleX className="w-6 h-6 text-red-400 mr-4" />,
                    style: {
                      background: "#101010",
                      color: "white",
                      alignItems: "center",
                      fontSize: "12px",
                      gap: "10px",
                      display: "flex",
                      border: "1px solid transparent",
                    },
                  });
                  return;
                } else if (data.status === "success") {
                  toast.success("Project deleted successfully", {
                    position: "top-right",
                    cancel: true,
                    icon: (
                      <CircleCheck className="w-6 h-6 text-green-400 mr-4" />
                    ),
                    style: {
                      background: "#101010",
                      color: "white",
                      alignItems: "center",
                      fontSize: "12px",
                      gap: "10px",
                      display: "flex",
                      border: "1px solid transparent",
                    },
                  });
                }

                if (
                  !data?.feedData ||
                  data.feedData.length < 1 ||
                  data.feedData[0]?.items.length < 1
                ) {
                  setProjectInfo(null);
                  setMenuSelected("new");
                  setSubmenuSelected("new");
                  setProjectId(" ");
                } else {
                  setConfirmText("");
                  const firstProject = data.feedData[0]?.items[0];

                  if (firstProject) {
                    setProjectInfo(null);
                    setProjectSelected(firstProject.id);
                    setProjectId(firstProject.id);
                  }
                }
              }}
            >
              <span
                className={`${
                  confirmText === "remove this project"
                    ? "bg-red-600 hover:bg-red-700 text-white"
                    : "bg-red-700/50"
                } text-white px-3 py-2 transition rounded-md`}
              >
                Remove
              </span>
            </DialogClose>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
