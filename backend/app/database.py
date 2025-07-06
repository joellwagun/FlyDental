
# backend/app/database.py

import os
from sqlmodel import SQLModel, create_engine, Session
from dotenv import load_dotenv

# Load environment variables from .env (if present)
load_dotenv()

# Use environment variable or default to SQLite
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./flydental.db")

# Create the engine
engine = create_engine(
    DATABASE_URL,
    echo=True,
    connect_args={
        # SQLite needs this flag to allow multiple threads
        "check_same_thread": False
    } if DATABASE_URL.startswith("sqlite") else {},
)

# Dependency to inject DB session into routes
def get_db():
    with Session(engine) as session:
        yield session

# Function to create all tables (called once on startup)
def init_db():
    SQLModel.metadata.create_all(engine)