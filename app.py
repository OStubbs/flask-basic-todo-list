import json
from flask import Flask, render_template, request, jsonify

app = Flask(__name__)
json_file = 'todos.json'

def read_todos():
    try:
        with open(json_file, 'r') as f:
            return json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        return []

def write_todos(todos):
    with open(json_file, 'w') as f:
        json.dump(todos, f)

todos = read_todos()

@app.route('/')
def index():
    return render_template('index.html', todos=todos)

@app.route('/add', methods=['POST'])
def add_todo():
    data = request.get_json()
    todos.append(data['todo'])
    write_todos(todos)
    return jsonify({'todos': todos})

@app.route('/delete', methods=['POST'])
def delete_todo():
    data = request.get_json()
    todos.pop(data['index'])
    write_todos(todos)
    return jsonify({'todos': todos})

if __name__ == '__main__':
    app.run(host="127.0.0.1", debug=True)
