from github import Github
from config import GITHUB_TOKEN


class GitHubService:

    def __init__(self, token=None):

        # Use OAuth token if provided.
        # Otherwise fall back to the backend token.
        self.token = token or GITHUB_TOKEN

        if self.token:
            self.github = Github(self.token)
        else:
            self.github = None

    # ---------------- GET USER ----------------

    def get_user(self):

        if not self.github:
            return None

        return self.github.get_user()

    # ---------------- GET PROFILE ----------------

    def get_profile(self):

        if not self.github:
            return {
                "error": "GitHub token not configured."
            }

        user = self.get_user()

        return {
            "login": user.login,
            "name": user.name,
            "bio": user.bio,
            "avatar": user.avatar_url,
            "followers": user.followers,
            "following": user.following,
            "public_repos": user.public_repos,
            "company": user.company,
            "location": user.location,
            "profile": user.html_url
        }

    # ---------------- GET REPOSITORIES ----------------

    def get_repositories(self):

        if not self.github:
            return {
                "error": "GitHub token not configured."
            }

        repos = self.get_user().get_repos()

        repository_list = []

        for repo in repos:

            repository_list.append({
                "name": repo.name,
                "owner": repo.owner.login,
                "private": repo.private,
                "language": repo.language,
                "stars": repo.stargazers_count,
                "url": repo.html_url
            })

        return repository_list

    # ---------------- GET REPOSITORY DETAILS ----------------

    def get_repository_details(
        self,
        owner,
        repo_name
    ):

        if not self.github:
            return {
                "error": "GitHub token not configured."
            }

        repo = self.github.get_repo(
            f"{owner}/{repo_name}"
        )

        return {
            "name": repo.name,
            "owner": repo.owner.login,
            "description": repo.description,
            "language": repo.language,
            "stars": repo.stargazers_count,
            "forks": repo.forks_count,
            "watchers": repo.subscribers_count,
            "issues": repo.open_issues_count,
            "branch": repo.default_branch,
            "updated": str(repo.updated_at),
            "private": repo.private,
            "url": repo.html_url
        }

    # ---------------- GET COMMITS ----------------

    def get_commits(
        self,
        owner,
        repo_name
    ):

        if not self.github:
            return {
                "error": "GitHub token not configured."
            }

        repo = self.github.get_repo(
            f"{owner}/{repo_name}"
        )

        commits = repo.get_commits()

        commit_list = []

        count = 0

        for commit in commits:

            if count == 10:
                break

            commit_list.append({
                "sha": commit.sha[:7],
                "message": commit.commit.message,
                "author": commit.commit.author.name,
                "date": str(
                    commit.commit.author.date
                ),
                "url": commit.html_url
            })

            count += 1

        return commit_list

    # ---------------- GET PULL REQUESTS ----------------

    def get_pull_requests(
        self,
        owner,
        repo
    ):

        if not self.github:
            return {
                "error": "GitHub token not configured."
            }

        repository = self.github.get_repo(
            f"{owner}/{repo}"
        )

        pulls = repository.get_pulls(
            state="open"
        )

        pull_requests = []

        for pr in pulls:

            pull_requests.append({
                "number": pr.number,
                "title": pr.title,
                "author": pr.user.login,
                "state": pr.state,
                "created_at": str(pr.created_at),
                "url": pr.html_url
            })

        return pull_requests

    # ---------------- GET PULL REQUEST FILES ----------------

    def get_pull_request_files(
        self,
        owner,
        repo_name,
        pr_number
    ):

        if not self.github:
            return []

        repo = self.github.get_repo(
            f"{owner}/{repo_name}"
        )

        pull = repo.get_pull(pr_number)

        files = []

        for file in pull.get_files():

            files.append({
                "filename": file.filename,
                "status": file.status,
                "patch": file.patch
            })

        return files

    # ---------------- GET REPOSITORY STRUCTURE ----------------

    def get_repository_structure(
        self,
        owner,
        repo_name
    ):

        if not self.github:
            return []

        repo = self.github.get_repo(
            f"{owner}/{repo_name}"
        )

        contents = repo.get_contents("")

        files = []

        while contents:

            file = contents.pop(0)

            if file.type == "dir":

                try:
                    contents.extend(
                        repo.get_contents(file.path)
                    )
                except Exception:
                    pass

            else:

                try:

                    if file.size > 500000:
                        continue

                    content = file.decoded_content.decode(
                        "utf-8",
                        errors="ignore"
                    )

                    files.append({
                        "filename": file.path,
                        "patch": content[:3000]
                    })

                except Exception:
                    pass

        return files