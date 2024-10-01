import Profile from "./Profile";
import Projects from "./Projects";


export default function Aside() {
  return (
    <aside className="w-1/4 h-screen bg-background border-t-transparent border-b-transparent border-l-transparent border border-[#434343] pl-3 flex flex-col">
        <Profile />
        <Projects />
    </aside>
  );
}