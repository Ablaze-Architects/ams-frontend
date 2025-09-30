"use client"

import * as React from "react"
import {
  BookOpen,
  Calendar,
  CreditCard,
  PieChart,
  Settings2,
  Mail,
} from "lucide-react"

import { NavMain } from "@/components/dashboard/NavMain"
import { NavUser } from "@/components/dashboard/NavUser"
import { TeamSwitcher } from "@/components/dashboard/TeamSwitcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

import { getUser } from "@/utils/auth" // ✅ fetch user from localStorage

export function AppSidebar({ ...props }) {
  // ✅ Get logged-in user OR fallback
  const user = getUser() || {
    name: "Guest",
    email: "guest@example.com",
    avatar: "/avatars/default.jpg",
  }

  const teams = [
    {
      name: "Admin Panel",
      logo: Calendar,
    },
  ]

  const navMain = [
    {
      title: "Alumni Records",
      url: "/dashboard/alumni-records",
      icon: BookOpen,
      isActive: true,
      items: [],
    },
    {
      title: "Events",
      url: "/dashboard/events",
      icon: Calendar,
      items: [
        { title: "Manage Events", url: "/dashboard/events" },
        { title: "Add Event", url: "/dashboard/events/add" },
      ],
    },
    {
      title: "Invitations",
      url: "/dashboard/invitations",
      icon: Mail,
      items: [
        { title: "Manage Invitation", url: "/dashboard/invitations" },
        { title: "Add Invitation", url: "/dashboard/invitations/add" },
      ],
    },
    {
      title: "Donations",
      url: "/dashboard/donations",
      icon: CreditCard,
      items: [
        { title: "All Donors", url: "/dashboard/donations" },
        { title: "Add Donation", url: "/dashboard/donations/add" },
      ],
    },
    {
      title: "Analytics",
      url: "/dashboard/analytics",
      icon: PieChart,
      items: [],
    },
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: Settings2,
      items: [],
    },
  ]

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
      </SidebarContent>
      <SidebarFooter>
        {/* ✅ NavUser will now show displayName above email */}
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
