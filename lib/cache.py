import networkx as nx
import os.path
import json
import gzip

data_cache_prefix = 'data_cache/'
graph_suffix = '.edgelist.gz'
json_suffix = '.json.gz'
database_file = data_cache_prefix + "author.db"


def open_graph(filename):
    file_exists = os.path.isfile(data_cache_prefix + filename + graph_suffix)
    if file_exists:
        ret = nx.read_weighted_edgelist(data_cache_prefix + filename + graph_suffix)
        return ret
    else:
        return None


def save_graph(G, filename):
    nx.write_weighted_edgelist(G, data_cache_prefix + filename + graph_suffix)


def open_or_compute_graph(filename, func):
    graph = open_graph(filename)
    if graph is None:
        print('computing ' + filename)
        graph = func()
        save_graph(graph, filename)
        return graph
    else:
        print('loaded cached ' + filename)
        return graph


def open_json(filename):
    file_exists = os.path.isfile(data_cache_prefix + filename + json_suffix)

    if file_exists:
        with gzip.open(data_cache_prefix + filename + json_suffix, 'r') as f:
            return json.loads(f.read().decode('utf-8'))
    else:
        return None


def save_json(data, filename):
    with gzip.open(data_cache_prefix + filename + json_suffix, 'w') as f:
        f.write(json.dumps(data).encode('utf-8'))


def open_or_compute_json(filename, func):
    data = open_json(filename)
    if data is None:
        print('computing ' + filename)
        data = func()
        save_json(data, filename)
        return data
    else:
        print('loaded cached  ' + filename)
        return data
