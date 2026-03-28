# Stage 1: Build the Vite React Frontend
FROM node:20-alpine AS frontend-builder
WORKDIR /app
# Copy package files and install dependencies
COPY package*.json ./
RUN npm install
# Copy the rest of the code and build
COPY . .
RUN npm run build

# Stage 2: Setup FastAPI Python Backend
FROM python:3.11-slim
WORKDIR /app
# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
# Copy the FastAPI backend code
COPY main.py .
# Copy the built React assets from Stage 1 into the Python container
COPY --from=frontend-builder /app/dist ./dist

# Expose the standard Cloud Run port
EXPOSE 8080

# Run the FastAPI server
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]