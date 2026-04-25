FROM python:3.12-slim AS base

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
WORKDIR /app

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        libpq5 \
        build-essential \
        libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Copy the whole tree so `-r base.txt` inside development.txt / production.txt resolves.
COPY backend/requirements /build/requirements
RUN pip install --no-cache-dir -r /build/requirements/base.txt

FROM base AS development
RUN pip install --no-cache-dir -r /build/requirements/development.txt

COPY backend /app

EXPOSE 8000

FROM base AS production
RUN pip install --no-cache-dir -r /build/requirements/production.txt

COPY backend /app

EXPOSE 8000
