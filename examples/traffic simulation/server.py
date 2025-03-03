import http.server
import socketserver

class MyRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        self.content_type = None
        super().__init__(*args, **kwargs)
    
    def send_header(self, keyword, value):
        # Add charset to HTML content type
        if keyword == 'Content-Type' and 'text/html' in value:
            value += '; charset=utf-8'
            self.content_type = 'text/html'
        elif keyword == 'Content-Type':
            self.content_type = value.split(';')[0]
        super().send_header(keyword, value)
    
    def end_headers(self):
        # Add security headers before closing headers
        if self.content_type == 'text/html':
            self.send_header('Content-Security-Policy', 
                "default-src 'self' cdnjs.cloudflare.com;"
                "style-src 'self' 'unsafe-inline';"
                "script-src 'self' cdnjs.cloudflare.com")
            self.send_header('Cache-Control', 'no-cache, max-age=0')
        else:
            self.send_header('Cache-Control', 'public, max-age=31536000, immutable')
        
        # Security headers for all responses
        self.send_header('X-Content-Type-Options', 'nosniff')
        self.send_header('X-Frame-Options', 'DENY')
        self.send_header('Referrer-Policy', 'strict-origin-when-cross-origin')
        
        super().end_headers()

PORT = 8000

with socketserver.TCPServer(("", PORT), MyRequestHandler) as httpd:
    print(f"Serving at http://localhost:{PORT}")
    print("Press Ctrl+C to stop")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServer stopped")