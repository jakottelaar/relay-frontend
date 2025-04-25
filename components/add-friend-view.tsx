import { Button } from "./ui/button";
import { Input } from "./ui/input";

const AddFriendView = () => {
  return (
    <div className="flex h-full w-full flex-col">
      <h1 className="text-xl font-semibold">Add Friend</h1>
      <p className="text-muted-foreground mt-1 mb-2 text-sm">
        To add a friend, enter their username below.
      </p>
      <div className="flex w-full flex-row">
        <Input placeholder="Username" />
        <Button className="ml-2 cursor-pointer bg-indigo-500 text-white duration-200 hover:bg-indigo-600">
          Add Friend
        </Button>
      </div>
    </div>
  );
};

export default AddFriendView;
