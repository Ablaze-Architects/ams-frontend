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
      url: "/admin/alumni-records",
      icon: BookOpen,
      isActive: true,
      items: [],
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
