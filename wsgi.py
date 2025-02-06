import sys
import os

# 設定 Python 路徑，讓它找到 `flask/` 資料夾
project_home = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(project_home, "flask"))

# 🚀 嘗試載入 `flask/API.py` 內的 `app`
from api import app
