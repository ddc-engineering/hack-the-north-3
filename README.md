# Getting Started

Make changes, push to Git and deploy to Heroku.

## Running Locally

Install Heroku

```sh
$ sudo snap install heroku --classic
```

Download the repo, create a venv, install requirements

```sh
$ git clone git@github.com:ddc-engineering/hack-the-north-3.git
$ cd hack-the-north-3

$ python3 -m venv venv
$ source venv/bin/activate
$ pip install -r requirements.txt

$ python manage.py migrate
$ python manage.py collectstatic
```

Run locally
```sh 
$ heroku local
```

Your app should now be running on [localhost:5000](http://localhost:5000/).

## Running on Heroku

Push to the repo.  Easy.