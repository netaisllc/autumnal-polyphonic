FROM mhart/alpine-node:12.13.0 AS builder
WORKDIR /app
COPY . .

FROM mhart/alpine-node
RUN yarn global add serve
WORKDIR /app
COPY --from=builder /app/public .
CMD ["serve", "-s", "."]
