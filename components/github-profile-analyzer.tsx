"use client"

import { useState } from "react"
import { UserRepositories } from "@/components/user-repositories"
import { CommitActivity } from "@/components/commit-activity"
import { UserProfile } from "@/components/user-profile"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, Search } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { FaGithub } from "react-icons/fa";

export interface GitHubUser {
  login: string
  avatar_url: string
  name: string | null
  bio: string | null
  public_repos: number
  followers: number
  following: number
  html_url: string
  created_at: string
}

export interface GitHubRepo {
  id: number
  name: string
  html_url: string
  description: string | null
  stargazers_count: number
  forks_count: number
  language: string | null
  updated_at: string
  topics: string[]
  visibility: string
}

export interface CommitData {
  date: string
  count: number
}

export function GitHubProfileAnalyzer() {
  const [username, setUsername] = useState("")
  const [inputUsername, setInputUsername] = useState("")
  const [user, setUser] = useState<GitHubUser | null>(null)
  const [repos, setRepos] = useState<GitHubRepo[]>([])
  const [commitData, setCommitData] = useState<CommitData[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchUserData = async () => {
    if (!inputUsername.trim()) return

    setLoading(true)
    setError(null)

    try {
      const userResponse = await fetch(`https://api.github.com/users/${inputUsername}`)
      if (!userResponse.ok) {
        throw new Error(userResponse.status === 404 ? "User not found" : "Error fetching user data")
      }

      const userData = await userResponse.json()
      setUser(userData)
      setUsername(inputUsername)

      const reposResponse = await fetch(`https://api.github.com/users/${inputUsername}/repos?per_page=100&sort=updated`)
      if (!reposResponse.ok) {
        throw new Error("Error fetching repositories")
      }

      const reposData = await reposResponse.json()
      setRepos(reposData)

      const today = new Date()
      const commitActivity: CommitData[] = []
      for (let i = 30; i >= 0; i--) {
        const date = new Date(today)
        date.setDate(date.getDate() - i)
        commitActivity.push({
          date: date.toISOString().split("T")[0],
          count: Math.floor(Math.random() * 11),
        })
      }
      setCommitData(commitActivity)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6 p-6 rounded-lg "> 
      <Card className="bg-blue-50 border border-blue-300"> 
        <CardContent className="pt-6"> 
          <div className="flex flex-col sm:flex-row gap-4"> 
            <div className="flex-1 flex items-center gap-2"> 
              <FaGithub className="text-blue-500" size={32} />
              <Input 
                placeholder="Enter GitHub username" 
                value={inputUsername} 
                onChange={(e) => setInputUsername(e.target.value)} 
                onKeyDown={(e) => e.key === "Enter" && fetchUserData()} 
                disabled={loading} 
                className="border border-blue-300 bg-blue-50 text-blue-900 placeholder-blue-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              /> 
            </div> 
            <Button onClick={fetchUserData} disabled={loading || !inputUsername.trim()} className="gap-2 bg-blue-500 hover:bg-blue-700 text-white"> 
              {loading ? ("Loading...") : (<><Search size={16} /> Analyze Profile </>)} 
            </Button> 
          </div> 
        </CardContent> 
      </Card>

      {error && ( 
        <Alert variant="destructive" className="bg-red-100 border-red-300 text-red-700"> 
          <AlertCircle className="h-4 w-4" /> 
          <AlertDescription>{error}</AlertDescription> 
        </Alert> 
      )} 

      {user && ( 
        <div className="space-y-6"> 
          <UserProfile user={user} />

          <Tabs defaultValue="repositories"> 
            <TabsList className="grid grid-cols-2 bg-blue-200 rounded-md text-blue-700"> 
              <TabsTrigger value="repositories">Repositories ({repos.length})</TabsTrigger> 
              <TabsTrigger value="activity">Commit Activity</TabsTrigger> 
            </TabsList> 
            <TabsContent value="repositories" className="mt-4"> 
              <UserRepositories repos={repos} /> 
            </TabsContent> 
            <TabsContent value="activity" className="mt-4"> 
              <CommitActivity commitData={commitData} username={username} /> 
            </TabsContent> 
          </Tabs> 
        </div> 
      )} 
    </div> 
  ) 
}