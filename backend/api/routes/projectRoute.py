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
userDB = db['user']
memberCollection = userDB['member']
projectMemberCollection = projectDB['project_members']
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
        # ✅ 获取 JSON 数据
        data = request.get_json()
        creatorLineliffID = data["creatorLineliffID"]  # 确保前端传递了创建者的 Line ID

        # ✅ 获取当前最大 projectID
        last_project = projectCollection.find_one({}, sort=[("projectID", -1)])
        new_project_id = (last_project["projectID"] + 1) if last_project else 0

        # ✅ 赋值新的 projectID
        data["projectID"] = new_project_id

        # ✅ 插入新的项目到 `projectCollection`
        projectCollection.insert_one(data)

        # ✅ 查找 `memberCollection` 是否有该创建者
        member = memberCollection.find_one({"userLineliffID": creatorLineliffID})

        if member:
            # ✅ 如果用户已存在，则更新其 `projects` 数组
            memberCollection.update_one(
                {"userLineliffID": creatorLineliffID},
                {"$addToSet": {"projects": new_project_id}}  # 避免重复加入
            )
        projectMemberCollection.insert_one(jsonify({
            'projectID':new_project_id,
            'members':[{'memberID':0, 'lineliffID': creatorLineliffID}]
        }))

        return jsonify({
            "message": "Project added successfully!",
            "projectID": new_project_id
        }), 201

    except Exception as e:
        print(f"❌ Error adding project: {e}")
        return jsonify({"error": "Internal Server Error"}), 500



@projectBp.route("/project", methods=['GET'])
def fetchOneProject():
    
    projectID = request.args.get("projectID")
    projectID = int(projectID)
    data = list(billingCollection.find({'projectID':int(projectID)}, {"_id":0}))
    
    if not data:
        return jsonify([]),200
    return jsonify(data), 200, {'Content-Type': 'application/json'}
    