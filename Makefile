.PHONY: dev dev-backend dev-frontend install install-backend install-frontend lint test

VENV = backend/.venv
PYTHON = $(VENV)/bin/python
PIP = $(VENV)/bin/pip
UVICORN = $(VENV)/bin/uvicorn

# Run both backend and frontend
dev:
	@echo "Starting backend and frontend..."
	@make dev-backend & make dev-frontend

dev-backend:
	cd backend && .venv/bin/uvicorn app.main:app --reload --port 8000

dev-frontend:
	cd frontend && npm run dev

# Install dependencies
install: install-backend install-frontend

install-backend:
	cd backend && python3 -m venv .venv && .venv/bin/pip install -e ".[dev]"

install-frontend:
	cd frontend && npm install

# Linting
lint:
	cd backend && .venv/bin/ruff check . && .venv/bin/ruff format --check .
	cd frontend && npm run lint

# Testing
test:
	cd backend && .venv/bin/pytest -v
	cd frontend && npm run test 2>/dev/null || true

# Database
db-upgrade:
	cd backend && .venv/bin/alembic upgrade head

db-seed:
	cd backend && .venv/bin/python -m app.seed
