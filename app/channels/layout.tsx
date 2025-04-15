import MainSideBar from "@/components/main-side-bar";
const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen w-screen flex-row bg-zinc-900">
      <MainSideBar />
      <div className="flex-1 px-2 py-3">{children}</div>
    </div>
  );
};

export default MainLayout;
