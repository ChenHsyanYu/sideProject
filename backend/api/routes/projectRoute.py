from flask import request, Blueprint, jsonify
from bson import json_util,ObjectId
# from bson import ObjectId
import datetime


import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../../')))
from database.db import client as db
projectBp = Blueprint("project", __name__)



@projectBp.route("/")
def home():
    # allProjectsData = list(allProjects.find({},{'_id':0}))
    return "hello from flask"

@projectBp.route("/project", methods=["GET"])
def project():
    database= db['projects']
    collection = database['project']
    
    projectInfo = list(collection.find({}, {"_id":0}))
    return json_util.dumps(projectInfo), 200, {'Content-Type': 'application/json'}

@projectBp.route("/addProject", methods=["POST"])
def addProject():
    try:
        database = db["projects"]  # 選擇資料庫
        projectCollection = database["project"]  # 選擇 Collection
        
        # ✅ 從請求中獲取 JSON 資料
        data = request.json
        
        # ✅ 轉換數據格式
        project_data = {
            "_id": ObjectId(data["_id"]["$oid"]),  # MongoDB ObjectId
            "lineliffID": data["lineliffID"],
            "projectID": int(data["projectID"]["$numberInt"]),  # 轉換為整數
            "projectName": data["projectName"],
            "isProjectEnded": bool(data["isProjectEnded"]),  # 確保是布林值
            "projectExpense": int(data["projectExpense"]["$numberInt"]),  # 轉換為整數
            "projectBudget": int(data["projectBudget"]["$numberInt"]),  # 轉換為整數
            # "startDay": datetime.datetime.utcfromtimestamp(data["startDay"]["$timestamp"]["t"]),  # 轉換為 `datetime`
            # "endDay": datetime.datetime.utcfromtimestamp(data["endDay"]["$timestamp"]["t"]),  # 轉換為 `datetime`
        }

        # ✅ 插入到 MongoDB
        result = projectCollection.insert_one(project_data)

        return jsonify({"message": "Project added successfully!"}), 201

    except Exception as e:
        print(f"❌ Error adding project: {e}")
        return jsonify({"error": "Internal Server Error"}), 500
    