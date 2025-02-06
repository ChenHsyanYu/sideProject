from flask import Flask, request, jsonify
from db import allProjects  # 匯入 MongoDB 連接

app = Flask(__name__)

@app.route("/allProjects",methods=["GET"])
def getAllProjects():
    allProjectsData = list(allProjects.find({},{'_id':0}))
    return jsonify(allProjectsData)