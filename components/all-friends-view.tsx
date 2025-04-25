import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";

const AllFriendsView = () => {
  return (
    <div className="flex h-full w-full flex-col">
      <Input placeholder="Search" className="mb-4" />
      <h1 className="mb-2 text-sm font-semibold">All Friends - </h1>
      <ScrollArea className="h-full w-full"></ScrollArea>
    </div>
  );
};

export default AllFriendsView;
