import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-primary py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold text-primary-foreground">Medical Portal</h1>
        </div>
      </header>

      <main className="flex-1">
        <section className="bg-muted py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">Welcome to the Medical Portal</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              A secure platform connecting patients and doctors. Sign up or log in to access your personalized
              dashboard.
            </p>
            <div className="flex justify-center gap-4">
              <Button asChild size="lg">
                <Link href="/signup">Sign Up</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/login">Log In</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Features</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-card p-6 rounded-lg shadow">
                <h3 className="text-xl font-semibold mb-3">For Patients</h3>
                <p>Access your medical records, schedule appointments, and communicate with your doctors.</p>
              </div>
              <div className="bg-card p-6 rounded-lg shadow">
                <h3 className="text-xl font-semibold mb-3">For Doctors</h3>
                <p>Manage patient records, appointments, and provide remote consultations.</p>
              </div>
              <div className="bg-card p-6 rounded-lg shadow">
                <h3 className="text-xl font-semibold mb-3">Secure Platform</h3>
                <p>Your data is protected with industry-standard security measures.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-muted py-6">
        <div className="container mx-auto px-4 text-center">
          <p>© {new Date().getFullYear()} Medical Portal. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
