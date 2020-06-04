from flask import Flask, jsonify, send_file, request, send_from_directory

from lib.functions import *
from lib.graph import *

print('loading graph')
whole_graph = open_or_compute_graph('whole_graph', make_whole_graph)
print('graph ready', len(whole_graph.nodes()))

app = Flask(__name__,
            static_url_path='',
            static_folder='client/build')


@app.route('/graphFiles/<path:path>')
def send_graph_html(path):
    return send_from_directory('docs', path)


@app.route('/api/graphs', methods=['GET'])
def graph_htmls():
    """
    list the graph html files under docs/
    :return:
    """
    mypath = './docs'
    onlyfiles = path_to_files(mypath)
    return jsonify({'files': onlyfiles})


@app.route('/', methods=['GET'])
def index():
    """
    webpage client
    :return:
    """
    return send_file('./client/build/index.html')


@app.route('/api/filter', methods=['POST'])
def filter_route():
    """
    filter the authors by query string
    :return:
    """
    body = request.get_json()
    paginate = body['paginate'] if 'paginate' in body else None
    #  body['columns'] if 'columns' in body else ['*']
    rows = filter_authors(body['query'])
    counts = len(rows)
    if paginate is not None:
        offset = paginate['offset']
        length = paginate['length']
        rows = rows[offset:(offset + length)]
    return jsonify({'rows': rows, 'counts': counts})


@app.route('/api/subgraphs', methods=['POST'])
def filter_to_subgraphs():
    """
    get connected subgraphs
    query parameter to search for idx to build subgraphs
    directly give idx parameter to build subgraphs
    :return:
    """
    body = request.get_json()
    if 'query' in body:
        authors = filter_authors_select(body['query'], ['idx'])
        print(len(authors))
        subgraphs = whole_graph.subgraph([str(r[0]) for r in authors])
    else:
        subgraphs = whole_graph.subgraph(body['ids'])
    subgraphs = [list(g) for g in list(nx.connected_components(subgraphs))]
    subgraphs.sort(key=len, reverse=True)
    return jsonify(subgraphs)


@app.route('/api/filter/count', methods=['POST'])
def filter_count():
    """
    count number of authors that matches the query
    :return:
    """
    query = request.get_json()['query']
    return jsonify({"length": len(filter_authors(query))})


@app.route('/api/filter/byid', methods=['POST'])
def filter_byid():
    """
    count number of authors that matches the query
    :return:
    """
    ids = request.get_json()['ids']
    return jsonify(author_by_ids(ids))


@app.route('/api/graph', methods=['POST'])
def build_graph():
    """
    build the graph html file and other graph insight
    :return:
    """
    body = request.get_json()
    ids = body['ids']
    name = body['name']
    sub_graph = whole_graph.subgraph(ids)
    response = {}
    if len(ids) <= 1000:
        visualize(sub_graph, name)
        response['name'] = name
    else:
        response['message'] = 'the graph is too big to visualize'
    deg, node_id = compute_max_degree(sub_graph)
    response['max_degree'] = deg
    response['argmax_degree'] = node_id
    return jsonify(response)


@app.route('/api/path', methods=['POST'])
def get_path():
    """
    given source and target, build the path graph
    :return:
    """
    body = request.get_json()
    source = body['source']
    target = body['target']
    try:
        path = nx.shortest_path(whole_graph, source, target)
        subgraph = whole_graph.subgraph(path)
        if 'name' in body:
            name = body['name']
        else:
            name = 'path_%s_%s.html' % (source, target)
        visualize(subgraph, name)
        return jsonify({"name": name, 'path': path})
    except nx.exception.NetworkXNoPath:
        return jsonify({'error': 'no path between %s and %s' % (source, target)})


@app.route('/api/degree', methods=['POST'])
def get_degree_connection():
    """
    given source and degree, generate the subgraph of maximum degree
    :return:
    """
    body = request.get_json()
    source = body['source']
    degree = body['degree']
    name = f"degree_{source}_{degree}.html"
    if 'name' in body:
        name = body['name']
    node_distance = nx.single_source_shortest_path_length(whole_graph, source=source, cutoff=degree)
    nodes = [n for n in node_distance]
    if len(nodes) <= 1000:
        visualize(whole_graph.subgraph(nodes), name)
        return jsonify({
            'name': name,
            'dict': node_distance
        })
    else:
        return jsonify({
            'error': 'The graph is too big to visualize',
            'dict': node_distance
        })


# @app.route('/<path:path>')
# def client(path):
#     return send_from_directory('./client/build', path)

# if __name__ == '__main__':
#     http_server = WSGIServer(('', 4000), app)
#     http_server.serve_forever()


print('server ready')

app.run(host='0.0.0.0', port=4000, debug=True)
