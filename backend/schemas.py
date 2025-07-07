from pydantic import BaseModel
from typing import Optional, List

class ClinicBase(BaseModel):
    name: str
    location: str
    rating: Optional[float] = 0.0
    reviews: Optional[int] = 0
    services: List[str]            # <-- Change from str to List[str]
    image: Optional[str] = None

class ClinicCreate(ClinicBase):
    pass

class ClinicUpdate(BaseModel):
    name: Optional[str] = None
    location: Optional[str] = None
    rating: Optional[float] = None
    reviews: Optional[int] = None
    services: Optional[List[str]] = None    # <-- Optional list here too
    image: Optional[str] = None

class Clinic(ClinicBase):
    id: int

    class Config:
        orm_mode = True
