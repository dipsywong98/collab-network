import os
import shutil

if os.path.exists('dist/server'):
    shutil.rmtree('dist/server')

os.system('pyinstaller server.py ')
os.system('cd client && yarn build')

os.mkdir('dist/server/docs')
shutil.copytree('client/build', 'dist/server/client/build')
os.mkdir('dist/server/data_cache')
shutil.copyfile('data_cache/whole_graph.edgelist.gz', 'dist/server/data_cache/whole_graph.edgelist.gz')
shutil.copyfile('data_cache/author.db', 'dist/server/data_cache/author.db')
