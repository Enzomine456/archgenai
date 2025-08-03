FROM python:3.10-slim

WORKDIR /app

# Copie requirements.txt antes para melhor uso de cache
COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

# Copie o restante do código depois
COPY . .

EXPOSE 8080

CMD ["python", "app.py"]
