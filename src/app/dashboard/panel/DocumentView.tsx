"use client";
import React, { useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
} from "@/components/misc/drawer";
import useDocumentStore from "../stores/documentStore";
import { Check, Loader, Pencil, PlusCircle, Trash, X } from "lucide-react";
import "react-quill/dist/quill.snow.css";
import "./editor.css";
import ReactQuill from "react-quill";
import usePanelStore from "../stores/panelStore";

export default function DocumentView() {
  const modalOpened = useDocumentStore((state) => state.modalOpened);
  const modalMenu = useDocumentStore((state) => state.modalMenu);

  const getContentByMenu = () => {
    switch (modalMenu) {
      case "view":
        return <View />;
      case "new":
        return <New />;
      case "edit":
        return <Edit />;
      default:
        return null;
    }
  };

  return (
    <Drawer direction="right" open={modalOpened} dismissible={false}>
      <DrawerContent className="bg-[#131313] select-none h-full w-[520px] border-gray-500/50 rounded-none">
        {getContentByMenu()}
      </DrawerContent>
    </Drawer>
  );
}

// Componente para ver el documento
const View = () => {
  const isLoading = useDocumentStore((state) => state.isLoading);
  const setModalOpened = useDocumentStore((state) => state.setModalOpened);
  const currentDocument = useDocumentStore((state) => state.currentDocument);
  const setModalMenu = useDocumentStore((state) => state.setModalMenu);
  const deleteDocument = usePanelStore((state) => state.deleteDocument);

  return (
    <DrawerHeader className="text-white py-1 flex flex-col gap-4 overflow-y-auto h-full">
      <div className="w-full justify-between flex flex-row px-4 items-center">
        <div className="flex flex-row items-center gap-2 w-full">
          {isLoading ? (
            <div className="w-full h-full flex items-center justify-center rounded-lg py-2 animate-pulse gap-5">
              <div className="w-8 h-8 rounded-md bg-gray-200/50 animate-pulse" />
              <div className="w-full h-8 rounded-md bg-gray-400/50 animate-pulse px-6" />
            </div>
          ) : (
            <>
              <img
                src={currentDocument?.thumbnail}
                className="w-8 h-8 rounded-md"
                alt="Thumbnail"
              />
              <span className="font-semibold text-[22px] flex flex-row items-center gap-1">
                {currentDocument?.name}
                <strong className="font-light text-[14px] text-gray-200">
                  {currentDocument?.part}
                </strong>
              </span>
            </>
          )}
        </div>
        <button
          onClick={() => setModalOpened(false)}
          className="p-2 rounded-full hover:bg-gray-500/20 transition border border-gray-500/50"
        >
          <X className="w-4 h-4 text-white" />
        </button>
      </div>

      <div className="flex flex-row gap-4 px-4 items-center justify-between">
        <div className="flex flex-row items-center justify-between gap-3">
          {isLoading ? (
            <>
              <span className="text-gray-400 text-[14px] py-4 px-5 rounded-md font-regular text-balance bg-[#26282a] animate-pulse" />
              <span className="text-gray-400 text-[14px] py-4 px-8 rounded-md font-regular text-balance bg-[#26282a] animate-pulse mx-10" />
            </>
          ) : (
            <>
              <span className="text-gray-400 text-[14px] py-1 px-2 rounded-md font-regular text-balance bg-[#26282a]">
                Main
              </span>
              <span className="text-gray-400 text-[14px] py-1 px-2 rounded-md font-regular text-balance bg-[#26282a]">
                23/9/2024
              </span>
            </>
          )}
        </div>

        {isLoading ? (
          <div className="h-full flex items-center justify-center rounded-lg py-2 px-3 ">
            <Loader className="animate-spin h-4 w-4" />
          </div>
        ) : (
          <div className="flex flex-row items-center gap-5">
            <button className="p-2 rounded-full hover:bg-gray-500/20 transition border border-gray-500/50">
              <Pencil
                onClick={() => {
                  setModalMenu("edit");
                  setModalOpened(true);
                }}
                className="w-4 h-4 text-white"
              />
            </button>
            <button
              onClick={() => {
                setModalOpened(false);
                deleteDocument(currentDocument?.id);
              }}
              className="p-2 rounded-full hover:bg-red-500/20 transition border border-red-500/50"
            >
              <Trash className="w-4 h-4 text-red-400" />
            </button>
          </div>
        )}
      </div>

      {isLoading ? (
        <div className="w-full flex items-center justify-center h-[50px] bg-gray-500/10 animate-pulse rounded-lg"></div>
      ) : (
        <span className="text-gray-400 text-[14px] pl-2 py-1 font-regular text-balance">
          {currentDocument?.description}
        </span>
      )}

      {isLoading ? (
        <div className="w-full h-full flex items-center justify-center bg-gray-200/5 rounded-lg py-2 px-3 animate-pulse">
          <Loader className="animate-spin h-6 w-6" />
        </div>
      ) : (
        <div
          className="render bg-gray-400/5 rounded-lg py-2 px-3"
          dangerouslySetInnerHTML={{
            __html: currentDocument?.content,
          }}
        />
      )}
    </DrawerHeader>
  );
};

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

const New = () => {
  const setModalOpened = useDocumentStore((state) => state.setModalOpened);
  const setModalMenu = useDocumentStore((state) => state.setModalMenu);
  const branchs = usePanelStore((state) => state.branchs);
  const addNewDocument = usePanelStore((state) => state.addNewDocument);

  const [data, setData] = useState<Document>({
    id: "",
    name: "",
    description: "",
    thumbnail: "",
    createdAt: new Date(),
    part: 0,
    branch: branchs[0].name,
    content: "",
  });

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = (event) => {
        setData({
          ...data,
          thumbnail: event.target?.result as string, // Guarda la imagen en formato Base64
        });
      };

      reader.readAsDataURL(file); // Lee el archivo como URL en base64
    }
  };

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      [{ align: [] }],
      ["link", "image", "video"],
      ["clean"],
    ],
  };

  return (
    <>
      <DrawerHeader className="text-white py-1 flex flex-col gap-4 overflow-y-auto h-full">
        <div className="w-full justify-between flex flex-row px-4 items-center">
          <div className="flex flex-row items-center gap-2 w-full">
            {data?.thumbnail ? (
              <img
                src={data?.thumbnail}
                className="w-8 h-8 rounded-md"
                alt="Thumbnail"
              />
            ): (<>
              <div className="w-8 h-8 rounded-md cursor-pointer font-light flex items-center justify-center">
                <PlusCircle className="w-6 h-6 text-white" />
              </div>
            
            </>)}

            <input
              onChange={handleThumbnailChange} // Maneja la subida de imagen
              type="file"
              accept="image/*" // Asegúrate de que solo acepte imágenes
              className="text-white text-sm rounded-md w-[30px] h-[30px] opacity-0 absolute  py-2 px-4 outline-none cursor-pointer"
            />

            <input
              value={data?.name}
              onChange={(e) => {
                setData({
                  ...data,
                  name: e.target.value,
                });
              }}
              className="text-white text-sm rounded-md bg-gray-500/20 py-2 px-4 outline-none"
            />
            <input
              type="number"
              value={data?.part}
              onChange={(e) => {
                setData({
                  ...data,
                  part: parseInt(e.target.value),
                });
              }}
              className="text-white text-sm rounded-md bg-gray-500/20 py-2 px-4 outline-none w-[60px]"
            />
          </div>
          <button
            onClick={() => setModalOpened(false)}
            className="p-2 rounded-full hover:bg-gray-500/20 transition border border-gray-500/50"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>

        <div className="flex flex-row gap-4 px-4 items-center justify-between">
          <div className="flex flex-row items-center justify-between gap-3">
            <select
              value={data?.branch}
              onChange={(e) => {
                setData({
                  ...data,
                  branch: e.target.value,
                });
              }}
              className="bg-gray-500/20 rounded-md py-1 px-4 outline-none focus:bg-[#26282a]"
            >
              {branchs.map((branch) => (
                <option key={branch.id} value={branch.name}>
                  {branch.name}
                </option>
              ))}
            </select>

            <span className="text-gray-400 text-[14px] py-1 px-2 rounded-md font-regular text-balance bg-[#26282a]">
              {data?.createdAt?.toLocaleDateString()}
            </span>
          </div>
        </div>

        <textarea
          value={data?.description}
          onChange={(e) => {
            setData({
              ...data,
              description: e.target.value,
            });
          }}
          className="text-gray-400 bg-gray-500/20 rounded-sm outline-none text-[14px] pl-2 py-1 font-regular text-balance"
        />

        <ReactQuill
          defaultValue={data.content}
          onChange={(value) => {
            setData({
              ...data,
              content: value,
            });
          }}
          theme="snow"
          modules={modules}
        />
      </DrawerHeader>

      <DrawerFooter className="h-[110px] w-full border-t border-gray-500/50 text-white flex flex-col items-center">
        <div className="flex flex-row items-center gap-2">
          <button
            onClick={() => {
              setModalMenu("view");
              setModalOpened(false);
              addNewDocument(data);
              setData({
                id: "",
                name: "",
                description: "",
                thumbnail: "",
                createdAt: new Date(),
                part: 0,
                branch: "",
                content: "",
              });
            }}
            className="py-2 px-5 rounded-full bg-white hover:bg-gray-50/80 transition border border-gray-500/50 flex flex-row items-center justify-center gap-2 text-[14px] text-black"
          >
            <Check className="w-4 h-4 text-black" />
            Create
          </button>
          <button
            onClick={() => {
              setModalMenu("view");
              setModalOpened(false);
            }}
            className="py-2 px-5 rounded-full hover:bg-gray-500/20 transition border border-gray-500/50 flex flex-row items-center justify-center gap-2 text-[14px]"
          >
            <X className="w-4 h-4 text-white" />
            Discard
          </button>
        </div>
      </DrawerFooter>
    </>
  );
};

const Edit = () => {
  const isLoading = useDocumentStore((state) => state.isLoading);
  const setModalOpened = useDocumentStore((state) => state.setModalOpened);
  const currentDocument = useDocumentStore((state) => state.currentDocument);
  const setModalMenu = useDocumentStore((state) => state.setModalMenu);

  const setDocumentData = useDocumentStore((state) => state.setDocumentData);
  const branchs = usePanelStore((state) => state.branchs);

  const [data, setData] = useState<Document | null>(currentDocument || null);

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      [{ align: [] }],
      ["link", "image", "video"],
      ["clean"],
    ],
  };

  return (
    <>
      <DrawerHeader className="text-white py-1 flex flex-col gap-4 overflow-y-auto h-full">
        <div className="w-full justify-between flex flex-row px-4 items-center">
          <div className="flex flex-row items-center gap-2 w-full">
            {isLoading ? (
              <div className="w-full h-full flex items-center justify-center rounded-lg py-2 animate-pulse gap-5">
                <div className="w-8 h-8 rounded-md bg-gray-200/50 animate-pulse" />
                <div className="w-full h-8 rounded-md bg-gray-400/50 animate-pulse px-6" />
              </div>
            ) : (
              <>
                <img
                  src={data?.thumbnail}
                  className="w-8 h-8 rounded-md"
                  alt="Thumbnail"
                />
                <input value={data?.thumbnail} type="file" />
                <input
                  value={data?.name}
                  onChange={(e) => {
                    setData({
                      ...data,
                      name: e.target.value,
                    });
                  }}
                  className="text-white text-sm rounded-md bg-gray-500/20 py-2 px-4 outline-none"
                />
                <input
                  value={data?.part}
                  onChange={(e) => {
                    setData({
                      ...data,
                      part: parseInt(e.target.value),
                    });
                  }}
                  className="text-white text-sm rounded-md bg-gray-500/20 py-2 px-4 outline-none w-[60px]"
                />
              </>
            )}
          </div>
          <button
            onClick={() => setModalOpened(false)}
            className="p-2 rounded-full hover:bg-gray-500/20 transition border border-gray-500/50"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>

        <div className="flex flex-row gap-4 px-4 items-center justify-between">
          <div className="flex flex-row items-center justify-between gap-3">
            {isLoading ? (
              <>
                <span className="text-gray-400 text-[14px] py-4 px-5 rounded-md font-regular text-balance bg-[#26282a] animate-pulse" />
                <span className="text-gray-400 text-[14px] py-4 px-8 rounded-md font-regular text-balance bg-[#26282a] animate-pulse" />
              </>
            ) : (
              <>
                <select
                  value={data?.branch}
                  onChange={(e) => {
                    setData({
                      ...data,
                      branch: e.target.value,
                    });
                  }}
                  className="bg-gray-500/20 rounded-md py-1 px-4 outline-none focus:bg-[#26282a]"
                >
                  {branchs.map((branch) => (
                    <option key={branch.id} value={branch.name}>
                      {branch.name}
                    </option>
                  ))}
                </select>

                <span className="text-gray-400 text-[14px] py-1 px-2 rounded-md font-regular text-balance bg-[#26282a]">
                  {data?.createdAt?.toLocaleDateString()}
                </span>
              </>
            )}
          </div>
        </div>

        {isLoading ? (
          <div className="w-full flex items-center justify-center h-[50px] bg-gray-500/10 animate-pulse rounded-lg"></div>
        ) : (
          <textarea
            value={data?.description}
            onChange={(e) => {
              setData({
                ...data,
                description: e.target.value,
              });
            }}
            className="text-gray-400 bg-gray-500/20 rounded-sm outline-none text-[14px] pl-2 py-1 font-regular text-balance"
          />
        )}

        {isLoading ? (
          <div className="w-full h-full flex items-center justify-center bg-gray-200/5 rounded-lg py-2 px-3 animate-pulse">
            <Loader className="animate-spin h-6 w-6" />
          </div>
        ) : (
          <ReactQuill
            defaultValue={data?.content}
            onChange={(value) => {
              setData({
                ...data,
                content: value,
              });
            }}
            theme="snow"
            modules={modules}
          />
        )}
      </DrawerHeader>
      <DrawerFooter className="h-[110px] w-full border-t border-gray-500/50 text-white flex flex-col  items-center">
        <div className="flex flex-row items-center  gap-2">
          <button
            onClick={() => {
              setDocumentData(data || undefined);
              setModalMenu("view");
              setModalOpened(true);
            }}
            className="py-2 px-5 rounded-full bg-white hover:bg-gray-50/80 transition border border-gray-500/50 flex flex-row items-center justify-center gap-2 text-[14px] text-black"
          >
            <Check className="w-4 h-4 text-black" />
            Save
          </button>
          <button
            onClick={() => {
              setModalMenu("view");
              setModalOpened(true);
            }}
            className="py-2 px-5 rounded-full hover:bg-gray-500/20 transition border border-gray-500/50 flex flex-row items-center justify-center gap-2 text-[14px]"
          >
            <X className="w-4 h-4 text-white" />
            Discard
          </button>
        </div>
      </DrawerFooter>
    </>
  );
};
