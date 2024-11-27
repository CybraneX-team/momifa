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

ENV PAYLOAD_CONFIG_PATH=${{secrets.PAYLOAD_CONFIG_PATH}}
ENV DATABASE_URI=${{secrets.DATABASE_URI}}
ENV PAYLOAD_SECRET=${{secrets.PAYLOAD_SECRET}}
ENV STRIPE_SECRET_KEY=${{secrets.STRIPE_SECRET_KEY}}
ENV NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=${{secrets.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}}
ENV OPENCAGE_API_KEY=${{secrets.OPENCAGE_API_KEY}}
ENV PAYLOAD_PUBLIC_SERVER_URL=${{secrets.PAYLOAD_PUBLIC_SERVER_URL}}
ENV NEXT_PUBLIC_SERVER_URL=${{secrets.NEXT_PUBLIC_SERVER_URL}}
ENV NODE_ENV=${{secrets.NODE_ENV}}

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