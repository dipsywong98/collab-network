import networkx as nx
import dash
import dash_core_components as dcc
import dash_html_components as html
import networkx as nx
import plotly.graph_objs as go
import pandas as pd
from colour import Color
from datetime import datetime
from textwrap import dedent as d
import json

G = nx.Graph()
G.add_edge('A', 'B', weight=4)
G.add_edge('B', 'D', weight=2)
G.add_edge('A', 'C', weight=3)
G.add_edge('C', 'D', weight=4)
nx.shortest_path(G, 'A', 'D', weight='weight')

external_stylesheets = ['https://codepen.io/chriddyp/pen/bWLwgP.css']
app = dash.Dash(__name__, external_stylesheets=external_stylesheets)
app.title = "Transaction Network"

app.layout = html.Div([
    html.Div([html.H1("Transaction Network Graph")],
             className="row",
             style={'textAlign': "center"}),
    html.Div(className="row",
             children=[
                 html.Div(
                     className="two columns",
                     children=[
                         dcc.Markdown(
                             d("""
                            **Time Range To Visualize**
                            Slide the bar to define year range.
                            """)),
                         html.Div(
                             className="twelve columns",
                             children=[
                                 dcc.RangeSlider(id='my-range-slider',
                                                 min=2010,
                                                 max=2019,
                                                 step=1,
                                                 value=[2010, 2019],
                                                 marks={
                                                     2010: {
                                                         'label': '2010'
                                                     },
                                                     2011: {
                                                         'label': '2011'
                                                     },
                                                     2012: {
                                                         'label': '2012'
                                                     },
                                                     2013: {
                                                         'label': '2013'
                                                     },
                                                     2014: {
                                                         'label': '2014'
                                                     },
                                                     2015: {
                                                         'label': '2015'
                                                     },
                                                     2016: {
                                                         'label': '2016'
                                                     },
                                                     2017: {
                                                         'label': '2017'
                                                     },
                                                     2018: {
                                                         'label': '2018'
                                                     },
                                                     2019: {
                                                         'label': '2019'
                                                     }
                                                 }),
                                 html.Br(),
                                 html.Div(id='output-container-range-slider')
                             ],
                             style={'height': '300px'}),
                         html.Div(className="twelve columns",
                                  children=[
                                      dcc.Markdown(
                                          d("""
                            **Account To Search**
                            Input the account to visualize.
                            """)),
                                      dcc.Input(id="input1",
                                                type="text",
                                                placeholder="Account"),
                                      html.Div(id="output")
                                  ],
                                  style={'height': '300px'})
                     ]),
                 html.Div(
                     className="eight columns",
                     children=[dcc.Graph(id="my-graph", figure=G)],
                 ),
                 html.Div(className="two columns",
                          children=[
                              html.Div(className='twelve columns',
                                       children=[
                                           dcc.Markdown(
                                               d("""
                            **Hover Data**
                            Mouse over values in the graph.
                            """)),
                                           html.Pre(id='hover-data', )
                                       ],
                                       style={'height': '400px'}),
                              html.Div(className='twelve columns',
                                       children=[
                                           dcc.Markdown(
                                               d("""
                            **Click Data**
                            Click on points in the graph.
                            """)),
                                           html.Pre(id='click-data', )
                                       ],
                                       style={'height': '400px'})
                          ])
             ])
])

if __name__ == '__main__':
    app.run_server()