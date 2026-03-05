# La-Z-Boy Skills Repository

Internal web application for discovering, publishing, and installing AI agent skills (SKILL.md files) across La-Z-Boy teams.

## Tech Stack

- **Backend**: Python 3.11+ / FastAPI / SQLAlchemy / SQLite
- **Frontend**: React 18 / TypeScript / Vite / Tailwind CSS
- **Search**: SQLite FTS5 full-text search

## Quick Start

### Prerequisites

- Python 3.11+
- Node.js 20+
- pip

### Install Dependencies

```bash
make install
```

### Set Up Database

```bash
make db-upgrade
make db-seed
```

### Run Development Servers

```bash
# Run both (backend on :8000, frontend on :5173)
make dev

# Or individually
make dev-backend
make dev-frontend
```

### API Documentation

Once the backend is running, visit: http://localhost:8000/docs

## Project Structure

```
lazboy-skills/
├── backend/          # FastAPI backend
│   ├── app/
│   │   ├── api/      # Route handlers
│   │   ├── models/   # SQLAlchemy models
│   │   ├── schemas/  # Pydantic schemas
│   │   └── services/ # Business logic
│   └── tests/
├── frontend/         # React + Vite frontend
│   └── src/
│       ├── components/
│       ├── hooks/
│       ├── pages/
│       └── types/
└── Makefile
```

## License

Internal use only - La-Z-Boy Incorporated
