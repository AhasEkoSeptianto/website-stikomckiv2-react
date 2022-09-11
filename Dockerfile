# Stage 1
FROM node:16.16.0 as build-stage
WORKDIR /netlify-stikomcki-vercel
COPY package.json .
COPY . .

ARG REACT_APP_API_BASE_URL
ARG REACT_APP_ENP_BE

ENV REACT_APP_API_BASE_URL=$REACT_APP_API_BASE_URL
ENV REACT_APP_ENP_BE=$REACT_APP_ENP_BE
RUN yarn install
RUN yarn build
# Stage 2
FROM nginx:1.17.0-alpine
COPY --from=build-stage /netlify-stikomcki-vercel/build /usr/share/nginx/html
EXPOSE 80
CMD nginx -g 'daemon off;'