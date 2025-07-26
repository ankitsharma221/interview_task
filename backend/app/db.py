from sqlalchemy import create_engine
from app.models import Base

def init_db():
    engine = create_engine('sqlite:///ecommerce.db')
    Base.metadata.create_all(engine)
    print("Database tables created.")
