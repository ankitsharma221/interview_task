import pandas as pd
from sqlalchemy import create_engine

def load_users():
    engine = create_engine('sqlite:///ecommerce.db')
    df = pd.read_csv('data/users.csv')
    df.to_sql('users', con=engine, if_exists='replace', index=False)
    print("✅ users.csv loaded")

def load_products():
    engine = create_engine('sqlite:///ecommerce.db')
    df = pd.read_csv('data/products.csv')
    df.to_sql('products', con=engine, if_exists='replace', index=False)
    print("✅ products.csv loaded")

if __name__ == '__main__':
    load_users()
    load_products()
