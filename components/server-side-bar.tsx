import { UserPlus } from "lucide-react";

export default function ServerSideBar() {
  return (
    <div className="top-0 left-0 flex h-full w-[300px] flex-col border-r px-3 py-1">
      <div className="flex flex-row items-center justify-between">
        <h1 className="font-semibold">Server name</h1>
        <UserPlus className="h-5 w-5" />
      </div>
    </div>
  );
}
