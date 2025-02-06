import sys
import os

# 設定 Python 路徑，讓它找到 `flask/` 資料夾
project_home = os.path.dirname(os.path.abspath(__file__))
firstTry = sys.path.insert(0, project_home)  # ✅ 確保 Python 也能找到 backend/
flask = os.path.join(project_home, "backend\\flask")
flaskPath = sys.path.insert(0, os.path.join(project_home, "flask"))

# 🚀 嘗試載入 `flask/api.py` 內的 `app`
# from api import app

if __name__ == "__main__":
    print(flask)
    