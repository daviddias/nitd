FROM phusion/baseimage:0.9.8
MAINTAINER David Dias

ENV HOME /root
ENV PORT 8080

RUN /etc/my_init.d/00_regen_ssh_host_keys.sh

## Install an SSH of your choice.
ADD ~/.ssh/id_rsa.pub /tmp/id_rsa.pub
RUN cat /tmp/id_rsa.pub >> /root/.ssh/authorized_keys && rm -f /tmp/id_rsa.pub

# Use baseimage-docker's init system.
CMD ["/sbin/my_init"]

RUN apt-get install -y python-software-properties python
RUN add-apt-repository ppa:chris-lea/node.js
RUN echo "deb http://us.archive.ubuntu.com/ubuntu/ precise universe" >> /etc/apt/sources.list
RUN apt-get update
RUN apt-get install -y nodejs
RUN mkdir /var/www

EXPOSE 8080

ADD ./ /var/www/
CMD ["/usr/bin/node", "/var/www/index.js"]

# Clean up APT when done.
# RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*
