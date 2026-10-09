# Base image with an older version of Cypress (v13.6.0) containing Firefox & Chrome pre-installed
FROM cypress/included:13.6.0

# Set working directory inside container
WORKDIR /e2e

# Copy configuration and test files
COPY ./cypress.config.js ./cypress.config.js
COPY ./cypress ./cypress

# Default entrypoint runs cypress with Firefox browser
ENTRYPOINT ["cypress", "run", "--browser", "firefox"]
