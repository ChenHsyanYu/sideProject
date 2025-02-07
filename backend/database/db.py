import psycopg2
from config import DATABASE_URL

# 🚀 建立 PostgreSQL 連線
conn = psycopg2.connect(DATABASE_URL)
cursor = conn.cursor()

# ✅ 測試資料庫是否連線成功
cursor.execute("SELECT NOW();")
print("✅ Database Connected:", cursor.fetchone())
