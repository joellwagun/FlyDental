import sys, os
from logging.config import fileConfig

from sqlalchemy import engine_from_config, pool
from alembic import context

# ─ add project root to PYTHONPATH so we can import app.database ──────────
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))
# ─ import your SQLModel metadata ─────────────────────────────────────────
from app.database import SQLModel

# this is the Alembic Config object
config = context.config

# tell Alembic where to find your models’ MetaData
target_metadata = SQLModel.metadata

# apply the rest of the default env.py unchanged...
fileConfig(config.config_file_name)
