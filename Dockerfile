FROM node:25-alpine AS production

#RUN apt-get update
#RUN apt-get upgrade -y

ARG NEXT_PUBLIC_APP_ENV

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

# Set the timezone
ENV TZ=America/New_York
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# Install dependencies.
COPY package.json ./
COPY package-lock.json ./
RUN npm install

# Add application code.
COPY . .

ENV NEXT_PUBLIC_APP_ENV=${NEXT_PUBLIC_APP_ENV}
RUN npm run build

# Explicitly set port 3000 as open to requests.
EXPOSE 3000

CMD ["node", "server.mjs"]
