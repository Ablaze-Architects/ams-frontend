"use client"
import * as React from "react"
import { Link } from "react-router-dom"
import {
  GraduationCapIcon,
  CalendarIcon,
  UsersIcon,
  BriefcaseIcon,
  HeartHandshakeIcon,
  TrendingUpIcon,
  UserIcon,
  BarChart3Icon,
  MessageCircleIcon,
  AwardIcon,
} from "lucide-react"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

const alumniFeatures = [
  {
    title: "Alumni Directory",
    href: "/alumni/directory",
    icon: <UsersIcon className="h-4 w-4" />,
    description: "Browse and search through our comprehensive alumni database with filters and contact information.",
  },
  {
    title: "Success Stories",
    href: "/alumni/stories",
    icon: <AwardIcon className="h-4 w-4" />,
    description: "Read inspiring career journeys and achievements of our distinguished alumni.",
  },
  {
    title: "Mentorship Program",
    href: "/mentorship",
    icon: <HeartHandshakeIcon className="h-4 w-4" />,
    description: "Connect current students with experienced alumni for guidance and career support.",
  },
  {
    title: "Job Board",
    href: "/jobs",
    icon: <BriefcaseIcon className="h-4 w-4" />,
    description: "Explore career opportunities posted by alumni companies and partner organizations.",
  },
]

const dashboardSections = [
  {
    title: "Alumni Analytics",
    href: "/dashboard/analytics",
    icon: <BarChart3Icon className="h-4 w-4" />,
    description: "View comprehensive statistics about alumni engagement, career progression, and demographics.",
  },
  {
    title: "Event Management",
    href: "/dashboard/events",
    icon: <CalendarIcon className="h-4 w-4" />,
    description: "Create, manage, and track alumni events, reunions, and networking sessions.",
  },
  {
    title: "Communication Hub",
    href: "/dashboard/communications",
    icon: <MessageCircleIcon className="h-4 w-4" />,
    description: "Send newsletters, announcements, and manage communication campaigns with alumni.",
  },
  {
    title: "Donation Tracking",
    href: "/dashboard/donations",
    icon: <TrendingUpIcon className="h-4 w-4" />,
    description: "Monitor fundraising campaigns, track donations, and manage donor relationships.",
  },
]

export default function AlumniNavbar() {
  return (
    <div className="w-full bg-primary shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between w-full">
          <NavigationMenu>
            <NavigationMenuList className="flex-wrap gap-1">
            {/* HOME SECTION */}
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-accent hover:bg-accent/80 text-accent-foreground data-[state=open]:bg-accent/80 data-[active]:bg-accent/80 font-medium px-6 py-2 rounded-lg transition-all duration-200">
                Home
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  {/* Featured Home Section */}
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <Link
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-secondary/20 p-6 no-underline outline-none focus:shadow-md hover:bg-secondary/30 transition-all duration-200"
                        to="/"
                      >
                        <GraduationCapIcon className="h-6 w-6 mb-2 text-primary" />
                        <div className="mb-2 mt-4 text-lg font-medium text-foreground">Alumni Management System</div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          Connecting graduates, fostering relationships, and building stronger institutional
                          communities.
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  {/* Home Menu Items */}
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        to="/about"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent/10 hover:text-accent-foreground"
                      >
                        <div className="flex items-center gap-2">
                          <UserIcon className="h-4 w-4 text-primary" />
                          <div className="text-sm font-medium leading-none">About Us</div>
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Learn about our institution's history, mission, and commitment to alumni success.
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        to="/news"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent/10 hover:text-accent-foreground"
                      >
                        <div className="flex items-center gap-2">
                          <MessageCircleIcon className="h-4 w-4 text-primary" />
                          <div className="text-sm font-medium leading-none">Latest News</div>
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Stay updated with institutional news, achievements, and alumni spotlights.
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        to="/contact"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent/10 hover:text-accent-foreground"
                      >
                        <div className="flex items-center gap-2">
                          <HeartHandshakeIcon className="h-4 w-4 text-primary" />
                          <div className="text-sm font-medium leading-none">Contact</div>
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Get in touch with our alumni relations team for support and inquiries.
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* ALUMNI SECTION */}
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent hover:bg-primary-foreground/10 text-primary-foreground data-[state=open]:bg-primary-foreground/10 data-[active]:bg-primary-foreground/10 font-medium px-4 py-2 rounded-lg transition-all duration-200">
                Alumni
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  {alumniFeatures.map((feature) => (
                    <li key={feature.title}>
                      <NavigationMenuLink asChild>
                        <Link
                          to={feature.href}
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent/10 hover:text-accent-foreground"
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-primary">
                              {React.cloneElement(feature.icon, {
                                className: "h-4 w-4",
                              })}
                            </span>
                            <div className="text-sm font-medium leading-none">{feature.title}</div>
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            {feature.description}
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* EVENTS SECTION */}
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent hover:bg-primary-foreground/10 text-primary-foreground data-[state=open]:bg-primary-foreground/10 data-[active]:bg-primary-foreground/10 font-medium px-4 py-2 rounded-lg transition-all duration-200">
                Events
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[300px] gap-2 p-4">
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        to="/events/upcoming"
                        className="flex items-center gap-3 p-3 rounded-md transition-colors hover:bg-accent/10 hover:text-accent-foreground"
                      >
                        <CalendarIcon className="h-5 w-5 text-primary flex-shrink-0" />
                        <div className="flex-1">
                          <div className="font-medium">Upcoming Events</div>
                          <div className="text-sm text-muted-foreground mt-1">
                            Register for reunions, networking sessions, and webinars.
                          </div>
                        </div>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        to="/events/past"
                        className="flex items-center gap-3 p-3 rounded-md transition-colors hover:bg-accent/10 hover:text-accent-foreground"
                      >
                        <AwardIcon className="h-5 w-5 text-primary flex-shrink-0" />
                        <div className="flex-1">
                          <div className="font-medium">Past Events</div>
                          <div className="text-sm text-muted-foreground mt-1">
                            View photos, videos, and highlights from previous events.
                          </div>
                        </div>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* DASHBOARD SECTION - Simple Link */}
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  to="/dashboard"
                  className="inline-flex h-10 w-max items-center justify-center rounded-lg bg-transparent px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-foreground/10 focus:bg-primary-foreground/10 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                >
                  Dashboard
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            {/* ADMIN SECTION */}
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent hover:bg-primary-foreground/10 text-primary-foreground data-[state=open]:bg-primary-foreground/10 data-[active]:bg-primary-foreground/10 font-medium px-4 py-2 rounded-lg transition-all duration-200">
                Admin
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  {dashboardSections.map((section) => (
                    <li key={section.title}>
                      <NavigationMenuLink asChild>
                        <Link
                          to={section.href}
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent/10 hover:text-accent-foreground"
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-primary">
                              {React.cloneElement(section.icon, {
                                className: "h-4 w-4",
                              })}
                            </span>
                            <div className="text-sm font-medium leading-none">{section.title}</div>
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            {section.description}
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <div className="flex items-center ml-auto gap-2">
            <Link to="/login">
              <button className="px-3 mx-2 py-2 my-2 rounded-lg font-medium bg-primary-foreground text-primary hover:bg-primary-foreground/80 transition-all shadow-xs border border-primary-foreground">
                Login
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}