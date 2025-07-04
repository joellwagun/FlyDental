# backend/app/models.py

from datetime import datetime
from typing import Optional
from sqlmodel import SQLModel, Field

# Already defined:
class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    email: str
    hashed_password: str
    role: str = "user"
    clinic_id: Optional[int] = Field(default=None, foreign_key="clinic.id")



class Appointment(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    patient_name: str
    patient_gender: Optional[str] = None
    patient_age: Optional[int] = None
    email: Optional[str] = None
    contact_number: Optional[str] = None
    clinic_name: str
    appointment_date: datetime
    status: str = "pending"



class Clinic(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    location: str
    rating: float = 0.0
    reviews: int = 0
    services: str  # Comma-separated string e.g. "Checkup,Cleaning,X-ray"
    image: Optional[str] = None