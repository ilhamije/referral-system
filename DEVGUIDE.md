# Developer Guide

## Stacks

1. Django Rest Framework as backend
1. ReactJS as frontend
1. Sqlite database as database
1. Docker for containerization

## Reasons

1. DjangoRestFramework is one of the best to build API service, so it's relatively fast in term of building backend services.
1. ReactJS is chosen just because this is the only JS framework that I familiar with. My understanding in ReactJS is not that much. So, the structure quite messy, but it can be organized later if necessary.
1. Sqlite is chosen since this project is development and for a skill demonstration only. It's quite simple and compact.
1. Docker is used to containerize the backend and frontend side. Each sides has it's own Dockerfile, then we use docker-compose to build them.


## Admin Page
We can individually run the backend. By doing :
```
$ cd project
$ ./manage.py runserver
```
then goto http://localhost:8000/admin

superuser : admin@gmail.com  
pass: supersecret

