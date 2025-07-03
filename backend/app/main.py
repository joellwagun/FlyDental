# backend/app/main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware        # ← make sure this import is present
from app.routes import auth, appointments, admin, clinic
from app.database import init_db

app = FastAPI(
    title="FlyDental Backend",
    description="API for managing clinics, appointments, and users",
    version="1.0.0",
)

# ─── CORS ────────────────────────────────────────────────────────────────
# Must be here, BEFORE you include any routers!
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # your React dev server
    allow_credentials=False,                  # wildcard origins + creds = False
    allow_methods=["*"],
    allow_headers=["*"],
)
# ──────────────────────────────────────────────────────────────────────────

@app.on_event("startup")
def on_startup():
    init_db()

@app.get("/")
def root():
    return {"message": "FlyDental backend is running 🚀"}

# Include routers AFTER CORS middleware
app.include_router(auth.router,        prefix="/auth",        tags=["Auth"])
app.include_router(appointments.router,prefix="/appointments", tags=["Appointments"])
app.include_router(admin.router,       prefix="/admin",       tags=["Admin"])
app.include_router(clinic.router,      prefix="/clinic",     tags=["Clinic"])
