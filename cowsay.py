import random
from http.server import BaseHTTPRequestHandler
from urllib import parse
from cowpy import cow


class handler(BaseHTTPRequestHandler):

    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-type','text/plain')
        self.end_headers()

        params = dict(parse.parse_qsl(self.path[2:]))

        default_message = 'Hello World, This is Zeit-My-App.\nYou can update this message by setting\nthe query string parameter \'message\'.'

        message = cow.Cowacter(eyes=random.choice(list(cow.eye_options()))).milk(params.get('message', default_message))
        self.wfile.write(message.encode())
        return

# For debugging purpose only
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
    