from sqlmodel import Session, select
from app.database import engine
from app.models import User
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def create_admin():
    with Session(engine) as session:
        admin_email = "admin@clinic.com"
        existing_admin = session.exec(select(User).where(User.email == admin_email)).first()
        if existing_admin:
            print("Admin user already exists.")
            return

        hashed_pw = pwd_context.hash("admin123")
        admin = User(
            email=admin_email,
            hashed_password=hashed_pw,
            role="admin"
        )
        session.add(admin)
        session.commit()
        print("✅ Admin user created.")

def create_clinic_user():
    with Session(engine) as session:
        clinic_email = "clinic@test.com"
        existing_clinic = session.exec(select(User).where(User.email == clinic_email)).first()
        if not existing_clinic:
            hashed_pw = pwd_context.hash("clinic123")
            clinic = User(
                email=clinic_email,
                hashed_password=hashed_pw,
                role="clinic",
                clinic_id=3  # Using existing clinic ID from your database
            )
            session.add(clinic)
            session.commit()
            print("✅ Clinic test user created.")

def create_regular_user():
    with Session(engine) as session:
        user_email = "user@test.com"
        existing_user = session.exec(select(User).where(User.email == user_email)).first()
        if not existing_user:
            hashed_pw = pwd_context.hash("user123")
            user = User(
                email=user_email,
                hashed_password=hashed_pw,
                role="user"
            )
            session.add(user)
            session.commit()
            print("✅ Regular test user created.")

if __name__ == "__main__":
    create_admin()
    create_clinic_user()
    create_regular_user()