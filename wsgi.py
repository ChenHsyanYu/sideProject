import sys
import os

# 取得專案根目錄
project_home = os.path.dirname(os.path.abspath(__file__))

# ✅ 修正路徑，確保 Linux 也能運行
flask_path = os.path.join(project_home, "backend", "flask")

# ✅ 將 `backend/flask` 加入 `sys.path`
sys.path.insert(0, flask_path)

# 🚀 檢查 sys.path（用來 debug）
print(f"🚀 Project Home: {project_home}")
print(f"✅ Flask Path Inserted: {flask_path}")
print("🔎 Current sys.path:")
for path in sys.path:
    print(f"   📂 {path}")

# 🚀 嘗試載入 Flask 應用
from backend.flask.api import app  # 🚀 修正路徑


# if __name__ == "__main__":
#     app.run(debug=True) 