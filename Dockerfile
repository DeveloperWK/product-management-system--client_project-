# --------------------------
# Build Stage
# --------------------------
FROM node:20-slim AS build

# Set working directory
WORKDIR /usr/src/app

# Install pnpm
RUN npm install -g pnpm

# Copy package files and install dependencies
COPY package.json pnpm-lock.yaml prisma.config.ts ./
RUN pnpm install

# Copy Prisma schema and generate client
COPY prisma ./prisma/
RUN pnpm db:generate

# Copy source code and build TypeScript
COPY . .
RUN pnpm build

# --------------------------
# Runner Stage
# --------------------------
FROM node:20-slim AS runner

WORKDIR /usr/src/app

# Install pnpm (for runtime scripts if needed)
RUN npm install -g pnpm

# Copy only built files and necessary runtime files
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/package.json ./package.json
COPY --from=build /usr/src/app/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=build /usr/src/app/prisma.config.ts ./prisma.config.ts
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/prisma ./prisma


# Expose port
EXPOSE 8000
EXPOSE 5555
ENTRYPOINT ["node","dist/server.js"]
