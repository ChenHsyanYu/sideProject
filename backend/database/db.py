import psycopg2
import os

# 🚀 從環境變數取得 DATABASE_URL
DATABASE_URL = os.environ.get("DATABASE_URL")

# ✅ 確保 DATABASE_URL 存在
if not DATABASE_URL:
    raise ValueError("❌ DATABASE_URL 環境變數未設定，請確認 Railway 配置")

# 🚀 建立 PostgreSQL 連線
conn = psycopg2.connect(DATABASE_URL)
cursor = conn.cursor()

# ✅ 測試資料庫是否連線成功
cursor.execute("SELECT NOW();")
print("✅ Database Connected:", cursor.fetchone())
