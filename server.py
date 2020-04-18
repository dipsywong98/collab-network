from os import listdir
from os.path import isfile, join

from flask import Flask, jsonify, send_file

app = Flask(__name__,
            static_url_path='',
            static_folder='client/build')


@app.route('/api/graphs', methods=['GET'])
def graphHtmls():
    mypath = './docs'
    onlyfiles = [f for f in listdir(mypath) if isfile(join(mypath, f)) and f.endswith('.html')]
    return jsonify({'files': onlyfiles})


@app.route('/', methods=['GET'])
def index():
    return send_file('./client/build/index.html')


# @app.route('/<path:path>')
# def client(path):
#     return send_from_directory('./client/build', path)

# if __name__ == '__main__':
#     http_server = WSGIServer(('', 4000), app)
#     http_server.serve_forever()
app.run(host='0.0.0.0', port=4000, debug=True)
