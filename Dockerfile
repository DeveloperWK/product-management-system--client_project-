# --------------------------
# Build Stage
# --------------------------
FROM ubuntu:22.04 AS build

# Prevent interactive prompts
ENV DEBIAN_FRONTEND=noninteractive

# Install dependencies (curl, build tools, OpenSSL)
RUN apt-get update && apt-get install -y \
    curl \
    ca-certificates \
    build-essential \
    openssl \
    && rm -rf /var/lib/apt/lists/*

# Install Node.js 20 (via NodeSource)
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && npm install -g pnpm

# Set working directory
WORKDIR /usr/src/app

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
# Runner Stage (Slim)
# --------------------------
FROM ubuntu:22.04 AS runner

ENV DEBIAN_FRONTEND=noninteractive

# Install only runtime dependencies (Node.js + OpenSSL)
RUN apt-get update && apt-get install -y \
    curl \
    ca-certificates \
    openssl \
    && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && npm install -g pnpm \
    && apt-get purge -y curl \
    && apt-get autoremove -y \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app

# Copy only built files and necessary runtime files
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/package.json ./package.json
COPY --from=build /usr/src/app/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=build /usr/src/app/prisma.config.ts ./prisma.config.ts
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/prisma ./prisma

# Expose ports
EXPOSE 8000
EXPOSE 5555

ENTRYPOINT ["node","dist/server.js"]
