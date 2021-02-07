# Nginx

Install

```
$ sudo apt-get install -y --no-install-recommends nginx
```

1.9.x
```
$ sudo add-apt-repository ppa:chris-lea/nginx-devel -y
$ sudo apt-get update
$ sudo apt-get install nginx
```

Run
```
$ /usr/bin/nginx [-t] [-c ~/my-nginx.conf] [-g 'daemon off;']
```

`-c` - Specify which configuration file NGINX should use instead of the default.
`-t` - Don’t run, just test the configuration file. NGINX checks configuration for correct syntax and then try to open files referred in configuration. \
`-g 'daemon off;'` - Don't run as daemon

Stop
```
$ sudo nginx -s stop
```

Restart
```
$ sudo nginx -s reload
```
