import { Relationship } from "@/hooks/relationships-hooks";
import { X } from "lucide-react";

export default function OutgoingPendingFriendRequestItem(
  props: Relationship & {
    onCancel: () => void;
  },
) {
  return (
    <div className="flex items-center justify-between border-b py-2">
      <div className="text-sm font-semibold">{props.other_user_id}</div>
      <button
        onClick={props.onCancel}
        className="group cursor-pointer rounded-full p-1 duration-200 hover:bg-zinc-800"
      >
        <X className="stroke-red-500 group-hover:stroke-red-400" />
      </button>
    </div>
  );
}
