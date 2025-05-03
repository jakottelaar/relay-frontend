import { Relationship } from "@/hooks/relationships-hooks";
import { Check, X } from "lucide-react";

export default function IncomingPendingFriendRequestItem(
  props: Relationship & {
    onAccept: () => void;
    onReject: () => void;
  },
) {
  return (
    <div className="flex items-center justify-between border-b py-2">
      <div className="text-sm font-semibold">{props.other_user_id}</div>
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
