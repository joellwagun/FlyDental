from datetime import datetime
from pydantic import BaseModel, validator
from typing import List, Optional

# ----------------- APPOINTMENT -----------------

class AppointmentCreate(BaseModel):
    patient_name: str
    clinic_name: str
    appointment_date: datetime

class AppointmentRead(BaseModel):
    id: int
    patient_name: str
    clinic_name: str
    appointment_date: datetime
    status: str

class AppointmentUpdate(BaseModel):
    patient_name: str | None = None
    clinic_name: str | None = None
    appointment_date: datetime | None = None
    status: str | None = None

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
