from flask import Blueprint, jsonify, request
import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../../')))
from database.db import client as db
billingBp = Blueprint("billing", __name__)
billingDB = db['projects']
billingCollection = billingDB['billing']


@billingBp.route('/editBill', methods=['POST'])
def editBills():
    try:
        editData = request.get_json()
        billingID = editData["billingID"]
        updateData = {k: v for k, v in editData.items() if k != "billingID"}
        
        result = billingCollection.update_one(
            {"projectID": int(billingID)},  # 条件：匹配 billingID
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
    
    
@billingBp.route('/addBill', methods=['POST'])
def addBill(): 
    try:
        billData = request.get_json()
        lastBilling = billingCollection.find_one({}, sort=[("billingID", -1)])
        newBillingID = (lastBilling["billingID"] + 1) if lastBilling else 1

        # ✅ 赋值新的 projectID
        billData["billingID"] = newBillingID
        
        billingCollection.inser_one(billData)
        
        return jsonify({
            "message": "Billing added successfully!",
            "billing": billData
        }), 201
    except Exception as e:
        print(f"❌ Error updating project: {e}")
        return jsonify({"error": "Internal Server Error"}), 500
 
@billingBp.route('/deleteBill', methods=['DELETE'])
def deleteBill():
    try:
        billingID = request.args.get("billingID")
        if billingID is None:
            return jsonify({"error": "Missing projectID"}), 400

        try:
            billingID = int(billingID)
        except ValueError:
            return jsonify({"error": "Invalid billingID"}), 400

        # ✅ 删除 `projectCollection` 中的项目
        billingResult = billingCollection.delete_one({"billingID": billingID})


        # ✅ 返回删除结果
        return jsonify({
            "message": "Billing deleted successfully!",
        }), 200

    except Exception as e:
        print(f"❌ Error deleting project: {e}")
        return jsonify({"error": "Internal Server Error"}), 500
        
    
