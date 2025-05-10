# 1. Install dependencies
FROM node:22-alpine AS deps
WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Copy only the minimal required files to install deps
COPY package.json pnpm-lock.yaml ./

# Install only the dependencies (not devDeps here, since we'll build later)
RUN pnpm install --frozen-lockfile

# 2. Build the app
FROM node:22-alpine AS builder
WORKDIR /app

RUN npm install -g pnpm

# Copy everything and install again for a full build (this includes devDeps)
COPY . ./

# Reuse deps from the previous stage
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/pnpm-lock.yaml ./pnpm-lock.yaml

RUN pnpm build

# 3. Final production image
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Install only production dependencies
RUN npm install -g pnpm
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --prod --frozen-lockfile

# Copy built assets from builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next

EXPOSE 3000
CMD ["pnpm", "start"]
