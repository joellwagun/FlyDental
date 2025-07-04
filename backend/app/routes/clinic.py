from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from typing import List
from app import models, schemas
from app.database import get_db

router = APIRouter(
   
    tags=["Clinic"]
)

# Allow both /clinics and /clinics/ to avoid 307 redirects
@router.post("", response_model=schemas.ClinicRead)
@router.post("/", response_model=schemas.ClinicRead)
def create_clinic(
    clinic: schemas.ClinicCreate,
    db: Session = Depends(get_db)
):
    # Convert services from list to comma-separated string
    clinic_data = clinic.dict()
    clinic_data["services"] = ",".join(clinic_data["services"])

    db_clinic = models.Clinic(**clinic_data)
    db.add(db_clinic)
    db.commit()
    db.refresh(db_clinic)
    return db_clinic



@router.get("/", response_model=List[schemas.ClinicRead])
def get_all_clinics(db: Session = Depends(get_db)):
    return db.query(models.Clinic).all()


@router.get("/{clinic_id}", response_model=schemas.ClinicRead)
def get_clinic(clinic_id: int, db: Session = Depends(get_db)):
    clinic = db.query(models.Clinic).get(clinic_id)
    if not clinic:
        raise HTTPException(status_code=404, detail="Clinic not found")
    return clinic


@router.put("/{clinic_id}", response_model=schemas.ClinicRead)
def update_clinic(
    clinic_id: int,
    updated: schemas.ClinicCreate,
    db: Session = Depends(get_db)
):
    clinic = db.query(models.Clinic).get(clinic_id)
    if not clinic:
        raise HTTPException(status_code=404, detail="Clinic not found")

    updated_data = updated.dict()
    updated_data["services"] = ",".join(updated_data["services"])

    for k, v in updated_data.items():
        setattr(clinic, k, v)

    db.commit()
    db.refresh(clinic)
    return clinic



@router.delete("/{clinic_id}")
def delete_clinic(clinic_id: int, db: Session = Depends(get_db)):
    clinic = db.query(models.Clinic).get(clinic_id)
    if not clinic:
        raise HTTPException(status_code=404, detail="Clinic not found")

    db.delete(clinic)
    db.commit()
    return {"detail": f"Clinic {clinic_id} deleted"}
