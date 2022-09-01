FROM node:14-alpine AS build

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /build
COPY . .
RUN yarn --frozen-lockfile --ignore-scripts --network-timeout 600000
RUN yarn build

FROM node:14-alpine AS deps

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /build
COPY package.json package.json
RUN yarn --production --frozen-lockfile --ignore-scripts --network-timeout 600000

# Production image, copy all the files and run next
FROM node:14-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

USER nextjs

COPY --chown=nextjs:nodejs next.config.js ./
COPY --chown=nextjs:nodejs public ./public
COPY --from=build --chown=nextjs:nodejs /build/.next ./.next
COPY --from=deps --chown=nextjs:nodejs /build/node_modules ./node_modules
COPY --chown=nextjs:nodejs package.json ./package.json

EXPOSE 3000

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry.
ENV NEXT_TELEMETRY_DISABLED=1

CMD ["yarn", "start"]
