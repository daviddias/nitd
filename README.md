issue-tracker-dashboard
=======================


## How to deploy



## How to ssh into it

Get the id
```bash
$ docker ps
```

Get the IP
```bash
$ docker inspect <ID> | grep IPAddress
```

SSH into the container

```bash
$ ssh -i /path-to/your_key root@<IP address>
```