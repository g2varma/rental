# RENTAL PORTAL

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [API Documentation](#api-documentation)

## Installation

Step-by-step instructions to install the project locally.

```bash
# Clone the repository
http (For Windows)
http://gitlab.g2techsoft.com/sathyakrishnan/rental-portal.git

ssh (Mac & Linux)
git@gitlab.g2techsoft.com:sathyakrishnan/rental-portal.git


# Navigate into the project directory
cd rental-portal

# Switch to current active branch
git checkout v1

# Install dependencies
yarn install
```

## Usage

Instructions on how to use your project after installation.

```bash
# Start the development server
yarn dev
```

Add any additional commands or information regarding the setup.

## Configuration

Explain the key configuration options here. For example:

rename `.example.env` to `.env.local`

- API keys
- Environment variables
- Configuration files

Provide any setup examples such as `.env.local` files:

```
NEXT_PUBLIC_X_API_KEY=""
NEXT_PUBLIC_X_CLIENT_SECRET=""
NEXT_PUBLIC_BASE_URL=""

NEXT_PUBLIC_RECAPTCHA_SITE_KEY=""
NEXT_PUBLIC_RECAPTCHA_SECRET_KEY=""
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=""
```

here
`NEXT_PUBLIC_X_API_KEY` is the value for `X-API-Key`
`NEXT_PUBLIC_X_CLIENT_SECRET` is the value for `X-Client-Secret`
`NEXT_PUBLIC_BASE_URL` is the api base urls i.e `https://api2.mipropertyportal.com/api`
`NEXT_PUBLIC_RECAPTCHA_SITE_KEY` & `NEXT_PUBLIC_RECAPTCHA_SECRET_KEY` is Google recaptcha site key and site secret, obtain it from google cloud console
`NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` is Google maps api key, obtain it from google cloud console

## API Documentation

If your project includes APIs, describe them here.

### Endpoints

| Method | Endpoint                      | Description               |
| ------ | ----------------------------- | ------------------------- |
| GET    | `/v1/listings`                | Get all listings          |
| GET    | `/v1/listings/property/${id}` | Get property listings     |
| GET    | `/v1/listings/client/${id}`   | Get client listings       |
| GET    | `/v1/listings/unit/${id}`     | Get property details      |
| GET    | `/v1/config/app`              | Get app configurations    |
| GET    | `/v1/config/landing`          | Get landing page data     |
| POST   | `/v1/contact-us`              | Send contact us form data |
