<?php 

server {
    listen       80;
    server_name  localhost;

    location / {
        root   html;
        index  index.html index.htm;
    }

    error_page  404     /404.html;
    error_page  403     /403.html;

    error_page  405     =200 $uri;

    # ...
}
