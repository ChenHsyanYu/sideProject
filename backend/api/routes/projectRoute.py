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
def get_all_projects():
    try:
        # ✅ 取得 `userLineliffID` 參數
        userLineliffID = request.args.get('userLineliffID')

        if not userLineliffID:
            return jsonify({"error": "Missing userLineliffID"}), 400

        # ✅ 在 `memberCollection` 找到對應的用戶
        user = memberCollection.find_one({'userLineliffID': userLineliffID})

        if not user:
            return jsonify({"error": "User not found"}), 404

        # ✅ 取得該用戶的 `projects` 陣列
        projectIDs = user.get("projects", [])

        if not projectIDs:
            return jsonify({"projects": []}), 200  # 如果該用戶沒有任何專案

        # ✅ 在 `projectCollection` 中查找所有符合的 `projectID`
        projects = list(projectCollection.find({"projectID": {"$in": projectIDs}}, {"_id": 0}))

        return json_util.dumps(projects), 200, {'Content-Type': 'application/json'}

    except Exception as e:
        print(f"❌ Error fetching projects: {e}")
        return jsonify({"error": "Internal Server Error"}), 500


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
def fetch_one_project():
    try:
        # ✅ 獲取 `projectID` 並轉換為 `int`
        projectID = request.args.get("projectID")

        if not projectID:
            return jsonify({"error": "Missing projectID"}), 400
        
        try:
            projectID = int(projectID)
        except ValueError:
            return jsonify({"error": "Invalid projectID"}), 400

        # ✅ 依 `projectID` 查找 `projectMemberCollection` 中的專案
        projectData = projectMemberCollection.find_one({"projectID": projectID}, {"_id": 0})

        if not projectData:
            return jsonify({"error": "Project not found"}), 404

        # ✅ 取得 `members` 陣列中的 `lineliffID`
        memberIDs = [member["lineliffID"] for member in projectData.get("members", [])]

        # ✅ 在 `memberCollection` 中查找對應的會員資料
        membersData = list(memberCollection.find({"userLineliffID": {"$in": memberIDs}}, {"_id": 0}))

        # ✅ 將會員資訊加入 `projectData` 回傳
        projectData["members"] = membersData

        return json_util.dumps(projectData), 200, {'Content-Type': 'application/json'}

    except Exception as e:
        print(f"❌ Error fetching project: {e}")
        return jsonify({"error": "Internal Server Error"}), 500


@projectBp.route("/editProject", methods=['POST'])
def edit_project():
    try:
        # ✅ 获取 JSON 数据
        data = request.get_json()
        projectID = data.get("projectID")  # 获取 projectID

        if not projectID:
            return jsonify({"error": "Missing projectID"}), 400

        # ✅ 移除 projectID，防止修改 _id
        updateData = {k: v for k, v in data.items() if k != "projectID"}

        # ✅ 在 projectCollection 中更新该项目
        result = projectCollection.update_one(
            {"projectID": int(projectID)},  # 条件：匹配 projectID
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

    