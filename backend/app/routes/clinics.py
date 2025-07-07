from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app import models, schemas
from app.routes.auth import get_clinic_admin  # assumes this now only checks `role == "admin"`

router = APIRouter( tags=["clinics"])

# ✅ 1. Create a new clinic (only if clinic user doesn't have one)
@router.post("/", response_model=schemas.Clinic, status_code=status.HTTP_201_CREATED)
def create_clinic(
    clinic: schemas.ClinicCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_clinic_admin),
):
    if current_user.clinic_id:
        raise HTTPException(status_code=400, detail="User already linked to a clinic.")

    db_clinic = models.Clinic(**clinic.dict())
    db.add(db_clinic)
    db.commit()
    db.refresh(db_clinic)

    # link user to the new clinic
    current_user.clinic_id = db_clinic.id
    db.commit()

    return db_clinic


# ✅ 2. Get your own clinic
@router.get("/", response_model=schemas.Clinic)
def get_my_clinic(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_clinic_admin),
):
    if not current_user.clinic_id:
        raise HTTPException(status_code=403, detail="User is not linked to any clinic")

    clinic = db.query(models.Clinic).get(current_user.clinic_id)
    if not clinic:
        raise HTTPException(status_code=404, detail="Clinic not found")

    return clinic


# ✅ 3. Get clinic by ID — only if current user owns it
@router.get("/{clinic_id}", response_model=schemas.Clinic)
def get_clinic_by_id(
    clinic_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_clinic_admin),
):
    if current_user.clinic_id != clinic_id:
        raise HTTPException(status_code=403, detail="Access denied")

    clinic = db.query(models.Clinic).get(clinic_id)
    if not clinic:
        raise HTTPException(status_code=404, detail="Clinic not found")

    return clinic


# ✅ 4. Get all clinics (public route — no auth)
@router.get("/all", response_model=list[schemas.Clinic])
def get_all_clinics(db: Session = Depends(get_db)):
    return db.query(models.Clinic).all()


# ✅ 5. Update clinic (only if current user owns it)
@router.put("/{clinic_id}", response_model=schemas.Clinic)
def update_clinic(
    clinic_id: int,
    updated: schemas.ClinicUpdate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_clinic_admin),
):
    if clinic_id != current_user.clinic_id:
        raise HTTPException(status_code=403, detail="Access denied")

    clinic = db.query(models.Clinic).get(clinic_id)
    if not clinic:
        raise HTTPException(status_code=404, detail="Clinic not found")

    for key, value in updated.dict(exclude_unset=True).items():
        setattr(clinic, key, value)

    db.commit()
    db.refresh(clinic)
    return clinic


# ✅ 6. Delete clinic (only if current user owns it)
@router.delete("/{clinic_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_clinic(
    clinic_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_clinic_admin),
):
    if clinic_id != current_user.clinic_id:
        raise HTTPException(status_code=403, detail="Access denied")

    clinic = db.query(models.Clinic).get(clinic_id)
    if not clinic:
        raise HTTPException(status_code=404, detail="Clinic not found")

    db.delete(clinic)
    db.commit()
    return {"detail": f"Clinic {clinic_id} deleted"}


# ✅ 7. Public: verify if a clinic exists
@router.get("/{clinic_id}/verify")
def verify_clinic(clinic_id: int, db: Session = Depends(get_db)):
    clinic = db.query(models.Clinic).get(clinic_id)
    if not clinic:
        raise HTTPException(status_code=404, detail="Clinic not found")
    return {"exists": True, "clinic_name": clinic.name}
