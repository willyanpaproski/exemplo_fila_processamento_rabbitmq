# Base Node.js
FROM node:18-alpine

# Diretório da app dentro do container
WORKDIR /app

# Copia os arquivos de dependência e instala
COPY package*.json ./
RUN npm install

# Copia o restante da aplicação
COPY . .

# Comando para rodar o consumer
CMD ["node", "worker.js"]
