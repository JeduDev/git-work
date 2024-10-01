"use client";
import React, { useState } from "react";
import usePanelStore from "../stores/panelStore";
import NewProject from "./NewProject";
import {
  CircleCheck,
  CircleX,
  EllipsisVertical,
  LayoutGrid,
  Pencil,
  Plus,
  Rows3,
  Trash,
} from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/misc/dialog";
import useFeedStore from "../stores/feedStore";
import EditProject from "./EditProject";
import { toast, Toaster } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import DocumentDropDownMenu from "./DocumentDropDownMenu";
import useDocumentStore from "../stores/documentStore";

export default function Overview() {
  const submenuSelected = usePanelStore((state) => state.submenuSelected);
  const deleteProject = useFeedStore((state) => state.deleteProject);
  const [confirmText, setConfirmText] = useState<string>("");
  const projectInfo = usePanelStore((state) => state.projectInfo);
  const setProjectSelected = useFeedStore((state) => state.setProjectSelected);
  const setProjectId = usePanelStore((state) => state.setProjectId);
  const setProjectInfo = usePanelStore((state) => state.setProjectInfo);

  const setMenuSelected = usePanelStore((state) => state.setMenuSelected);
  const setSubmenuSelected = usePanelStore((state) => state.setSubmenuSelected);

  const setDocumentsType = usePanelStore((state) => state.setDocumentsType);

  const setModalOpened = useDocumentStore((state) => state.setModalOpened);
  const setModalMenu = useDocumentStore((state) => state.setModalMenu);
  const documentsType = usePanelStore((state) => state.documentsType);

  const renderContent = () => {
    switch (submenuSelected) {
      case "documents":
        return <DocumentsView />;
      case "about":
        return <AboutView />;
      case "new":
        return <NewProject />;
      case "edit":
        return <EditProject />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full h-full flex flex-col gap-1 px-6 overflow-visible select-none ">
      <Toaster />

      <span className="text-white font-bold text-[28px] py-2 flex flex-row items-center ">
        {submenuSelected === "documents" && (
          <div className="flex flex-row items-center justify-between gap-1 w-full">
            <span>Documents</span>
            <div className="flex flex-row ">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setModalOpened(true);
                  setModalMenu("new");
                }}
                className="p-2 rounded-md ml-3 transition hover:bg-gray-500/20 text-gray-400/50 text-[14px] flex flex-row font-regular gap-2 items-center hover:scale-[102%] hover:text-white"
              >
                <Plus fontWeight={6} className="w-6 h-6" />
                New document
              </button>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger
                    onClick={() => {
                      setDocumentsType("list");
                    }}
                    className={`${
                      documentsType === "list"
                        ? "bg-gray-500/20 hover:bg-gray-500/30 text-white"
                        : "hover:bg-gray-500/20 text-gray-400/50 "
                    } p-2 rounded-md ml-3 transition`}
                  >
                    <Rows3 className="w-6 h-6" />
                  </TooltipTrigger>
                  <TooltipContent className="bg-slate-950 rounded-sm p-1 border text-[10px] text-white">
                    Row view
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger
                    onClick={() => {
                      setDocumentsType("grid");
                    }}
                    className={`${
                      documentsType === "grid"
                        ? "bg-gray-500/20 hover:bg-gray-500/30 text-white"
                        : "hover:bg-gray-500/20 text-gray-400/50 "
                    } p-2 rounded-md ml-3 transition`}
                  >
                    <LayoutGrid className="w-6 h-6 " />
                  </TooltipTrigger>
                  <TooltipContent className="bg-slate-950 rounded-sm p-1 border text-[10px] text-white">
                    Grid view
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        )}
        {submenuSelected === "about" && (
          <div className="flex flex-row items-center justify-between gpa-3">
            <span>About the Project</span>
            <button
              onClick={() => {
                setSubmenuSelected("edit");
              }}
              className="p-2 rounded-md hover:bg-gray-500/20 ml-3"
            >
              <Pencil className="w-4 h-4" />
            </button>
            <Dialog
              onOpenChange={() => {
                setConfirmText("");
              }}
            >
              <DialogTrigger asChild>
                <button className="p-2 rounded-md hover:bg-red-500/20">
                  <Trash className="w-4 h-4 text-red-400" />
                </button>
              </DialogTrigger>
              <DialogContent className="bg-[#1a1a1a] select-none">
                <DialogHeader>
                  <DialogTitle className="text-white">
                    Are you sure you want to delete this project?
                  </DialogTitle>
                  <DialogDescription className="text-gray-300 pt-1">
                    This action cannot be undone. This will permanently delete
                    your project.
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
                        const data = deleteProject(projectInfo?.id || "");

                        if (data.status === "error creating project") {
                          toast.error(
                            "There was an error deleting the project",
                            {
                              position: "top-right",
                              cancel: true,
                              icon: (
                                <CircleX className="w-6 h-6 text-red-400 mr-4 font-bold" />
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
                            }
                          );
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
          </div>
        )}
      </span>
      <div className="overflow-y-auto overflow-x-hidden mb-36 flex flex-col gap-2">
        {renderContent()}
      </div>
    </div>
  );
}

const DocumentsView: React.FC = () => {
  const documents = usePanelStore((state) => state.documents);
  const isLoading = usePanelStore((state) => state.isLoading);
  const documentsType = usePanelStore((state) => state.documentsType);
  const setModalMenu = useDocumentStore((state) => state.setModalMenu);
  const setModalOpened = useDocumentStore((state) => state.setModalOpened);

  return (
    <>
      {isLoading ? (
        Array.from({ length: 8 }, (_, index) => (
          <DocumentSkeleton key={index} />
        ))
      ) : documents.length > 0 ? (
        <div
          className={`overflow-y-auto overflow-x-hidden
            ${documentsType === "list" ? "flex flex-col h-full w-full " : ""}
            ${
              documentsType === "grid"
                ? "grid grid-cols-4 gap-5 h-full w-full "
                : ""
            }
          `}
        >
          {documents.map((document: any) => (
            <DocumentItem key={document.id} document={document} />
          ))}
        </div>
      ) : (
        <div className="w-full h-[70vh] flex flex-col gap-5 items-center justify-center">
          <span className=" text-white/75">Documents not found</span>
          <button
            onClick={() => {
              setModalMenu("new");
              setModalOpened(true);
            }}
            className="px-5 py-2 rounded-md bg-white hover:bg-gray-50/80 transition border border-gray-500/50 flex flex-row items-center justify-center gap-2 text-[14px] text-black"
          >
            Create a new document
          </button>
        </div>
      )}
    </>
  );
};

const DocumentItem: React.FC<{ document: any }> = ({ document }) => {
  const documentsType = usePanelStore((state) => state.documentsType);

  const setCurrentDocument = useDocumentStore(
    (state) => state.setCurrentDocument
  );
  const setModalOpened = useDocumentStore((state) => state.setModalOpened);
  const setModalMenu = useDocumentStore((state) => state.setModalMenu);

  if (documentsType === "list") {
    return (
      <div
        onClick={async () => {
          setModalMenu("view");
          setModalOpened(true);
          await setCurrentDocument(document.id);
        }}
        className="w-full py-1 flex flex-row items-center gap-4 px-4 border-b border-gray-500 hover:bg-gray-300/10 hover:scale-[101%]s transition rounded-md cursor-pointer justify-between"
      >
        <div className="flex flex-row gap-5 py-1 items-center ">
          <img
            src={document.thumbnail}
            alt={document.name}
            className="w-8 h-8 rounded-md"
          />
          <div className="flex flex-col py-1">
            <span className="text-white">
              {document.name}{" "}
              <strong className="text-[12px] text-gray-400 font-light">
                / {document.part}
              </strong>
            </span>
            <span className="text-gray-400">{document.description}</span>
          </div>
        </div>
        <div className="flex flex-row items-center gap-2">
          <div className="text-gray-400 text-[14px] py-1 px-2 bg-gray-500/10 rounded-md">
            {new Date(document.createdAt).toLocaleDateString()}
          </div>
          <div className="text-gray-400 text-[14px] py-1 px-2 bg-gray-500/10 rounded-md">
            {document.branch}
          </div>
          <DocumentDropDownMenu
            documentId={document.id}
            className="py-1 px-1 h-[24px] bg-gray-500/10s hover:bg-gray-300/20 rounded-md transition"
          >
            <EllipsisVertical className="text-gray-400 w-6 h-6 hover:text-white transition" />
          </DocumentDropDownMenu>
        </div>
      </div>
    );
  } else {
    return (
      <div
        onClick={async () => {
          setModalMenu("view");
          setModalOpened(true);
          await setCurrentDocument(document.id);
        }}
        className="w-full max-h-[300px] py-4 px-4 rounded-xl bg-[#131313] hover:bg-gray-500/5 hover:scale-[101%]s transition cursor-pointer items-center justify-center flex flex-col"
      >
        <div className="flex flex-col gap-5 py-1 items-center ">
          <img
            src={document.thumbnail}
            alt={document.name}
            className="w-28 h-28 rounded-md"
          />
          <div className="flex flex-col py-1">
            <span className="text-white text-center">
              {document.name}{" "}
              <strong className="text-[12px] text-gray-400 font-light">
                / {document.part}
              </strong>
            </span>
            <span className="text-gray-400 text-center">
              {document.description.length > 40
                ? document.description.slice(0, 40) + " ..."
                : document.description}
            </span>
          </div>
        </div>
        <div className="flex flex-row items-center gap-2 justify-center">
          <div className="text-gray-400 text-[14px] py-1 px-2 bg-gray-500/10 rounded-md">
            {new Date(document.createdAt).toLocaleDateString()}
          </div>
          <div className="text-gray-400 text-[14px] py-1 px-2 bg-gray-500/10 rounded-md">
            {document.branch}
          </div>
          <DocumentDropDownMenu
            documentId={document.id}
            className="py-1 px-1 h-[28px] bg-gray-500/10s hover:bg-gray-300/20 rounded-md transition"
          >
            <EllipsisVertical className="text-gray-400 w-6 h-6 hover:text-white transition" />
          </DocumentDropDownMenu>
        </div>
      </div>
    );
  }
};

const AboutView: React.FC = () => {
  const projectInfo = usePanelStore((state) => state.projectInfo);
  const isLoading = usePanelStore((state) => state.isLoading);

  return isLoading ? (
    <AboutSkeleton />
  ) : (
    <>
      <span className="text-gray-400 text-[14px]">Title</span>
      <span className="font-bold text-white text-[16px] pl-2 py-1">
        {projectInfo?.name}
      </span>
      <span className="text-gray-400 text-[14px] mt-3">Description</span>
      <span className="text-gray-300 text-[14px] pl-2 py-1">
        {projectInfo?.description}
      </span>
      <span className="text-gray-400 text-[14px] mt-3">Thumbnail</span>
      <span className="text-gray-300 text-[14px] pl-2 py-1">
        <img
          src={projectInfo?.thumbnail}
          alt="project logo"
          className="w-32 h-32 border border-gray-600 bg-gray-500/10 rounded-md"
        />
      </span>
    </>
  );
};

//

const AboutSkeleton: React.FC = () => (
  <div className="w-full gap-2 py-3 px-1 border-b border-gray-500 animate-pulse flex flex-col">
    {Array.from({ length: 2 }).map((_, index) => (
      <SkeletonSection key={index} isLast={index === 2} />
    ))}
    <span className="h-4 w-12 bg-[#2f2f2f] rounded-md" />

    <span className="h-36 animate-pulse w-36 bg-[#242424] rounded-md ml-3" />
  </div>
);

const SkeletonSection: React.FC<{ isLast?: boolean }> = ({ isLast }) => (
  <div className="flex flex-col gap-3">
    <span className="h-4 w-12 bg-[#2f2f2f] rounded-md" />
    <span
      className={`h-4 w-36 bg-[#242424] rounded-md ml-3 ${
        isLast ? "h-36" : ""
      }`}
    />
  </div>
);

const DocumentSkeleton: React.FC = () => (
  <div className="w-full flex flex-row items-center gap-2 py-3 px-6 border-b border-gray-500 animate-pulse">
    <div className="w-8 h-8 rounded-md bg-gray-700" />
    <div className="flex flex-col gap-2">
      <span className="h-4 w-24 bg-gray-600 rounded-md" />
      <span className="h-4 w-36 bg-gray-600 rounded-md" />
    </div>
  </div>
);
