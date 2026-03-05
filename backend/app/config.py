from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    database_url: str = "sqlite:///./skills.db"
    secret_key: str = "dev-secret-key-change-in-production"
    cors_origins: list[str] = ["http://localhost:5173"]
    access_token_expire_minutes: int = 60 * 24  # 24 hours

    model_config = {"env_file": ".env", "env_file_encoding": "utf-8"}


settings = Settings()
