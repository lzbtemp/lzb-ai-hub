"""Seed the database with initial categories and sample skills."""

from passlib.context import CryptContext
from slugify import slugify

from app.database import SessionLocal
from app.models import Category, Skill, Tag, User

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

CATEGORIES = [
    {"name": "Development", "icon": "code", "sort_order": 0},
    {"name": "DevOps", "icon": "server", "sort_order": 1},
    {"name": "Testing", "icon": "check-circle", "sort_order": 2},
    {"name": "Security", "icon": "shield", "sort_order": 3},
    {"name": "Data & Analytics", "icon": "database", "sort_order": 4},
    {"name": "AI / ML", "icon": "cpu", "sort_order": 5},
    {"name": "Frontend", "icon": "layout", "sort_order": 6},
    {"name": "Backend", "icon": "terminal", "sort_order": 7},
    {"name": "Infrastructure", "icon": "cloud", "sort_order": 8},
    {"name": "Documentation", "icon": "file-text", "sort_order": 9},
    {"name": "Design", "icon": "figma", "sort_order": 10},
    {"name": "Business", "icon": "briefcase", "sort_order": 11},
]

SAMPLE_SKILLS = [
    {
        "name": "Python Best Practices",
        "description": "Comprehensive guide for writing clean, maintainable Python code following PEP standards.",
        "content": """# Python Best Practices

## Overview
This skill provides guidelines for writing clean, maintainable Python code.

## Instructions
- Follow PEP 8 style guidelines
- Use type hints for function signatures
- Write docstrings for public functions
- Prefer composition over inheritance
- Use context managers for resource management

## Example
```python
def calculate_total(items: list[dict]) -> float:
    \"\"\"Calculate the total price of all items.\"\"\"
    return sum(item["price"] * item["quantity"] for item in items)
```
""",
        "category": "Development",
        "tags": ["python", "best-practices", "clean-code"],
    },
    {
        "name": "React Component Patterns",
        "description": "Modern React patterns including hooks, composition, and performance optimization.",
        "content": """# React Component Patterns

## Overview
Skill for building modern React components with hooks and composition patterns.

## Instructions
- Use functional components with hooks
- Implement custom hooks for shared logic
- Use React.memo for expensive components
- Prefer controlled components for forms
- Use error boundaries for fault tolerance

## Example
```tsx
function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}
```
""",
        "category": "Frontend",
        "tags": ["react", "typescript", "hooks"],
    },
    {
        "name": "Docker Deployment Guide",
        "description": "Best practices for containerizing applications with Docker and Docker Compose.",
        "content": """# Docker Deployment Guide

## Overview
Skill for containerizing and deploying applications using Docker.

## Instructions
- Use multi-stage builds to minimize image size
- Run as non-root user in production
- Use .dockerignore to exclude unnecessary files
- Pin base image versions
- Use health checks

## Example Dockerfile
```dockerfile
FROM python:3.11-slim AS builder
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

FROM python:3.11-slim
WORKDIR /app
COPY --from=builder /usr/local/lib/python3.11/site-packages /usr/local/lib/python3.11/site-packages
COPY . .
USER nobody
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0"]
```
""",
        "category": "DevOps",
        "tags": ["docker", "deployment", "containers"],
    },
    {
        "name": "API Security Checklist",
        "description": "Security checklist for REST APIs covering authentication, authorization, and OWASP Top 10.",
        "content": """# API Security Checklist

## Overview
Comprehensive security checklist for building secure REST APIs.

## Instructions
- Always validate and sanitize input
- Use HTTPS everywhere
- Implement rate limiting
- Use JWT with short expiration times
- Never expose stack traces in production
- Implement CORS properly
- Log security events

## Checklist
- [ ] Input validation on all endpoints
- [ ] Authentication required for protected routes
- [ ] Role-based authorization checks
- [ ] Rate limiting configured
- [ ] CORS whitelist configured
- [ ] SQL injection prevention
- [ ] XSS prevention headers set
""",
        "category": "Security",
        "tags": ["security", "api", "owasp"],
    },
    {
        "name": "Unit Testing Patterns",
        "description": "Patterns for writing effective unit tests with pytest including fixtures, mocking, and parameterization.",
        "content": """# Unit Testing Patterns

## Overview
Skill for writing clean, effective unit tests with pytest.

## Instructions
- Follow Arrange-Act-Assert pattern
- Use fixtures for test setup
- Mock external dependencies
- Use parameterize for data-driven tests
- Aim for high coverage on business logic

## Example
```python
import pytest

@pytest.fixture
def sample_user():
    return User(username="testuser", email="test@example.com")

@pytest.mark.parametrize("input,expected", [
    (0, "zero"),
    (1, "one"),
    (2, "other"),
])
def test_number_to_word(input, expected):
    assert number_to_word(input) == expected
```
""",
        "category": "Testing",
        "tags": ["testing", "pytest", "python"],
    },
    {
        "name": "Git Workflow Standards",
        "description": "Standardized Git branching, commit message, and PR review workflows for teams.",
        "content": "# Git Workflow Standards\n\n## Branch Naming\n- `feature/TICKET-description`\n- `fix/TICKET-description`\n- `hotfix/description`\n\n## Commit Messages\nFollow Conventional Commits: `type(scope): description`\n\n## PR Checklist\n- [ ] Tests pass\n- [ ] Code reviewed\n- [ ] Documentation updated",
        "category": "DevOps",
        "tags": ["git", "workflow", "standards"],
    },
    {
        "name": "SQL Query Optimization",
        "description": "Techniques for optimizing SQL queries including indexing strategies, query plans, and common anti-patterns.",
        "content": "# SQL Query Optimization\n\n## Key Principles\n- Use EXPLAIN ANALYZE to understand query plans\n- Index columns used in WHERE, JOIN, and ORDER BY\n- Avoid SELECT * in production queries\n- Use CTEs for complex queries\n- Batch operations for bulk inserts/updates",
        "category": "Data & Analytics",
        "tags": ["sql", "database", "performance"],
    },
    {
        "name": "REST API Design Guide",
        "description": "Best practices for designing consistent, intuitive REST APIs with proper status codes and error handling.",
        "content": "# REST API Design Guide\n\n## URL Structure\n- Use plural nouns: `/api/v1/users`\n- Nest resources: `/api/v1/users/{id}/orders`\n- Use query params for filtering: `?status=active`\n\n## Status Codes\n- 200 OK, 201 Created, 204 No Content\n- 400 Bad Request, 401 Unauthorized, 404 Not Found\n- 500 Internal Server Error",
        "category": "Backend",
        "tags": ["api", "rest", "design"],
    },
    {
        "name": "Terraform Infrastructure Patterns",
        "description": "Reusable Terraform patterns for provisioning cloud infrastructure with modules and workspaces.",
        "content": "# Terraform Infrastructure Patterns\n\n## Module Structure\n```\nmodules/\n  vpc/\n    main.tf\n    variables.tf\n    outputs.tf\n```\n\n## Best Practices\n- Use remote state (S3 + DynamoDB)\n- Pin provider versions\n- Use workspaces for environments\n- Tag all resources",
        "category": "Infrastructure",
        "tags": ["terraform", "iac", "cloud"],
    },
    {
        "name": "Technical Writing Guide",
        "description": "Guidelines for writing clear technical documentation including READMEs, ADRs, and API docs.",
        "content": "# Technical Writing Guide\n\n## README Template\n1. Project title and description\n2. Quick start / installation\n3. Usage examples\n4. Configuration\n5. Contributing guide\n\n## ADR Format\n- Status, Context, Decision, Consequences\n\n## Tips\n- Write for your audience\n- Use active voice\n- Include code examples",
        "category": "Documentation",
        "tags": ["documentation", "writing", "readme"],
    },
    {
        "name": "Figma to Code Workflow",
        "description": "Workflow for translating Figma designs to React components with design tokens and responsive layouts.",
        "content": "# Figma to Code Workflow\n\n## Design Tokens\n- Extract colors, spacing, typography from Figma\n- Map to CSS custom properties or Tailwind config\n\n## Component Mapping\n1. Identify reusable components in Figma\n2. Create component hierarchy\n3. Implement atoms first, then molecules, then organisms\n\n## Responsive Strategy\n- Mobile-first approach\n- Use Figma auto-layout as flexbox guide",
        "category": "Design",
        "tags": ["figma", "design-system", "react"],
    },
    {
        "name": "Prompt Engineering Patterns",
        "description": "Effective patterns for crafting prompts that get consistent, high-quality results from LLMs.",
        "content": "# Prompt Engineering Patterns\n\n## Core Patterns\n- **Role Assignment**: 'You are a senior Python developer...'\n- **Few-Shot Examples**: Provide 2-3 examples of desired output\n- **Chain of Thought**: 'Think step by step...'\n- **Output Format**: Specify JSON, markdown, or code\n\n## Anti-Patterns\n- Vague instructions without context\n- Asking for too many things at once\n- Not specifying output format",
        "category": "AI / ML",
        "tags": ["ai", "prompts", "llm"],
    },
    {
        "name": "React Native Setup Guide",
        "description": "Step-by-step guide for setting up React Native projects with navigation, state management, and CI/CD.",
        "content": "# React Native Setup Guide\n\n## Project Init\n```bash\nnpx react-native init MyApp --template react-native-template-typescript\n```\n\n## Essential Libraries\n- React Navigation for routing\n- React Query for data fetching\n- React Native Paper for UI\n\n## CI/CD\n- Use Fastlane for builds\n- GitHub Actions for testing",
        "category": "Frontend",
        "tags": ["react-native", "mobile", "typescript"],
    },
    {
        "name": "Kubernetes Deployment Checklist",
        "description": "Production readiness checklist for deploying applications to Kubernetes clusters.",
        "content": "# Kubernetes Deployment Checklist\n\n## Pre-Deploy\n- [ ] Resource limits set (CPU/memory)\n- [ ] Health checks configured (liveness/readiness)\n- [ ] Secrets managed via external store\n- [ ] HPA configured for auto-scaling\n\n## Networking\n- [ ] Ingress rules configured\n- [ ] Network policies defined\n- [ ] TLS certificates set up\n\n## Monitoring\n- [ ] Metrics exposed (Prometheus)\n- [ ] Alerts configured\n- [ ] Logging aggregation set up",
        "category": "Infrastructure",
        "tags": ["kubernetes", "deployment", "devops"],
    },
    {
        "name": "Business Requirements Template",
        "description": "Template for capturing business requirements with user stories, acceptance criteria, and success metrics.",
        "content": "# Business Requirements Template\n\n## User Story Format\nAs a [role], I want [capability] so that [benefit].\n\n## Acceptance Criteria\nGiven [context], When [action], Then [expected result].\n\n## Document Structure\n1. Executive Summary\n2. Business Objectives\n3. User Stories\n4. Non-Functional Requirements\n5. Success Metrics\n6. Timeline & Dependencies",
        "category": "Business",
        "tags": ["requirements", "agile", "product"],
    },
    {
        "name": "CSS Grid Layout Patterns",
        "description": "Common CSS Grid patterns for building complex responsive layouts with minimal code.",
        "content": "# CSS Grid Layout Patterns\n\n## Holy Grail Layout\n```css\n.layout {\n  display: grid;\n  grid-template: auto 1fr auto / auto 1fr auto;\n  min-height: 100vh;\n}\n```\n\n## Responsive Cards\n```css\n.grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));\n  gap: 1rem;\n}\n```\n\n## Masonry-like\nUse `grid-template-rows: masonry` (experimental)",
        "category": "Frontend",
        "tags": ["css", "grid", "layout", "responsive"],
    },
    {
        "name": "FastAPI Project Structure",
        "description": "Scalable project structure for FastAPI applications with dependency injection and clean architecture.",
        "content": "# FastAPI Project Structure\n\n## Layout\n```\napp/\n  api/          # Route handlers\n  models/       # SQLAlchemy models\n  schemas/      # Pydantic schemas\n  services/     # Business logic\n  core/         # Config, security, deps\n  main.py       # App factory\n```\n\n## Key Patterns\n- Use dependency injection for DB sessions\n- Separate schemas for create/update/response\n- Service layer between routes and models\n- Use Alembic for migrations",
        "category": "Backend",
        "tags": ["fastapi", "python", "architecture"],
    },
    {
        "name": "Data Pipeline Best Practices",
        "description": "Guidelines for building reliable data pipelines with idempotency, monitoring, and error handling.",
        "content": "# Data Pipeline Best Practices\n\n## Design Principles\n- **Idempotency**: Running twice produces same result\n- **Incremental**: Process only new/changed data\n- **Observable**: Log metrics, set alerts\n\n## Error Handling\n- Dead letter queues for failed records\n- Retry with exponential backoff\n- Circuit breaker for external dependencies\n\n## Testing\n- Unit test transformations\n- Integration test with sample data\n- Data quality checks (Great Expectations)",
        "category": "Data & Analytics",
        "tags": ["data", "etl", "pipeline"],
    },
    {
        "name": "OWASP Security Scanning",
        "description": "Guide for integrating OWASP security scanning tools into CI/CD pipelines.",
        "content": "# OWASP Security Scanning\n\n## Tools\n- **SAST**: SonarQube, Semgrep\n- **DAST**: OWASP ZAP\n- **SCA**: Dependabot, Snyk\n\n## CI/CD Integration\n1. Run SAST on every PR\n2. SCA daily dependency scan\n3. DAST weekly against staging\n\n## Severity Response\n- Critical: Block deploy, fix immediately\n- High: Fix within sprint\n- Medium: Add to backlog\n- Low: Document and track",
        "category": "Security",
        "tags": ["owasp", "security", "ci-cd", "scanning"],
    },
]


def seed():
    db = SessionLocal()
    try:
        # Check if already seeded
        if db.query(Category).count() > 0:
            print("Database already seeded, skipping.")
            return

        # Seed categories
        categories = {}
        for cat_data in CATEGORIES:
            cat = Category(
                name=cat_data["name"],
                slug=slugify(cat_data["name"]),
                description=f"Skills related to {cat_data['name'].lower()}",
                icon=cat_data["icon"],
                sort_order=cat_data["sort_order"],
            )
            db.add(cat)
            db.flush()
            categories[cat_data["name"]] = cat

        # Seed a default admin user
        admin = User(
            username="admin",
            email="admin@lazboy.com",
            hashed_password=pwd_context.hash("admin123"),
            display_name="Admin User",
            role="admin",
        )
        db.add(admin)
        db.flush()

        # Seed tags and skills
        tag_cache: dict[str, Tag] = {}
        for skill_data in SAMPLE_SKILLS:
            tags = []
            for tag_name in skill_data["tags"]:
                if tag_name not in tag_cache:
                    tag = Tag(name=tag_name, slug=slugify(tag_name))
                    db.add(tag)
                    db.flush()
                    tag_cache[tag_name] = tag
                tags.append(tag_cache[tag_name])

            skill = Skill(
                name=skill_data["name"],
                slug=slugify(skill_data["name"]),
                description=skill_data["description"],
                content=skill_data["content"],
                category_id=categories[skill_data["category"]].id,
                author_id=admin.id,
                tags=tags,
            )
            db.add(skill)

        db.commit()
        print(f"Seeded {len(CATEGORIES)} categories, 1 admin user, {len(SAMPLE_SKILLS)} skills.")
    finally:
        db.close()


if __name__ == "__main__":
    seed()
