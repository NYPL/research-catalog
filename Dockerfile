FROM node:16-alpine AS production

#RUN apt-get update
#RUN apt-get upgrade -y

ARG NYPL_HEADER_URL

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

ENV NYPL_HEADER_URL=${NYPL_HEADER_URL}
RUN npm run build

# Explicitly set port 3000 as open to requests.
EXPOSE 3000

CMD [ "npm", "start" ]
