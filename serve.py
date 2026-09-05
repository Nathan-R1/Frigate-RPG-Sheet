#!/usr/bin/env python3
import http.server

PORT = 8000
PAGE = "frigate.html"

HEX_PAGE = "hex-grid-generator.html"

ADMIN_PAGE = "admin.html"

class Handler(http.server.BaseHTTPRequestHandler):
    def do_GET(self):
        page = PAGE
        path = self.path.rstrip("/")
        if path == "/hex" or path.endswith("/hex/index.html"):
            page = HEX_PAGE
        elif path == "/admin" or path.endswith("/admin/index.html"):
            page = ADMIN_PAGE
        with open(page, "rb") as f:
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
    print(f"Serving {HEX_PAGE} at http://localhost:{PORT}/hex/")
    print(f"Serving {ADMIN_PAGE} at http://localhost:{PORT}/admin/")
    httpd.serve_forever()
