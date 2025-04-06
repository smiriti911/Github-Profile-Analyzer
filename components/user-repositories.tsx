import type { GitHubRepo } from "@/components/github-profile-analyzer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, GitFork, Clock } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface UserRepositoriesProps {
  repos: GitHubRepo[];
}

export function UserRepositories({ repos }: UserRepositoriesProps) {
  if (repos.length === 0) {
    return (
      <Card className="bg-blue-50 border border-blue-200">
        <CardContent className="p-6 text-center text-blue-600">No repositories found</CardContent>
      </Card>
    );
  }

  return (
    <div className="mb-10 p-2">
      <div className="space-y-4">
        {repos.map((repo) => (
          <Card key={repo.id} className="bg-blue-50 border border-blue-200 shadow-md">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl text-blue-800">
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline hover:text-blue-600"
                    >
                      {repo.name}
                    </a>
                  </CardTitle>
                  {repo.description && <CardDescription className="mt-1 text-blue-700">{repo.description}</CardDescription>}
                </div>
                <Badge
                  variant={repo.visibility === "public" ? "outline" : "secondary"}
                  className="bg-blue-200 text-blue-900"
                >
                  {repo.visibility}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-3">
                {repo.topics &&
                  repo.topics.map((topic) => (
                    <Badge key={topic} variant="secondary" className="bg-blue-100 text-blue-800">
                      {topic}
                    </Badge>
                  ))}
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-blue-600">
                {repo.language && (
                  <div className="flex items-center gap-1">
                    <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                    <span>{repo.language}</span>
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-blue-500" />
                  <span>{repo.stargazers_count}</span>
                </div>
                <div className="flex items-center gap-1">
                  <GitFork className="h-4 w-4 text-blue-500" />
                  <span>{repo.forks_count}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4 text-blue-500" />
                  <span>Updated {new Date(repo.updated_at).toLocaleDateString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
