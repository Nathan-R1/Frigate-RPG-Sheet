#!/usr/bin/env python3
import http.server

PORT = 8000
PAGE = "frigate.html"

HEX_PAGE = "hex-grid-generator.html"

ADMIN_PAGE = "admin.html"

JS_PAGES = ("tech-presets.js", "crew-presets.js", "mod-presets.js")
CSS_PAGES = ("style.css", "frigate.css", "admin.css")

class Handler(http.server.BaseHTTPRequestHandler):
    def do_GET(self):
        page = PAGE
        content_type = "text/html"
        path = self.path.split("?")[0].split("#")[0].rstrip("/")
        if path == "/hex" or path.endswith("/hex/index.html"):
            page = HEX_PAGE
        elif path == "/admin" or path.endswith("/admin/index.html"):
            page = ADMIN_PAGE
        last = path.rsplit("/", 1)[-1]
        if last in JS_PAGES:
            page = last
            content_type = "application/javascript"
        elif last in CSS_PAGES:
            page = last
            content_type = "text/css"
        with open(page, "rb") as f:
            body = f.read()
        self.send_response(200)
        self.send_header("Content-Type", content_type)
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def log_message(self, *args):
        pass

with http.server.ThreadingHTTPServer(("0.0.0.0", PORT), Handler) as httpd:
    print(f"Serving {PAGE} at http://localhost:{PORT}")
    print(f"Serving {HEX_PAGE} at http://localhost:{PORT}/hex/")
    print(f"Serving {ADMIN_PAGE} at http://localhost:{PORT}/admin/")
    print(f"Serving JS presets at http://localhost:{PORT}/[{', '.join(JS_PAGES)}]")
    print(f"Serving CSS at http://localhost:{PORT}/[{', '.join(CSS_PAGES)}]")
    httpd.serve_forever()