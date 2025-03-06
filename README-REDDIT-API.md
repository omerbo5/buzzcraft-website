# Setting Up Reddit API for Scraping

To fix the "Failed to get Reddit access token" error, you need to configure proper Reddit API credentials:

## Steps to Create Reddit API Credentials

1. Go to https://www.reddit.com/prefs/apps
2. Click the "Create App" or "Create Another App" button
3. Fill in the required information:
   - Name: Lead Generator Tool (or any name you prefer)
   - App type: Select "script"
   - Description: A tool to scrape relevant leads from Reddit (optional)
   - About URL: Your website URL (optional)
   - Redirect URI: http://localhost:3000
4. Click "Create app"
5. Note your credentials:
   - Client ID: The string under the app name (looks like: YourAppName)
   - Client Secret: The string labeled "secret"

## Adding Credentials to Your Application

Create or edit your `.env` file in the root directory of your project with:

```
REDDIT_CLIENT_ID=your_client_id_here
REDDIT_CLIENT_SECRET=your_client_secret_here
```

## Security Note

- Never commit your `.env` file to version control
- For production, use proper environment variable management through your hosting provider

## Troubleshooting

If you still encounter authentication issues:
1. Verify your credentials are correctly copied (no extra spaces)
2. Make sure you're using the app type "script" 
3. Restart your development server after adding the credentials
