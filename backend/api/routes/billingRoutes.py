from flask import Blueprint, jsonify, request
import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../../')))
from database.db import client as db
billingBp = Blueprint("billing", __name__)
billingDB = db['projects']
billingCollection = billingDB['billing']

@billingBp.route('/allBillings', methods=['GET'])
def getBillings():
    try:
        projectID = request.args.get("projectID")
        if projectID is None:
            return jsonify({"error": "Missing projectID"}), 400

        projectID = int(projectID)
        billings = list(billingCollection.find({"projectID": projectID}, {"_id": 0}))

        return jsonify({"billings": billings}), 200

    except ValueError:
        return jsonify({"error": "Invalid projectID"}), 400  # 🔍 捕獲 projectID 不是數字的錯誤
    except Exception as e:
        print(f"❌ Error fetching projects: {e}")
        return jsonify({"error": "Internal Server Error"}), 500
     
        
@billingBp.route('/editBilling', methods=['POST'])
def editBills():
    try:
        editData = request.get_json()
        
        if "billingID" not in editData:
            return jsonify({"error": "Missing billingID"}), 400

        billingID = editData["billingID"]
        try:
            billingID = int(billingID)
        except ValueError:
            return jsonify({"error": "Invalid billingID"}), 400

        updateData = {k: v for k, v in editData.items() if k != "billingID"}
        
        if not updateData:
            return jsonify({"error": "No fields to update"}), 400  # 🔍 避免無效請求
        
        result = billingCollection.update_one(
            {"billingID": billingID},
            {"$set": updateData}
        )

        if result.matched_count == 0:
            return jsonify({"error": "Billing not found"}), 404

        return jsonify({
            "message": "Billing updated successfully!",
            "modifiedCount": result.modified_count
        }), 200

    except Exception as e:
        print(f"❌ Error updating billing: {e}")
        return jsonify({"error": "Internal Server Error"}), 500

    
    
@billingBp.route('/addBilling', methods=['POST'])
def addBill(): 
    try:
        billData = request.get_json()
        projectID = billData["projectID"]

        # 找到該 projectID 下的所有帳單
        projectBillings = list(billingCollection.find({"projectID": projectID}, {"_id": 0, "billingID": 1}))

        # 獲取當前最大 billingID
        newBillingID = max([bill["billingID"] for bill in projectBillings], default=-1) + 1

        # ✅ 赋值新的 billingID
        billData["billingID"] = newBillingID

        billingCollection.insert_one(billData)  # 🔍 修正拼寫錯誤

        return jsonify({
            "message": "Billing added successfully!",
            "billing": billData
        }), 201
    except Exception as e:
        print(f"❌ Error adding project: {e}")  # 🔍 修正錯誤信息
        return jsonify({"error": "Internal Server Error"}), 500

 
@billingBp.route('/deleteBilling', methods=['DELETE'])
def deleteBill():
    try:
        billingID = request.args.get("billingID")
        if billingID is None:
            return jsonify({"error": "Missing billingID"}), 400  # 🔍 修正錯誤信息

        try:
            billingID = int(billingID)
        except ValueError:
            return jsonify({"error": "Invalid billingID"}), 400

        # ✅ 刪除 `billingCollection` 中的帳單
        billingResult = billingCollection.delete_one({"billingID": billingID})

        if billingResult.deleted_count == 0:
            return jsonify({"error": "Billing not found"}), 404

        return jsonify({"message": "Billing deleted successfully!"}), 200

    except Exception as e:
        print(f"❌ Error deleting billing: {e}")
        return jsonify({"error": "Internal Server Error"}), 500

        
    
