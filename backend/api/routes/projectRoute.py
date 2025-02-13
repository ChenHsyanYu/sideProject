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
        new_project_id = (last_project["projectID"] + 1) if last_project else 1

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
        projectMemberCollection.insert_one({
            'projectID':new_project_id,
            'members':[{'memberID':0, 'lineliffID': creatorLineliffID}]
        })
        
        newProjectInfo = projectCollection.find_one({}, sort=[("projectID", -1)])

        return jsonify({
            "message": "Project added successfully!",
            "projectInfo": newProjectInfo
        }), 201

    except Exception as e:
        print(f"❌ Error adding project: {e}")
        return jsonify({"error": "Internal Server Error"}), 500
    
@projectBp.route("/deleteProject", methods=["DELETE"])
def delete_project():
    try:
        # ✅ 获取 `projectId`
        projectId = request.args.get("projectID")

        if projectId is None:
            return jsonify({"error": "Missing projectID"}), 400

        try:
            projectId = int(projectId)
        except ValueError:
            return jsonify({"error": "Invalid projectID"}), 400

        # ✅ 删除 `projectCollection` 中的项目
        projectResult = projectCollection.delete_one({"projectID": projectId})

        # ✅ 删除 `projectMemberCollection` 中的项目
        projectMemberResult = projectMemberCollection.delete_one({"projectID": projectId})

        # ✅ 删除 `billingCollection` 相关账单
        billingResult = billingCollection.delete_many({"projectID": projectId})

        # ✅ 从 `memberCollection` 中移除 `projectID`
        memberResult = memberCollection.update_many(
            {"projects": projectId},  # 找到所有包含此项目的成员
            {"$pull": {"projects": projectId}}  # 从 `projects` 数组中删除 `projectId`
        )

        # ✅ 返回删除结果
        return jsonify({
            "message": "Project deleted successfully!",
            "deletedProject": projectResult.deleted_count,
            "deletedMembers": projectMemberResult.deleted_count,
            "deletedBillings": billingResult.deleted_count,
            "updatedMembers": memberResult.modified_count
        }), 200

    except Exception as e:
        print(f"❌ Error deleting project: {e}")
        return jsonify({"error": "Internal Server Error"}), 500

@projectBp.route("/project", methods=['GET'])
def fetchOneProject():
    
    projectID = request.args.get("projectID")
    projectID = int(projectID)
    data = list(billingCollection.find({'projectID':int(projectID)}, {"_id":0}))
    
    if not data:
        return jsonify([]),200
    return jsonify(data), 200, {'Content-Type': 'application/json'}

@projectBp.route("/editProject", methods=['POST'])
def edit_project():
    try:
        # ✅ 获取 JSON 数据
        data = request.get_json()
        projectId = data.get("projectID")  # 获取 projectId

        if not projectId:
            return jsonify({"error": "Missing projectId"}), 400

        # ✅ 移除 projectId，防止修改 _id
        updateData = {k: v for k, v in data.items() if k != "projectId"}

        # ✅ 在 projectCollection 中更新该项目
        result = projectCollection.update_one(
            {"projectId": int(projectId)},  # 条件：匹配 projectId
            {"$set": updateData}  # 更新数据
        )

        # ✅ 检查是否更新成功
        if result.matched_count == 0:
            return jsonify({"error": "Project not found"}), 404

        return jsonify({
            "message": "Project updated successfully!",
            "modifiedCount": result.modified_count
        }), 200

    except Exception as e:
        print(f"❌ Error updating project: {e}")
        return jsonify({"error": "Internal Server Error"}), 500

    