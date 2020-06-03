import matplotlib.pyplot as plt
import networkx as nx
from pyvis.network import Network


def make_graph(coauth_tuples):
    G = nx.Graph()
    for coauthor in coauth_tuples:
        G.add_edge(coauthor[0], coauthor[1], weight=coauthor[2])
    return G


def make_whole_graph():
    with open('data/AMiner-Coauthor.txt') as coauthorfile:
        coauthors = []
        for line in coauthorfile:
            author1, author2, count = line[1:].split('\t')
            coauthors.append((author1, author2, int(count)))
        return make_graph(coauthors)


def visualize(networkx_graph, name):
    if '.html' in name:
        pyvis_graph = Network(height=800, width=800, notebook=True)
        for node, node_attrs in networkx_graph.nodes(data=True):
            pyvis_graph.add_node(node, **node_attrs)

        # for each edge and its attributes in the networkx graph
        for source, target, edge_attrs in networkx_graph.edges(data=True):
            # if value/width not specified directly, and weight is specified, set 'value' to 'weight'
            if not 'value' in edge_attrs and not 'width' in edge_attrs and 'weight' in edge_attrs:
                # place at key 'value' the weight of the edge
                edge_attrs['value'] = edge_attrs['weight']
            # add the edge
            pyvis_graph.add_edge(source, target, **edge_attrs)

        return pyvis_graph.show('docs/' + name)
    elif '.svg' in name:
        # pos = nx.spring_layout(networkx_graph,k=0.25)
        options = {
            "node_color": "blue",
            "node_size": 20,
            "line_color": "grey",
            "linewidths": 1,
            "width": 1,
        }
        nx.draw(networkx_graph, **options)
        plt.savefig(f"docs/{name}")


def compute_max_degree(graph):
    node_id = []
    deg = 0
    for node in nx.nodes(graph):
        if graph.degree[node] > deg:
            node_id = [node]
            deg = graph.degree[node]
        elif graph.degree[node] == deg:
            node_id.append(node)
    return deg, node_id
