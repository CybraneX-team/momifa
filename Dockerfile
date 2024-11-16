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

ENV PAYLOAD_CONFIG_PATH=./dist/payload/payload.config.js
ENV DATABASE_URI=mongodb+srv://trishrko99:3FAUqf5gwOtNklNG@momifadb.9aqtg.mongodb.net/?retryWrites=true&w=majority&appName=momifaDB
ENV PAYLOAD_SECRET=dc4e658f7w64fe5df4w6e5e
ENV STRIPE_SECRET_KEY=sk_test_51PoNVLCkli4RA0fycVeApzvhEfS97FFcpk2ZuAAOu8E5HV490tzMBcboSNvvCuYOToFwHF6WvyYtdfGGyHb6LLFs00dSAPymzq
ENV NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51PoNVLCkli4RA0fy996ZUh17S82OPyQi8CI45g6rw44ab7uA7Cv2MDMBc9X8q17WdxIaHhq1Lp2abu0qResgEPAJ00AZHisFrX
ENV OPENCAGE_API_KEY=ebda9b98fede49c0b6088d76200eeff8
ENV PAYLOAD_PUBLIC_SERVER_URL=http://localhost:3000
ENV NEXT_PUBLIC_SERVER_URL=http://localhost:3000
ENV NODE_ENV=production

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