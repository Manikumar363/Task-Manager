FROM node:20-alpine
WORKDIR /app

# Copy backend source into image
COPY backend ./backend

WORKDIR /app/backend

# Install dependencies (prefer ci; fallback to install)
RUN npm ci --production || npm install --production

EXPOSE 4000

CMD ["node", "src/index.js"]
