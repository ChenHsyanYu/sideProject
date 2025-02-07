from flask import Flask, request, jsonify
# from db import allProjects  # 匯入 MongoDB 連接
import os
import sys
# from ..database.db import cursor

app = Flask(__name__)

@app.route("/")
def home():
    # allProjectsData = list(allProjects.find({},{'_id':0}))
    return "hello from flask"

@app.route("/project", methods=["GET"])
def project():
    return jsonify([{'id:': 0}])


if __name__ == "__main__":
    app.run(debug=True) 