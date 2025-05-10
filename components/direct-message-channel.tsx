import { Phone, UserPlus, Video } from "lucide-react";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function DirectMessageChannel({
  params,
}: {
  params: { serverId: string; channelId: string };
}) {
  const { serverId, channelId } = params;

  const mockMessages = [
    { id: 1, text: "Hello!", sender: "User1", timestamp: "10:00 AM" },
    { id: 2, text: "Hi there!", sender: "User2", timestamp: "10:01 AM" },
    { id: 3, text: "How are you?", sender: "User1", timestamp: "10:02 AM" },
    {
      id: 4,
      text: "I'm good, thanks!",
      sender: "User2",
      timestamp: "10:03 AM",
    },
    { id: 5, text: "What about you?", sender: "User2", timestamp: "10:04 AM" },
    {
      id: 6,
      text: "I'm doing well too!",
      sender: "User1",
      timestamp: "10:05 AM",
    },
    { id: 7, text: "Great to hear!", sender: "User2", timestamp: "10:06 AM" },
    {
      id: 8,
      text: "Let's catch up soon.",
      sender: "User1",
      timestamp: "10:07 AM",
    },
    { id: 9, text: "Definitely!", sender: "User2", timestamp: "10:08 AM" },
    {
      id: 10,
      text: "Looking forward to it.",
      sender: "User1",
      timestamp: "10:09 AM",
    },
    { id: 11, text: "Me too!", sender: "User2", timestamp: "10:10 AM" },
    {
      id: 12,
      text: "What time works for you?",
      sender: "User1",
      timestamp: "10:11 AM",
    },
    {
      id: 13,
      text: "How about this weekend?",
      sender: "User2",
      timestamp: "10:12 AM",
    },
    { id: 14, text: "Sounds good!", sender: "User1", timestamp: "10:13 AM" },
    {
      id: 15,
      text: "Let's finalize the details later.",
      sender: "User2",
      timestamp: "10:14 AM",
    },
    { id: 16, text: "Sure!", sender: "User1", timestamp: "10:15 AM" },
    {
      id: 17,
      text: "Talk to you later.",
      sender: "User2",
      timestamp: "10:16 AM",
    },
    { id: 18, text: "Bye!", sender: "User1", timestamp: "10:17 AM" },
    { id: 19, text: "See you!", sender: "User2", timestamp: "10:18 AM" },
    { id: 20, text: "Take care!", sender: "User1", timestamp: "10:19 AM" },
    { id: 21, text: "You too!", sender: "User2", timestamp: "10:20 AM" },
    {
      id: 22,
      text: "Have a great day!",
      sender: "User1",
      timestamp: "10:21 AM",
    },
    {
      id: 23,
      text: "Thanks! You as well.",
      sender: "User2",
      timestamp: "10:22 AM",
    },
    {
      id: 24,
      text: "Catch you later!",
      sender: "User1",
      timestamp: "10:23 AM",
    },
    { id: 25, text: "Bye for now!", sender: "User2", timestamp: "10:24 AM" },
    { id: 26, text: "See you soon!", sender: "User1", timestamp: "10:25 AM" },
    {
      id: 27,
      text: "Looking forward to it!",
      sender: "User2",
      timestamp: "10:26 AM",
    },
    {
      id: 28,
      text: "Take care until then.",
      sender: "User1",
      timestamp: "10:27 AM",
    },
    { id: 29, text: "Will do!", sender: "User2", timestamp: "10:28 AM" },
    { id: 30, text: "Alright, bye!", sender: "User1", timestamp: "10:29 AM" },
  ];

  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-2">
        <div className="flex items-center gap-2">
          <p className="text-sm text-zinc-400">Server ID: {serverId}</p>
          <p className="text-sm text-zinc-400">Channel ID: {channelId}</p>
        </div>
        <div className="flex items-center gap-2">
          <Phone height={20} width={20} />
          <Video height={20} width={20} />
          <UserPlus height={20} width={20} />
        </div>
      </div>
      <ScrollArea className="flex-1 overflow-hidden">
        {mockMessages.map((message) => (
          <div key={message.id} className="my-2 flex flex-row px-4 py-2">
            <Avatar>
              <AvatarFallback>
                {message.sender.charAt(0).toUpperCase()}
              </AvatarFallback>
              <AvatarImage></AvatarImage>
            </Avatar>
            <div className="flex flex-col pl-2">
              <div className="flex flex-row items-center gap-2">
                <p className="text-sm font-semibold text-white">
                  {message.sender}
                </p>
                <p className="text-xs text-zinc-400">{message.timestamp}</p>
              </div>
              <p className="text-sm">{message.text}</p>
            </div>
          </div>
        ))}
      </ScrollArea>
      <Input
        className="mt-2 w-full rounded-md border-none text-white placeholder:text-zinc-400 focus-visible:ring-0 focus-visible:outline-none"
        placeholder={`Message @username`}
        type="text"
      />
    </div>
  );
}
