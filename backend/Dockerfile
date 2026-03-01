FROM python:3.11-slim

WORKDIR /app

# Install system deps for mysqlclient (if needed)
RUN apt-get update && apt-get install -y \
    build-essential default-libmysqlclient-dev \
    && rm -rf /var/lib/apt/lists/*

COPY backend/requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY backend/ .

ENV PYTHONUNBUFFERED=1

# Railway will inject PORT, but we'll default to 8080 locally
ENV PORT=8080

CMD python manage.py collectstatic --noinput && gunicorn backend.wsgi:application --bind 0.0.0.0:$PORT