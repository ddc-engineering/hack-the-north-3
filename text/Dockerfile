FROM alpine:3.9

# Set the timezone for Python APScheduler
ENV TZ='UTC'

# This ENV var has to be lower case
ENV prometheus_multiproc_dir /tmp/prometheus_multiproc
RUN mkdir $prometheus_multiproc_dir

RUN apk add --no-cache --update \
        curl \
        nginx \
        python3 \
        supervisor \
        uwsgi-python3

RUN python3 -m ensurepip && \
    pip3 install --upgrade pip

COPY python/requirements.txt ./

RUN pip3 install \
        --trusted-host pypi.org \
        --no-cache-dir \
        -r requirements.txt

COPY nginx/uwsgi.conf /etc/nginx/conf.d/default.conf

COPY supervisor/supervisord.conf /etc/supervisord.conf
COPY supervisor/conf.d /etc/supervisor/conf.d

# Default the RC Version that gets overwritten by make
ARG RC_VERSION=0.0.0
ENV RC_VERSION=$RC_VERSION

COPY app /app

ENTRYPOINT [ "/usr/bin/supervisord" ]

EXPOSE 5000

HEALTHCHECK CMD curl --silent --fail localhost:5000/alive || exit 1
