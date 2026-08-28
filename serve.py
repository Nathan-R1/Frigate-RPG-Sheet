#!/usr/bin/env python3
import http.server

PORT = 8000
PAGE = "frigate.html"

class Handler(http.server.BaseHTTPRequestHandler):
    def do_GET(self):
        with open(PAGE, "rb") as f:
            body = f.read()
        self.send_response(200)
        self.send_header("Content-Type", "text/html")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def log_message(self, *args):
        pass

with http.server.ThreadingHTTPServer(("0.0.0.0", PORT), Handler) as httpd:
    print(f"Serving {PAGE} at http://localhost:{PORT}")
    httpd.serve_forever()
