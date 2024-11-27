FROM node:18-alpine as base

FROM base as builder

WORKDIR /home/node
# Copy package files first to leverage cache
COPY package*.json ./
COPY yarn.lock ./

# Install all dependencies (including dev dependencies)
RUN yarn install

# Copy all source files
COPY . .

# Build both Payload and Next.js
RUN yarn build

FROM base as runtime

ARG PAYLOAD_CONFIG_PATH
ARG DATABASE_URI
ARG PAYLOAD_SECRET
ARG STRIPE_SECRET_KEY
ARG NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
ARG OPENCAGE_API_KEY
ARG PAYLOAD_PUBLIC_SERVER_URL
ARG NEXT_PUBLIC_SERVER_URL
ARG NODE_ENV

WORKDIR /home/node

# Copy package files
COPY package*.json yarn.lock ./
# Install only production dependencies
RUN yarn install --production

# Copy built files from builder
COPY --from=builder /home/node/dist ./dist
COPY --from=builder /home/node/.next ./.next
COPY --from=builder /home/node/build ./build
COPY --from=builder /home/node/public/media ./public/media
# Add public folder if you have one
COPY --from=builder /home/node/public ./public

EXPOSE 3000

CMD ["node", "dist/server.js"]