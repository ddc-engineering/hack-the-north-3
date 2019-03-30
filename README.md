# Getting Started

Make changes, push to Git and deploy with Docker.

## Running Locally

Install `docker`

Download the repo, create a venv, install requirements

```sh
$ git clone git@github.com:ddc-engineering/hack-the-north-3.git
$ cd hack-the-north-3/slinky

$ python3 -m venv venv
$ source venv/bin/activate
$ pip install -r requirements.txt

$ python manage.py migrate
$ python manage.py collectstatic
```

Run locally
```sh
$ docker-compose up -d --build
```

Your app should now be running on [localhost:80](http://localhost:80/).
