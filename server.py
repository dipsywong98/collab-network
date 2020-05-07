from flask import Flask, jsonify, send_file, request

from lib.functions import *
from lib.db import *
from lib.cache import *
from lib.graph import *


print('loading graph')
whole_graph = open_or_compute_graph('whole_graph', make_whole_graph)
print('graph ready', len(whole_graph.nodes()))

app = Flask(__name__,
            static_url_path='',
            static_folder='client/build')


@app.route('/api/graphs', methods=['GET'])
def graph_htmls():
    mypath = './docs'
    onlyfiles = path_to_files(mypath)
    return jsonify({'files': onlyfiles})


@app.route('/', methods=['GET'])
def index():
    return send_file('./client/build/index.html')


@app.route('/api/filter', methods=['POST'])
def filter_route():
    body = request.get_json()
    #  body['columns'] if 'columns' in body else ['*']
    authors = filter_authors(body['query'])
    return jsonify(authors)


@app.route('/api/subgraphs', methods=['POST'])
def filter_to_subgraphs():
    body = request.get_json()
    if 'query' in body:
        authors = filter_authors_select(body['query'], ['idx'])
        print(len(authors))
        subgraphs = whole_graph.subgraph([str(r[0]) for r in authors])
    else:
        subgraphs = whole_graph.subgraph(body['ids'])
    subgraphs = [list(g.nodes()) for g in list(nx.connected_component_subgraphs(subgraphs))]
    subgraphs.sort(key=len, reverse=True)
    return jsonify(subgraphs)


@app.route('/api/filter/count', methods=['POST'])
def filter_count():
    query = request.get_json()['query']
    return jsonify({"length": len(filter_authors(query))})


@app.route('/api/graph', methods=['POST'])
def build_graph():
    body = request.get_json()
    ids = body['ids']
    name = body['name']
    sub_graph = whole_graph.subgraph(ids)
    visualize(sub_graph, name)
    return jsonify({"name": name})


# @app.route('/<path:path>')
# def client(path):
#     return send_from_directory('./client/build', path)

# if __name__ == '__main__':
#     http_server = WSGIServer(('', 4000), app)
#     http_server.serve_forever()
print('server ready')

app.run(host='0.0.0.0', port=4000, debug=True)
