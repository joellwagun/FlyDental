from datetime import datetime
from pydantic import BaseModel, validator
from typing import List, Optional

# ----------------- APPOINTMENT -----------------

class AppointmentCreate(BaseModel):
    patient_name: str
    patient_gender: str
    patient_age: int
    email: str
    contact_number: str
    clinic_name: str
    appointment_date: datetime


class AppointmentRead(BaseModel):
    id: int
    patient_name: str
    patient_gender: Optional[str] = None      # ← make Optional
    patient_age: Optional[int] = None         # ← make Optional
    email: Optional[str] = None               # ← make Optional
    contact_number: Optional[str] = None 
    clinic_name: str
    appointment_date: datetime
    status: str


class AppointmentUpdate(BaseModel):
    patient_name: Optional[str] = None
    patient_gender: Optional[str] = None
    patient_age: Optional[int] = None
    email: Optional[str] = None
    contact_number: Optional[str] = None
    clinic_name: Optional[str] = None
    appointment_date: Optional[datetime] = None
    status: Optional[str] = None



# ----------------- CLINIC -----------------

class ClinicBase(BaseModel):
    name: str
    location: str
    rating: float = 0.0
    reviews: int = 0
    services: List[str]
    image: Optional[str] = None

    @validator("services", pre=True)
    def parse_services(cls, v):
        # Accept comma-separated string or list
        if isinstance(v, str):
            return [s.strip() for s in v.split(",")]
        return v

class ClinicCreate(ClinicBase):
    pass

class ClinicRead(ClinicBase):
    id: int

class ClinicUpdate(BaseModel):
    name: Optional[str] = None
    location: Optional[str] = None
    rating: Optional[float] = None
    reviews: Optional[int] = None
    services: Optional[List[str]] = None
    image: Optional[str] = None

    @validator("services", pre=True)
    def parse_services_update(cls, v):
        if isinstance(v, str):
            return [s.strip() for s in v.split(",")]
        return v