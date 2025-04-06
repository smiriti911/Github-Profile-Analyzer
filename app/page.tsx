"use client"
import { GitHubProfileAnalyzer } from "@/components/github-profile-analyzer"
import { ThemeProvider } from "@/components/theme-provider"

export default function Home() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="theme-preference">
      <main className="min-h-screen p-4 md:p-8 lg:p-12 bg-blue-50">
        <div className="max-w-5xl mx-auto mt-20">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center text-blue-700">GitHub Profile Analyzer</h1>
          <p className="text-center mb-8 text-blue-600">
            Enter a GitHub username to analyze their repositories and activity
          </p>
          <GitHubProfileAnalyzer />
        </div>
      </main>
    </ThemeProvider>
  )
}
