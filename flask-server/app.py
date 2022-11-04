from flask import Flask, request, redirect
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

"""Default App Initialization"""
app = Flask(__name__)
CORS(app)
app.config["MONGO_URI"] = "mongodb://localhost:27017/moneytrackerDB"
mongo = PyMongo(app)
budget = mongo.db["budget"]

default_data = {
    "Bills": {},
    "Savings": {},
    "Income": {},
}

"""The Dashboard route request. No inputs -- returns the DB entry for 
Bills, Income, and Savings. If nothing is present in the DB, 
it initialized the 'budget' collection with the above defualt data"""
@app.route("/dashboard", methods=["GET"], strict_slashes=False)
@cross_origin()
def dashboard():
    query = budget.find()
    resp = json_util.dumps(query)

    if resp == "[]":
        print("Inserted Default Values")
        budget.insert_one(default_data)
        query = budget.find()
        resp = json_util.dumps(query)

    return resp


"""The delete All request. Used in development to clear the DB"""
@app.route("/delete", methods=["GET"], strict_slashes=False)
@cross_origin()
def delete():
    budget.drop()
    print("Deleted db values")

    return redirect("http://127.0.0.1:3000/dashboard")


"""The add new item request. Takes a category, new item, and amount as inputs
as JSON. Finds the entry in the database, spreads the current values, adds the 
new data, and updates it in the DB. Redirects to the Dashboard route"""
@app.route("/addnew/<item>", methods=["POST"], strict_slashes=False)
@cross_origin()
def new_add(item):
    category = item.title()
    new_item = request.json["bill"]
    new_amount = request.json["amount"]

    query = budget.find_one()
    id = query["_id"]
    p = query[category]

    newVal = {**p, new_item: new_amount}
    new_values = {"$set": {category: newVal}}
    budget.update_one({"_id": id}, new_values)
    return redirect("/dashboard")


"""The delete item request. Takes a category and new item as inputs, finds the entry
in the database, takes the old values and filters out the input item. Updates DB with new 
filtered items. Redirects to the Dashboard route"""
@app.route("/delete/<item>", methods=["POST"], strict_slashes=False)
@cross_origin()
def delete_item(item):
    category = item
    new_item = str(request.json["item"])
    # new_amount = requeryuest.json["amount"]

    query = budget.find_one()
    id = query["_id"]
    p = query[category]

    old_vals = {**p}
    new_vals = dict(filter(lambda x: x != new_item, old_vals.keys()))
    new_values = {"$set": {category: new_vals}}
    budget.update_one({"_id": id}, new_values)
    return redirect("/dashboard")


if __name__ == "__main__":
    app.run(debug=True)
