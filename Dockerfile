FROM node:22-bookworm-slim
WORKDIR /app
COPY . .
RUN mkdir -p /app/data
ENV NODE_ENV=production PORT=3000 HOST=0.0.0.0 DB_PATH=/app/data/expense-tracker.sqlite
EXPOSE 3000
CMD ["npm","start"]
