"use client"

import * as React from "react"
import {
  BookOpen,
  Calendar,
  CreditCard,
  PieChart,
  Settings2,
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

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Admin Panel",
      // You can use any icon here
      logo: Calendar,
    },
  ],
  navMain: [
    {
      title: "Alumni Records",
      url: "/admin/alumni-records",
      icon: BookOpen,
      isActive: true,
      items: [], // no sub-items
    },
    {
      title: "Events",
      url: "/admin/events",
      icon: Calendar,
      items: [
        { title: "Manage Events", url: "/admin/events" },
        { title: "Add Event", url: "/admin/events/add" },
        { title: "Invitations", url: "/admin/events/invitations" },
      ],
    },
    {
      title: "Donations",
      url: "/admin/donations",
      icon: CreditCard,
      items: [
        { title: "All Donors", url: "/admin/donations" },
        { title: "Add Donation", url: "/admin/donations/add" },
      ],
    },
    {
      title: "Analytics",
      url: "/admin/analytics",
      icon: PieChart,
      items: [],
    },
    {
      title: "Settings",
      url: "/admin/settings",
      icon: Settings2,
      items: [],
    },
  ],
}

export function AppSidebar({ ...props }) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
