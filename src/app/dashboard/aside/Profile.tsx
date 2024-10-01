"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { LucideLogOut, Settings } from "lucide-react";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

const NOT_FOUND = 'Not found';

export default function Profile() {

  const { data: session, status } = useSession();

  return (
    <div className="w-full border border-[#2b2b2b] border-t-transparent border-l-transparent border-r-transparent py-4 flex flex-row items-center gap-2 justify-between select-none">
      <img
        draggable={false}
        className="w-8 h-8 rounded-lg"
        src={session?.user?.image || NOT_FOUND}
        alt="Profile image"
      />
      <span className="text-white text-[12px]">{ session?.user?.name }</span>
      <LogOutButton />
      <SettingsButton />
    </div>
  );
}

const LogOutButton = () => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          onClick={() => signOut()}
        className="p-1 rounded-md hover:bg-gray-50/10 transition">
            <LucideLogOut className="text-white w-[14px] text-[14px] h-[14px]"  />
        </TooltipTrigger>
        <TooltipContent className="bg-slate-950 rounded-sm p-1 border text-[10px] text-white">
          Log Out
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const SettingsButton = () => {
  return (
    <div className="border border-[#b3b3b3] border-t-transparent border-b-transparent border-r-transparent h-5 flex-row flex items-center pl-3 pr-4 ">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger className="p-1 rounded-md hover:bg-gray-50/10 transition">
              <Settings className="text-white  text-[14px] w-[14px] h-[14px]" />
          </TooltipTrigger>
          <TooltipContent className="bg-slate-950 rounded-sm p-1 border text-[10px] text-white">
            Settings
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};
