import type { ReactNode } from "react"
import Link from "next/link"
import { Home, User, Calendar, FileText, Settings, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

interface DashboardLayoutProps {
  children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-muted/40">
      {/* Mobile navigation */}
      <div className="md:hidden flex items-center justify-between p-4 bg-background border-b">
        <h1 className="font-bold text-lg">Medical Portal</h1>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64">
            <nav className="flex flex-col gap-4 mt-8">
              <Link href="/dashboard" className="flex items-center gap-2 px-2 py-2 rounded-md hover:bg-muted">
                <Home className="h-5 w-5" />
                <span>Dashboard</span>
              </Link>
              <Link href="/dashboard/profile" className="flex items-center gap-2 px-2 py-2 rounded-md hover:bg-muted">
                <User className="h-5 w-5" />
                <span>Profile</span>
              </Link>
              <Link
                href="/dashboard/appointments"
                className="flex items-center gap-2 px-2 py-2 rounded-md hover:bg-muted"
              >
                <Calendar className="h-5 w-5" />
                <span>Appointments</span>
              </Link>
              <Link href="/dashboard/records" className="flex items-center gap-2 px-2 py-2 rounded-md hover:bg-muted">
                <FileText className="h-5 w-5" />
                <span>Medical Records</span>
              </Link>
              <Link href="/dashboard/settings" className="flex items-center gap-2 px-2 py-2 rounded-md hover:bg-muted">
                <Settings className="h-5 w-5" />
                <span>Settings</span>
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>

      <div className="flex">
        {/* Desktop sidebar */}
        <aside className="hidden md:flex flex-col w-64 bg-background border-r h-screen sticky top-0">
          <div className="p-4 border-b">
            <h1 className="font-bold text-lg">Medical Portal</h1>
          </div>
          <nav className="flex flex-col gap-2 p-4">
            <Link href="/dashboard" className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-muted">
              <Home className="h-5 w-5" />
              <span>Dashboard</span>
            </Link>
            <Link href="/dashboard/profile" className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-muted">
              <User className="h-5 w-5" />
              <span>Profile</span>
            </Link>
            <Link
              href="/dashboard/appointments"
              className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-muted"
            >
              <Calendar className="h-5 w-5" />
              <span>Appointments</span>
            </Link>
            <Link href="/dashboard/records" className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-muted">
              <FileText className="h-5 w-5" />
              <span>Medical Records</span>
            </Link>
            <Link href="/dashboard/settings" className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-muted">
              <Settings className="h-5 w-5" />
              <span>Settings</span>
            </Link>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-4 md:p-8">
          <div className="max-w-6xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  )
}
