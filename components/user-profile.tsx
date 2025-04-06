import type { GitHubUser } from "@/components/github-profile-analyzer";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Users, GitFork, ExternalLink } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserProfileProps {
  user: GitHubUser;
}

export function UserProfile({ user }: UserProfileProps) {
  const joinDate = new Date(user.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Card className="bg-blue-50 border border-blue-200 shadow-md hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* User Avatar */}
          <div className="flex-shrink-0">
            <Avatar className="h-24 w-24 rounded-full border-2 border-blue-300 shadow-sm">
              <AvatarImage src={user.avatar_url} alt={user.login} />
              <AvatarFallback className="bg-blue-200 text-blue-900">
                {user.login.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>

          {/* User Details */}
          <div className="flex-1 space-y-4">
            <div>
              <h2 className="text-2xl font-bold text-blue-800">{user.name || user.login}</h2>

            </div>

            {user.bio && <p className="text-blue-700">{user.bio}</p>}

            {/* User Stats */}
            <div className="flex flex-wrap gap-4 text-blue-600">
              <div className="flex items-center gap-1 text-sm">
                <GitFork className="h-4 w-4 text-blue-500" />
                <span>{user.public_repos} repositories</span>
              </div>

              <div className="flex items-center gap-1 text-sm">
                <Users className="h-4 w-4 text-blue-500" />
                <span>
                  {user.followers} followers · {user.following} following
                </span>
              </div>

              <div className="flex items-center gap-1 text-sm">
                <Calendar className="h-4 w-4 text-blue-500" />
                <span>Joined {joinDate}</span>
              </div>
            </div>

            {/* GitHub Profile Button */}
            <a
                href={user.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline hover:text-blue-500 flex items-center gap-1 mt-1"
              >
                <ExternalLink className="h-4 w-4" />
                <span>@{user.login}</span>
              </a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
