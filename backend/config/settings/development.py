from pathlib import Path

import environ

# Load repo-root `.env` with overwrite so values win over stale shell exports
# (e.g. `POSTGRES_HOST=db` left over from Compose docs) when using development settings.
_backend_dir = Path(__file__).resolve().parent.parent.parent
_root_env = _backend_dir.parent / ".env"
if _root_env.is_file():
    environ.Env.read_env(_root_env, overwrite=True)

from .base import *  # noqa: E402, F403

ALLOWED_HOSTS = env.list(  # noqa: F405
    "ALLOWED_HOSTS",
    default=["localhost", "127.0.0.1", "0.0.0.0", "web", "[::1]"],
)

CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]
