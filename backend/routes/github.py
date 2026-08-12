from fastapi import APIRouter
from services.github_service import GitHubService

router = APIRouter(
    prefix="/github",
    tags=["GitHub"]
)

github = GitHubService()


# ------------------ Repositories ------------------

@router.get("/repositories")
def get_repositories():
    try:
        return github.get_repositories()
    except Exception as e:
        return {"error": str(e)}


# ------------------ Repository Details ------------------

@router.get("/repository/{owner}/{repo}")
def get_repository(owner: str, repo: str):
    try:
        return github.get_repository_details(owner, repo)
    except Exception as e:
        return {"error": str(e)}


# ------------------ Commits ------------------

@router.get("/commits/{owner}/{repo}")
def get_commits(owner: str, repo: str):
    try:
        return github.get_commits(owner, repo)
    except Exception as e:
        return {"error": str(e)}


# ------------------ Pull Requests ------------------

@router.get("/pulls/{owner}/{repo}")
def get_pull_requests(owner: str, repo: str):
    try:
        return github.get_pull_requests(owner, repo)
    except Exception as e:
        return {"error": str(e)}

# ------------------ User Profile ------------------

@router.get("/profile")
def profile():
    try:
        return github.get_profile()
    except Exception as e:
        import traceback
        traceback.print_exc()
        return {
            "error": str(e)
        }
# ------------------ Analytics ------------------

@router.get("/analytics")
def get_analytics():
    try:
        repos = github.get_repositories()

        if isinstance(repos, dict):
            return repos

        total_repositories = len(repos)
        total_stars = sum(repo["stars"] for repo in repos)

        languages = {}

        for repo in repos:
            language = repo["language"] or "Unknown"
            languages[language] = languages.get(language, 0) + 1

        top_language = (
            max(languages, key=languages.get)
            if languages
            else "Unknown"
        )

        return {
            "repositories": total_repositories,
            "stars": total_stars,
            "top_language": top_language,
            "languages": languages
        }

    except Exception as e:
        return {"error": str(e)}