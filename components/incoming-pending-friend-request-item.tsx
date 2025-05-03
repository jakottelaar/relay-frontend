import { Relationship } from "@/hooks/relationships-hooks";
import { Check, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function IncomingPendingFriendRequestItem(
  props: Relationship & {
    onAccept: () => void;
    onReject: () => void;
  },
) {
  return (
    <div className="flex items-center justify-between border-t py-2">
      <div key={props.id} className="flex flex-row items-center">
        <Avatar className="h-10 w-10">
          <AvatarImage src={props.other_user.avatar_url} />
          <AvatarFallback className="cursor-default">
            {props.other_user.username.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <h1 className="ml-2 cursor-default text-sm font-semibold">
          {props.other_user.username}
        </h1>
      </div>
      <div className="flex gap-2">
        <button
          onClick={props.onAccept}
          className="group cursor-pointer rounded-full p-1 duration-200 hover:bg-zinc-800"
        >
          <Check className="stroke-green-500 group-hover:stroke-green-400" />
        </button>
        <button
          onClick={props.onReject}
          className="group cursor-pointer rounded-full p-1 duration-200 hover:bg-zinc-800"
        >
          <X className="stroke-red-500 group-hover:stroke-red-400" />
        </button>
      </div>
    </div>
  );
}
