import json
import pickle
from http.server import BaseHTTPRequestHandler
from urllib import parse

# from sklearn import datasets
# from sklearn import svm

# iris = datasets.load_iris()
# X, y = iris['data'], iris['target']
# clf = svm.SVC(gamma='scale')
# clf.fit(X, y)

# import pickle
# with open('model.pickle', 'wb') as handle:
#     pickle.dump(clf, handle, protocol=pickle.HIGHEST_PROTOCOL)


class handler(BaseHTTPRequestHandler):

    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-type','text/plain')
        self.end_headers()

        params = dict(parse.parse_qsl(self.path.split('?')[-1]))
        data = params.get('d', None)

        if data is None:
            return

        with open('model.pickle', 'rb') as handle:
            clf = pickle.load(handle)
            print(json.loads(data))
            result = clf.predict([json.loads(data)])
            self.wfile.write(json.dumps(result.tolist()).encode())

        return

# # For debugging purpose only
# try:
#     from http.server import HTTPServer
#     PORT_NUMBER = 3002
#     #Create a web server and define the handler to manage the
#     #incoming request
#     server = HTTPServer(('', PORT_NUMBER), handler)
#     print('Started httpserver on port ' , PORT_NUMBER)

#     #Wait forever for incoming htto requests
#     server.serve_forever()

# except KeyboardInterrupt:
#     print('^C received, shutting down the web server')
#     server.socket.close()
    