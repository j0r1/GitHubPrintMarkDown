#!/usr/bin/env python

import os
import pprint
import sys
import urllib2
import json

contentTypeMap = {
        "html":     "text/html",
        "txt":      "text/plain",
        "jpg":      "image/jpeg",
        "png":      "image/png",
        "css":      "text/css",
        "doc":      "application/msword",
        "js":       "application/javascript",
        "css":      "text/css",
        "svg":      "image/svg+xml",
        "tar.gz":   "application/x-tar",
        ".exe":     "application/octet-stream"
}

class ServeException(Exception): 
    def __init__(self, msg):
        self.msg = msg

    def __str__(self):
        return self.msg

def main():
    try:
        prefix = "./page"
        reqPath = os.environ['PATH_INFO']

        if reqPath == "/javascriptcode.js":
            r = urllib2.urlopen("https://raw.githubusercontent.com/j0r1/GitHubPrintMarkDown/master/javascriptcode.js")
            data = r.read()
            contType = "text/plain"
        else:
            if reqPath == "/":
                reqPath = "index.html"
            
            idx = 0
            while reqPath[idx] in "/.":
                idx += 1

            reqPath = reqPath[idx:]
            fullPath = os.path.join(prefix, reqPath)

            if os.path.isdir(fullPath):
                fullPath = os.path.join(fullPath, "index.html")

            if not os.path.isfile(fullPath):
                raise ServeException("Path %s does not exist" % fullPath)
            
            contType = "application/octet-stream"

            for ext in contentTypeMap:
                if fullPath.lower().endswith("." + ext):
                    contType = contentTypeMap[ext]
                    break

            with open(fullPath, "rb") as f:
                data = f.read()

    except Exception as e:
        print "Status: 500 Internal server error"
        print "Content-type: text/plain"
        print
        print "Internal server error"
        print e
        return

    sys.stdout.write("Content-type: %s\n\n" % contType )
    sys.stdout.write(data);

if __name__ == "__main__":
    main()

