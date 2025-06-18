# URL Shortener API

A simple and efficient URL shortening service built with Express.js and MongoDB.

## Features

- Shorten long URLs into unique 6-character codes
- Automatic URL validation
- Redirect service for shortened URLs
- RESTful API design
- MongoDB integration for data persistence

## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose

## API Endpoints

### Create Short URL
```http
POST /urls
```
Request body:
```json
{
  "url": "https://example.com/very/long/url"
}
```
Response:
```json
{
  "originalURL": "https://example.com/very/long/url",
  "shortURL": "/urls/Ab3Cd9"
}
```

### Access Shortened URL
```http
GET /:uid
```
Redirects to the original URL if found, returns 404 if not found.

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your environment variables:
   - PORT: Server port number
   - MONGODB_URI: Your MongoDB connection string

4. Start the server:
   ```bash
   npm start
   ```

## Project Structure

```
url-shortener/
├── app.js              # Application entry point
├── config/
│   └── env.js         # Environment configuration
├── database/
│   └── mongodb.js     # Database connection setup
├── middlewares/
│   └── error.middleware.js # Error handling middleware
├── models/
│   └── url.model.js   # URL database model
└── routes/
    └── url.route.js   # URL routes
```

## Error Handling

The API includes a global error handling middleware that processes all errors and returns appropriate error responses.

## URL Validation

The service includes built-in URL validation to ensure only valid URLs are processed. The validation regex checks for:
- Optional protocol (http/https)
- Valid domain name
- Valid TLD
- Optional path components

## Security Considerations

- Input validation for URLs
- Error handling to prevent information leakage
- Rate limiting (to be implemented)
- Request size limiting

## Future Improvements

- Add rate limiting
- Implement analytics for URL visits
- Add user authentication
- Add custom URL slugs
- Add URL expiration
