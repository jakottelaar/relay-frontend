"use client";
import { useState } from "react";

const MainSideBar = () => {
  const [activeId, setActiveId] = useState("direct-messages");

  const mockServers = [
    { id: "server1", name: "Gaming", icon: "🎮" },
    { id: "server2", name: "Music", icon: "🎵" },
    { id: "server3", name: "Study", icon: "📚" },
    { id: "server4", name: "Movies", icon: "🎬" },
  ];

  const handleSelect = (id: string) => {
    setActiveId(id);
  };

  return (
    <div className="top-0 left-0 flex h-full flex-col py-3 pe-1">
      <div className="group relative mb-4 flex items-center">
        <div
          className={`me-2 h-0 w-1 rounded-r-md bg-white transition-all duration-200 group-hover:h-6 group-hover:opacity-100 ${
            activeId === "direct-messages" ? "h-8 opacity-100" : "opacity-0"
          }`}
        />

        <div
          className="cursor-pointer"
          onClick={() => handleSelect("direct-messages")}
        >
          <svg
            className="h-10 w-10 transition-all duration-200"
            data-logo="logo"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 40 40"
          >
            <g id="logogram" transform="translate(0, 0)">
              <path
                d="M0 20C0 10.572 9.53674e-07 5.857 2.929 2.929C5.857 9.53674e-07 10.571 0 20 0C29.428 0 34.142 9.53674e-07 37.071 2.929C40 5.857 40 10.572 40 20C40 29.428 40 34.142 37.071 37.071C34.142 40 29.428 40 20 40C10.571 40 5.857 40 2.929 37.071C9.53674e-07 34.142 0 29.428 0 20Z"
                className={`transition-colors duration-200 ease-in-out ${
                  activeId === "direct-messages"
                    ? "fill-indigo-600"
                    : "fill-zinc-700 hover:fill-indigo-600"
                }`}
              />
              <path
                d="M26.668 17.6251C27.528 17.3941 27.68 16.2381 26.909 15.7931L26.402 15.5001C25.923 15.2241 25.752 14.6 26.138 14.205C26.544 13.789 27.039 13.4641 27.591 13.2561C28.457 12.9301 29.409 12.914 30.285 13.212C31.162 13.509 31.908 14.1021 32.396 14.8871C32.885 15.6731 33.086 16.604 32.965 17.522C32.845 18.439 32.409 19.2871 31.734 19.9191C31.059 20.5521 30.185 20.9311 29.261 20.9911C28.338 21.0521 27.422 20.7901 26.67 20.2511C26.191 19.9081 25.797 19.4651 25.512 18.9591C25.242 18.4771 25.568 17.9191 26.102 17.7761L26.668 17.6251ZM13.897 17.7761C14.431 17.9191 14.757 18.4771 14.487 18.9591C14.202 19.4651 13.808 19.9081 13.329 20.2511C12.577 20.7901 11.661 21.0521 10.738 20.9911C9.81499 20.9311 8.94098 20.5521 8.26498 19.9191C7.58998 19.2871 7.15499 18.439 7.03399 17.522C6.91299 16.604 7.114 15.6731 7.603 14.8871C8.091 14.1021 8.83799 13.509 9.71399 13.212C10.59 12.914 11.542 12.9301 12.409 13.2561C12.96 13.4641 13.455 13.789 13.861 14.205C14.247 14.6 14.076 15.2241 13.598 15.5001L13.09 15.7931C12.319 16.2381 12.471 17.3941 13.331 17.6251L13.897 17.7761ZM23.999 26.0001C24.552 26.0001 25.01 26.4521 24.9 26.9931C24.706 27.9491 24.235 28.835 23.535 29.535C22.597 30.473 21.326 31.0001 19.999 31.0001C18.673 31.0001 17.402 30.473 16.464 29.535C15.764 28.835 15.293 27.9491 15.099 26.9931C14.989 26.4521 15.447 26.0001 15.999 26.0001H23.999Z"
                className="fill-white transition-colors duration-200 ease-in-out"
              />
            </g>
          </svg>
        </div>
      </div>

      {/* Divider */}
      <div className="ms-4 mb-2 h-0.5 w-8 rounded-full bg-zinc-700" />

      {/* Server List */}
      <div className="no-scrollbar flex flex-1 flex-col items-center gap-3 overflow-y-auto py-2">
        {mockServers.map((server) => (
          <div
            key={server.id}
            className="group relative flex items-center"
            onClick={() => handleSelect(server.id)}
          >
            {/* Active Server Indicator */}
            <div
              className={`me-2 h-0 w-1 rounded-r-md bg-white transition-all duration-200 group-hover:h-6 group-hover:opacity-100 ${
                activeId === server.id ? "h-8 opacity-100" : "opacity-0"
              }`}
            />

            <div
              className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl transition-all duration-200 ${
                activeId === server.id
                  ? "bg-indigo-600 text-white"
                  : "bg-zinc-700 hover:bg-indigo-600 hover:text-white"
              }`}
              title={server.name}
            >
              {server.icon}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainSideBar;
