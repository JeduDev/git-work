import React, { useState } from "react";
import useNewProjectStore from "../stores/newProjectStore";
import { CircleCheck, CircleX, Image } from "lucide-react";
import useFeedStore from "../stores/feedStore";
import usePanelStore from "../stores/panelStore";
import { toast, Toaster } from "sonner";

export default function NewProject() {
  const projectInfo = useNewProjectStore((state) => state.projectInfo);
  const updateName = useNewProjectStore((state) => state.updateName);
  const updateDescription = useNewProjectStore((state) => state.updateDescription);
  const updateThumbnail = useNewProjectStore((state) => state.updateThumbnail);
  const clear = useNewProjectStore((state) => state.clear);

  const setSubmenuSelected = usePanelStore((state) => state.setSubmenuSelected);
  const setMenuSelected = usePanelStore((state) => state.setMenuSelected);
  const setProjectSelected = useFeedStore((state) => state.setProjectSelected);
  const setProjectId = usePanelStore((state) => state.setProjectId);

  const addNewProject = useFeedStore((state) => state.addNewProject);

  const [ error, setError ] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-3 ">
      <Toaster />
      <span className="text-gray-400 text-[14px]">Title</span>
      <input
        required
        className=" text-gray-300 rounded-md bg-gray-500/10 text-[14px] pl-2 py-2 outline-none"
        placeholder="Title"
        value={projectInfo?.name}
        onChange={(e) => updateName(e.target.value)}
      />

      <span className="text-gray-400 text-[14px] mt-3">Description</span>
      <textarea
        required
        className=" text-gray-300 rounded-md bg-gray-500/10 text-[14px] pl-2 py-2 outline-none h-[120px] resize-none"
        placeholder="Description"
        value={projectInfo?.description}
        onChange={(e) => updateDescription(e.target.value)}
      />

      <span className="text-gray-400 text-[14px] mt-3">Thumbnail</span>
      <div className="flex flex-row gap-3 items-end pl-2 py-1">
        <div className="flex items-center justify-center">
          {
            projectInfo?.thumbnail !== "" ? (
              <img
                src={projectInfo?.thumbnail}
                alt="project logo"
                className="w-32 h-32 border border-gray-600 bg-gray-500/10 rounded-md"
                draggable={false}
              />
            ) : (
              <Image
                strokeWidth={0.4}
                className="w-32 text-gray-400 h-32 border border-gray-600 bg-gray-500/10 rounded-md font-light"
              />
            )
          }
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-gray-500 text-[14px] mt-3">Upload file</span>

          <input
            accept="image/*"
            required
            type="file"
            className="file:hidden bg-[#222324] text-white hover:bg-gray-300/20 transition cursor-pointer rounded-lg py-2 px-4"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                const file = e.target.files[0];
                const reader = new FileReader();
                reader.onload = (e) => {
                  console.log(e.target?.result);
                  updateThumbnail(e.target?.result as string);
                };
                reader.readAsDataURL(file);
              }
            }}
          />
        </div>
      </div>
      <span className="text-red-500 text-[14px] py-1">
      {error && error}
      </span>

      <div className="flex pt-5">
        <button 
          onClick={() => {
            const data = addNewProject({
              name: projectInfo?.name || '',
              description: projectInfo?.description || '',
              thumbnail: projectInfo?.thumbnail || ' ',
              id: null
            });

            if (data.status === "error creating project") {
              toast.error("There was an error creating the project",{
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
                }
              });
              return;
            } else if (data.status === "success") {
              toast.success("Project created successfully",{
                position: "top-right",
                cancel: true,
                icon: <CircleCheck className="w-6 h-6 text-green-400 mr-4" />,
                style: {
                  background: "#101010",
                  color: "white",
                  alignItems: "center",
                  fontSize: "12px",
                  gap: "10px",
                  display: "flex",
                  border: "1px solid transparent",
                }
              });
            }

            if (data.status === "name already exists") {
              setError("Name of project already exists");
            } else if (data.status === "max project reached") {
              setError("Max projects reached");
            } else {
              setError(null);
              setProjectId(data.id || '');
              setProjectSelected(data.id || '');
              setMenuSelected("overview");
              setSubmenuSelected("about");
              clear();
            }
          }}
        className="py-2 px-4 border h-[40px] w-[200px] flex items-center justify-center rounded-md text-white hover:bg-gray-50/10 cursor-pointer transition">
          Create Project
        </button>
      </div>
    </div>
  );
}
