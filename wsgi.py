import sys
import os

# 取得專案根目錄
project_home = os.path.dirname(os.path.abspath(__file__))

# ✅ 修正路徑，確保 Linux 也能運行
sys.path.insert(0, os.path.join(project_home, "backend"))
sys.path.insert(0, os.path.join(project_home, "backend", "flask"))

# 🚀 嘗試載入 Flask 應用
from flask.api import app  # ✅ 修正 import
