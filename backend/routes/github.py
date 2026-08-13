from fastapi import APIRouter, Request
from services.github_service import GitHubService

router = APIRouter(
    prefix="/github",
    tags=["GitHub"]
)


# ------------------ Get GitHub Service ------------------

def get_github_service(request: Request):

    auth_header = request.headers.get("Authorization")

    token = None

    if auth_header and auth_header.startswith("Bearer "):
        token = auth_header.replace("Bearer ", "").strip()

    return GitHubService(token)


# ------------------ Repositories ------------------

@router.get("/repositories")
def get_repositories(request: Request):

    try:
        github = get_github_service(request)

        return github.get_repositories()

    except Exception as e:
        return {
            "error": str(e)
        }


# ------------------ Repository Details ------------------

@router.get("/repository/{owner}/{repo}")
def get_repository(
    owner: str,
    repo: str,
    request: Request
):

    try:
        github = get_github_service(request)

        return github.get_repository_details(
            owner,
            repo
        )

    except Exception as e:
        return {
            "error": str(e)
        }


# ------------------ Commits ------------------

@router.get("/commits/{owner}/{repo}")
def get_commits(
    owner: str,
    repo: str,
    request: Request
):

    try:
        github = get_github_service(request)

        return github.get_commits(
            owner,
            repo
        )

    except Exception as e:
        return {
            "error": str(e)
        }


# ------------------ Pull Requests ------------------

@router.get("/pulls/{owner}/{repo}")
def get_pull_requests(
    owner: str,
    repo: str,
    request: Request
):

    try:
        github = get_github_service(request)

        return github.get_pull_requests(
            owner,
            repo
        )

    except Exception as e:
        return {
            "error": str(e)
        }


# ------------------ User Profile ------------------

@router.get("/profile")
def profile(request: Request):

    try:

        github = get_github_service(request)

        return github.get_profile()

    except Exception as e:

        return {
            "error": str(e)
        }


# ------------------ Analytics ------------------

@router.get("/analytics")
def get_analytics(request: Request):

    try:

        github = get_github_service(request)

        repos = github.get_repositories()

        if isinstance(repos, dict):
            return repos

        total_repositories = len(repos)

        total_stars = sum(
            repo["stars"]
            for repo in repos
        )

        languages = {}

        for repo in repos:

            language = repo["language"] or "Unknown"

            languages[language] = (
                languages.get(language, 0) + 1
            )

        top_language = (
            max(
                languages,
                key=languages.get
            )
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

        return {
            "error": str(e)
        }