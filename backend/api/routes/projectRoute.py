from flask import request, Blueprint, jsonify
from bson import json_util,ObjectId
# from bson import ObjectId
import datetime


import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../../')))
from database.db import client as db
projectBp = Blueprint("project", __name__)
projectDB = db['projects']
projectCollection = projectDB['project']



@projectBp.route("/")
def home():
    # allProjectsData = list(allProjects.find({},{'_id':0}))
    return "hello from flask"

@projectBp.route("/project", methods=["GET"])
def project():
    projectInfo = list(projectCollection.find({}, {"_id":0}))
    return json_util.dumps(projectInfo), 200, {'Content-Type': 'application/json'}

@projectBp.route("/addProject", methods=["POST"])
def addProject():
    try:
        
        # ✅ 從請求中獲取 JSON 資料
        data = request.json
        
        # ✅ 轉換數據格式
        projectData = {
            "_id": ObjectId(data["_id"]["$oid"]),  # MongoDB ObjectId
            "lineliffID": data["lineliffID"],
            "projectID": int(data["projectID"]["$numberInt"]),  # 轉換為整數
            "projectName": data["projectName"],
            "projectSubtitle": data["projectSubtitle"],
            "isProjectEnded": bool(data["isProjectEnded"]),  # 確保是布林值
            "projectExpense": int(data["projectExpense"]["$numberInt"]),  # 轉換為整數
            "projectBudget": int(data["projectBudget"]["$numberInt"]),  # 轉換為整數
            "startTime": datetime.utcfromtimestamp(data["startTime"]).strftime('%Y-%m-%d %H:%M:%S'),  # 轉換為 `datetime`
            "endTime": datetime.utcfromtimestamp(data["endTime"]).strftime('%Y-%m-%d %H:%M:%S'),  # 轉換為 `datetime`
        }

        # ✅ 插入到 MongoDB
        result = projectCollection.insert_one(projectData)

        return jsonify({"message": "Project added successfully!"}), 201

    except Exception as e:
        print(f"❌ Error adding project: {e}")
        return jsonify({"error": "Internal Server Error"}), 500
    