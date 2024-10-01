"use client";
import React, { useEffect } from "react";
import { Ellipsis } from "lucide-react";
import useFeedStore from "../stores/feedStore";
import usePanelStore from "../stores/panelStore";
import { mockData } from "@/mockData";
import ProjectDropDownMenu from "./ProjectDropDownMenu";

interface ProjectGroup {
  lastEdited: string;
  items: Project[];
}

type Project = {
  name: string;
  thumbnail: string;
  id: string;
};

interface ProjectGroupProps extends ProjectGroup {
  itemSelected?: string | null;
  onSelect?: (name: string) => void;
}

export default function ProjectFeed() {
  const feedData = useFeedStore((state) => state.feedData);
  const setFeedData = useFeedStore((state) => state.setFeedData);

  const isLoading = useFeedStore((state) => state.isLoading);

  const projectSelected = useFeedStore((state) => state.projectSelected);
  const setProjectSelected = useFeedStore((state) => state.setProjectSelected);

  const setMenuSelected = usePanelStore((state) => state.setMenuSelected);
  const setSubmenuSelected = usePanelStore((state) => state.setSubmenuSelected);
  const menuSelected = usePanelStore((state) => state.menuSelected);
  const setProjectId = usePanelStore((state) => state.setProjectId);

  const setIsLoading = useFeedStore((state) => state.setIsLoading);

  useEffect(() => {
    setTimeout(() => {
      setProjectSelected(mockData[0]?.items[0]?.id || null);
      setFeedData(mockData);
      setProjectId(mockData[0]?.items[0]?.id);
      setIsLoading(false);
    }, 600);
  }, []);

  return (
    <>
      <div className="py-2 h-full overflow-y-auto pr-4">
        <span className="text-[#6b6b6b] font-semibold text-[15px] h-full">
          Projects
        </span>
        <div className="flex flex-col gap-2 h-full">
          <div className="h-full w-full gap-5 flex flex-col">
            {isLoading ? (
              <ProjectFeedSkeleton />
            ) : feedData.length === 0 ? (
              <div className="text-gray-400 text-sm text-center w-full items-center justify-center flex py-6">
                There are no projects available.
              </div>
            ) : (
              feedData.map((group) => (
                <ProjectGroup
                  lastEdited={group.lastEdited}
                  items={group.items}
                  itemSelected={projectSelected}
                  onSelect={setProjectSelected}
                  key={group.lastEdited}
                />
              ))
            )}
            <button
              onClick={() => {
                setMenuSelected("new");
                setSubmenuSelected("new");
                setProjectSelected(null);
              }}
              className={`${
                menuSelected === "new" ? "bg-gray-200/10" : ""
              } w-full border py-3 rounded-xl border-gray-500 flex items-center justify-center transition cursor-pointer hover:bg-gray-50/10 text-gray-400`}
            >
              New project
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export const ProjectGroup = ({
  lastEdited,
  items,
  itemSelected,
  onSelect,
}: ProjectGroupProps) => {
  const setProjectId = usePanelStore((state) => state.setProjectId);
  const setMenuSelected = usePanelStore((state) => state.setMenuSelected);
  const projectInfo = usePanelStore((state) => state.projectInfo);
  const setSubmenuSelected = usePanelStore((state) => state.setSubmenuSelected);
  const submenuSelected = usePanelStore((state) => state.submenuSelected);

  return (
    <div className="flex flex-col select-none">
      <span className="text-gray-50/20 text-[12px] pl-3 pt-2">
        {lastEdited}
      </span>
      <div className="flex flex-col gap-2 w-full">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => {
              onSelect && onSelect(item.id || "");
              setMenuSelected("overview");
              console.log(item.id);
              if (submenuSelected === "new") {
                setSubmenuSelected("about");
              }
              if (projectInfo?.id !== item.id) {
                setProjectId(item.id || "");
              }
            }}
            className={`${
              itemSelected === item.id
                ? "bg-gray-50/20 text-white"
                : "bg-transparent hover:bg-gray-50/10 text-gray-50/50"
            } flex flex-row justify-between w-full py-3 rounded-lg items-center px-3 gap-2 cursor-pointer`}
          >
            <div className="flex flex-row gap-2">
              <img
                alt={item.name}
                draggable={false}
                className="w-6 h-6 rounded-md"
                src={item.thumbnail}
              />
              <div className="w-[140px] text-[14px] whitespace-nowrap overflow-hidden">
                <span>
                  {item.name.length > 17
                    ? item.name.slice(0, 17) + " ..."
                    : item.name}
                </span>
              </div>
            </div>
            <ProjectDropDownMenu className="py-1 " projectSelected={item.id}>
              <Ellipsis className="text-white/50 hover:text-white transition text-[10px] w-[24px] h-[24px]" />
            </ProjectDropDownMenu>
          </div>
        ))}
      </div>
    </div>
  );
};

const ProjectFeedSkeleton = () => (
  <div className="w-full flex flex-col gap-3">
    <div className="w-[60%] h-[10px] rounded-full bg-gray-50/10 animate-pulse" />
    <div className="bg-gray-50/20 rounded-lg h-[45px] w-full animate-pulse" />
    <div className="bg-gray-50/20 rounded-lg h-[45px] w-full animate-pulse" />
    <div className="w-[60%] h-[10px] rounded-full bg-gray-50/10 animate-pulse" />
    <div className="bg-gray-50/20 rounded-lg h-[45px] w-full animate-pulse" />
    <div className="bg-gray-50/20 rounded-lg h-[45px] w-full animate-pulse" />
    <div className="bg-gray-50/20 rounded-lg h-[45px] w-full animate-pulse" />
    <div className="bg-gray-50/20 rounded-lg h-[45px] w-full animate-pulse" />
    <div className="w-[60%] h-[10px] rounded-full bg-gray-50/10 animate-pulse" />
    <div className="bg-gray-50/20 rounded-lg h-[45px] w-full animate-pulse" />
  </div>
);
