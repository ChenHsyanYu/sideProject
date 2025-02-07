from flask import Flask, request, jsonify
# from db import allProjects  # 匯入 MongoDB 連接
import os
import sys
# from ..database.db import client as db
from routes.billingRoutes import billingBp
from routes.projectRoute import projectBp
from routes.userRoutes import userBp

app = Flask(__name__)
app.register_blueprint(billingBp)
app.register_blueprint(projectBp)
app.register_blueprint(userBp)


if __name__ == "__main__":
    app.run(debug=True) 