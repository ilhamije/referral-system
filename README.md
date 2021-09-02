# Referral System

<br >

## System Setup

<br >

### Clone
```
$ git clone git@gitlab.com:ilhamije/referral-system.git
$ cd referral-system
```

### Run Docker

```
$ docker-compose build && docker-compose up -d
```

### Check running docker image (optional)

```
$ docker-compose ps -a
```

### Shutting down docker image (optional)

```
$ docker-compose down
```

<br >

## Using the Application

<br >

### As Generator User
Goto
```
http://localhost:3000
```
When user are logged-in, they can create unique link by pressing button "New Unique Link" on the top of table. It will generate new link and they can copy it then share it later to a contributor. Shareable link would be like :
```
http://localhost:3000/code/<some-unique-code>
```

<br >

### As Contributor User

Contributor users can use the shared link and submit their email, for example :
```
http://localhost:3000/code/18c1e463-8dab-469d-a186-de735d738ce6
```


