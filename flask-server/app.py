# import pymongo
from flask import Flask, jsonify, request, redirect
from flask_pymongo import PyMongo
import bson.json_util as json_util
from flask_cors import CORS, cross_origin






"""Code to interact with MongoSH directly"""
# connn_str = "mongodb://localhost:27017"
# client = pymongo.MongoClient(connn_str)
# db = client.tutorial
# tutorial1 = {
#     "title": "test"
# }
# tutorial = db.tutorial
# result = tutorial.insert_one(tutorial1)
# print(result)



app = Flask(__name__)
CORS(app)
app.config["MONGO_URI"] = "mongodb://localhost:27017/moneytrackerDB"
mongo = PyMongo(app)

# bills = mongo.db["bills"]
# income = mongo.db["income"]
# savings = mongo.db["savings"]

budget = mongo.db["budget"]

data = {
    "Bills": {},
    "Savings": {},
    "Income": {},
}
# budget.insert_one(data)




@app.route("/dashboard", methods=["GET"], strict_slashes=False)
@cross_origin()
def dashboard():
    q = budget.find()
    resp = json_util.dumps(q)

    if resp == "[]":
        print("Inserted Default Values")
        budget.insert_one(data)
        q = budget.find()
        resp = json_util.dumps(q)

    return resp


@app.route("/add", methods=["GET", "POST"], strict_slashes=False)
@cross_origin()
def add():
    new_item = request.json["bill"]
    new_amount = request.json["amount"]

    q = budget.find_one()
    id = q["_id"]
    p = q["Bills"]


    newVal = { **p, new_item: new_amount}
    new_values = {"$set": {"Bills": newVal}}
    budget.update_one({"_id": id}, new_values)
    return redirect("/dashboard")


@app.route("/delete", methods=["GET"], strict_slashes=False)
@cross_origin()
def delete():
    budget.drop()
    print("Deleted db values")

    return redirect("http://127.0.0.1:3000/dashboard")


@app.route("/addnew/<item>", methods=["POST"], strict_slashes=False)
@cross_origin()
def new_add(item):
    category = item.title()
    new_item = request.json["bill"]
    new_amount = request.json["amount"]

    q = budget.find_one()
    id = q["_id"]
    p = q[category]

    newVal = { **p, new_item: new_amount}
    new_values = {"$set": {category: newVal}}
    budget.update_one({"_id": id}, new_values)
    return redirect("/dashboard")



@app.route("/delete/<item>", methods=["POST"], strict_slashes=False)
@cross_origin()
def delete_item(item):
    print("delete_item called")
    print(item)
    return redirect("/dashboard")

    



    




if __name__ == "__main__":
    app.run(debug=True)




