"use client"

import { useNavigate } from "react-router-dom"
import { ChevronsUpDown, LogOut } from "lucide-react"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { clearAuth, getUser } from "@/utils/auth"

export function NavUser() {
  const { isMobile } = useSidebar()
  const navigate = useNavigate()
  const user = getUser()

  console.log("User data in NavUser:", user)

  function handleLogout() {
    clearAuth()
    navigate("/login")
  }

  if (!user) {
    return null // Show nothing if user is not logged in
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton size="lg">
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left leading-tight">
                <span
                  className="truncate"
                  style={{ fontWeight: "bold", fontSize: "1.3rem" }}
                >
                  {user.name}
                </span>
                <span
                  className="truncate text-xs"
                  style={{ fontWeight: "normal", fontSize: "0.85rem" }}
                >
                  {user.email}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left leading-tight">
                  <span
                    className="truncate"
                    style={{ fontWeight: "bold", fontSize: "1.3rem" }}
                  >
                    {user.name}
                  </span>
                  <span
                    className="truncate text-xs"
                    style={{ fontWeight: "normal", fontSize: "0.85rem" }}
                  >
                    {user.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuItem>
                Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem>
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={handleLogout}>

            <DropdownMenuItem onClick={async () => {
              try {
                const userId = localStorage.getItem("userId");
                if (!userId) {
                  alert("Cannot logout: userId not found.");
                  return;
                }
                const endpoint = `/api/user/${userId}/logout`;
                await fetch(endpoint, { method: "POST", credentials: "include" });
                localStorage.removeItem("token");
                localStorage.removeItem("userId");
                window.location.href = "/ams-frontend/login";
              } catch (error) {
                console.error("Error logging out:", error.message);
              }
            }}>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
