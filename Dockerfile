# Use official Node.js 24 image
FROM node:24

# Install copilot-cli as root user
RUN npm install -g @github/copilot

# Build arguments for UID and GID
ARG UID=1000
ARG GID=1000

# Remove existing user and group with the specified UID and GID, if they exist
RUN if getent passwd ${UID}; then userdel -r $(getent passwd ${UID} | cut -d: -f1); fi \
    && if getent group ${GID}; then groupdel $(getent group ${GID} | cut -d: -f1); fi \
    && groupadd -g ${GID} appuser \
    && useradd -r -u ${UID} -g appuser -d /home/appuser appuser \
    && mkdir -p /home/appuser \
    && chown appuser:appuser /home/appuser

# Set working directory
WORKDIR /app

# Change ownership of the working directory to the non-root user
RUN chown -R appuser:appuser /app

# Switch to the non-root user
USER appuser

# Copy the rest of the application code
COPY . .

# Open straight into copilot
CMD ["sh", "-c", "copilot"]
