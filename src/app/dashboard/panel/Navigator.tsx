"use client";
import React from "react";
import usePanelStore from "../stores/panelStore";

const ProjectSkeleton = () => (
  <div className="flex flex-row items-center gap-2 py-4">
    <div className="w-8 h-8 bg-[#272727] rounded-md animate-pulse" />
    <span className="text-[20px] font-semibold text-gray-500 bg-[#353535] w-[400px] h-6 rounded-md animate-pulse" />
  </div>
);

export default function Navigator() {
  const setSubmenuSelected = usePanelStore((state) => state.setSubmenuSelected);
  const submenuSelected = usePanelStore((state) => state.submenuSelected);
  const menuSelected = usePanelStore((state) => state.menuSelected);
  const projectInfo = usePanelStore((state) => state.projectInfo);

  const isLoading = !projectInfo || !projectInfo.name || !projectInfo.thumbnail;

  if (menuSelected === "overview") {
    return (
      <nav className="w-full px-6">
        {isLoading ? (
          <ProjectSkeleton />
        ) : (
          <div className="flex flex-row items-center gap-2 py-4">
            <img
              src={projectInfo.thumbnail}
              alt="project logo"
              className="w-8 h-8 rounded-md"
            />
            <span className="text-[20px] font-semibold text-white">
              {projectInfo.name}
            </span>
          </div>
        )}
        <div className="flex flex-row items-center gap-2 border-[#2b2b2b] border py-4 border-l-transparent border-r-transparent">
          <button
            onClick={() => setSubmenuSelected("documents")}
            className={`${
              submenuSelected === "documents"
                ? "text-white bg-[#272727] py-1 px-3 font-light text-[15px] rounded-md"
                : "bg-transparent hover:bg-[#272727]/75 text-[#646364] py-1 px-3 font-light text-[15px] rounded-md"
            }`}
          >
            Documents
          </button>
          <button
            onClick={() => setSubmenuSelected("about")}
            className={`${
              submenuSelected === "about"
                ? "text-white bg-[#272727] py-1 px-3 font-light text-[15px] rounded-md"
                : "bg-transparent hover:bg-[#272727]/75 text-[#646364] py-1 px-3 font-light text-[15px] rounded-md"
            }`}
          >
            About the Project
          </button>
        </div>
      </nav>
    );
  } else {
    return (
      <nav className="w-full px-6">
        <div className="flex flex-row items-center gap-2 py-4">
          <div className="w-8 h-8 rounded-md border border-gray-400 text-gray-500 flex items-center justify-center text-2xl bg-white">
            +
          </div>
          <span className="text-[20px] font-semibold text-white">
            New Project
          </span>
        </div>
        <div className="flex flex-row items-center gap-2 border-[#2b2b2b] border py-4 border-l-transparent border-r-transparent">
          <button className="text-white bg-[#272727] py-1 px-3 font-light text-[15px] rounded-md">
            About the Project
          </button>
        </div>
      </nav>
    );
  }
}
