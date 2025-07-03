# backend/app/routes/appointments.py

from fastapi import APIRouter, HTTPException, Depends
from sqlmodel import Session, select
from app.models import Appointment
from app.schemas import AppointmentCreate, AppointmentRead, AppointmentUpdate
from app.database import get_db


router = APIRouter()

@router.post("/", response_model=AppointmentRead)
def create_appointment(data: AppointmentCreate, session: Session = Depends(get_db)):
    appointment = Appointment(**data.dict())
    session.add(appointment)
    session.commit()
    session.refresh(appointment)
    return appointment

@router.get("/", response_model=list[AppointmentRead])
def get_appointments(session: Session = Depends(get_db)):
    return session.exec(select(Appointment)).all()

@router.get("/{appointment_id}", response_model=AppointmentRead)
def get_appointment(appointment_id: int, session: Session = Depends(get_db)):
    appt = session.get(Appointment, appointment_id)
    if not appt:
        raise HTTPException(status_code=404, detail="Appointment not found")
    return appt

@router.put("/{appointment_id}", response_model=AppointmentRead)
def update_appointment(appointment_id: int, update: AppointmentUpdate, session: Session = Depends(get_db)):
    appt = session.get(Appointment, appointment_id)
    if not appt:
        raise HTTPException(status_code=404, detail="Appointment not found")
    update_data = update.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(appt, key, value)
    session.add(appt)
    session.commit()
    session.refresh(appt)
    return appt

@router.delete("/{appointment_id}")
def delete_appointment(appointment_id: int, session: Session = Depends(get_db)):
    appt = session.get(Appointment, appointment_id)
    if not appt:
        raise HTTPException(status_code=404, detail="Appointment not found")
    session.delete(appt)
    session.commit()
    return {"message": "Appointment deleted"}
