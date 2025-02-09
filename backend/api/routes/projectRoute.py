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
billingCollection = projectDB['billing']



@projectBp.route("/")
def home():
    # allProjectsData = list(allProjects.find({},{'_id':0}))
    return "hello from flask"

@projectBp.route("/allProjects", methods=["GET"])
def project():
    projectInfo = list(projectCollection.find({}, {"_id":0}))
    return json_util.dumps(projectInfo), 200, {'Content-Type': 'application/json'}

@projectBp.route("/addProject", methods=["POST"])
def addProject():
    try:
        
        # ✅ 從請求中獲取 JSON 資料
        data = request.get_json()

        # ✅ 插入到 MongoDB
        result = projectCollection.insert_one(data)

        return jsonify({"message": "Project added successfully!"}), 201

    except Exception as e:
        print(f"❌ Error adding project: {e}")
        return jsonify({"error": "Internal Server Error"}), 500

@projectBp.route("/project", methods=['GET'])
def fetchOneProject():
    projectID = request.args.get("projectID")
    data = list(billingCollection.find({'projectID':int(projectID)}, {"_id":0}))
    
    if not data:
        return [],
    return jsonify(data),200
    