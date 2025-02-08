from flask import Flask, request, jsonify
from flask_cors import CORS
# from db import allProjects  # 匯入 MongoDB 連接
import os
import sys
# 取得專案根目錄
project_home = os.path.dirname(os.path.abspath(__file__))

# ✅ 修正路徑，確保 Linux 也能運行
flask_path = os.path.join(project_home, "backend", "api", "routes")

# ✅ 將 `backend/flask` 加入 `sys.path`
sys.path.insert(0, flask_path)

# from ..database.db import client as db
from routes.billingRoutes import billingBp
from routes.projectRoute import projectBp
from routes.userRoutes import userBp

app = Flask(__name__)
CORS(app)
app.register_blueprint(billingBp)
app.register_blueprint(projectBp)
app.register_blueprint(userBp)


if __name__ == "__main__":
    app.run(debug=True) 
    port = int(os.environ.get("PORT", 5000))
    print(project_home)
    