"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getUserProfile, logout } from "@/lib/actions"
import { Toaster } from "@/components/ui/toaster"
import { toast } from "@/components/ui/use-toast"
import type { User } from "@/lib/types"
import DashboardLayout from "@/components/dashboard-layout"

export default function DoctorDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchUserData() {
      try {
        const userData = await getUserProfile()

        if (!userData || userData.role !== "doctor") {
          toast({
            title: "Access denied",
            description: "You don't have permission to view this page.",
            variant: "destructive",
          })
          router.push("/login")
          return
        }

        setUser(userData)
      } catch (error) {
        console.error("Error fetching user data:", error)
        toast({
          title: "Error",
          description: "Failed to load your profile. Please try again.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [router])

  const handleLogout = async () => {
    await logout()
    router.push("/login")
  }

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4">Loading your dashboard...</p>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  if (!user) {
    return null // Will redirect in useEffect
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Doctor Dashboard</h1>
          <Button variant="outline" onClick={handleLogout}>
            Log Out
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>My Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex flex-col items-center gap-4">
                <Avatar className="h-32 w-32">
                  <AvatarImage
                    src={user.profilePicture || "/placeholder.svg?height=128&width=128"}
                    alt={user.firstName}
                  />
                  <AvatarFallback>
                    {user.firstName.charAt(0)}
                    {user.lastName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <h2 className="text-xl font-semibold">
                    Dr. {user.firstName} {user.lastName}
                  </h2>
                  <p className="text-muted-foreground">@{user.username}</p>
                </div>
              </div>

              <div className="flex-1 grid gap-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Email</h3>
                    <p>{user.email}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Role</h3>
                    <p className="capitalize">{user.role}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Address</h3>
                  <p>{user.addressLine1}</p>
                  <p>
                    {user.city}, {user.state} {user.pincode}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Today's Appointments</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">You have no appointments scheduled for today.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Patient List</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">No patients assigned yet.</p>
            </CardContent>
          </Card>
        </div>
      </div>
      <Toaster />
    </DashboardLayout>
  )
}
