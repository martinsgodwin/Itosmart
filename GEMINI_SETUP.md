# Gemini API Integration Setup Guide

This project uses Google's Gemini API for AI-powered chat functionality.

## Local Development

1. **Get your Gemini API Key**
   - Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
   - Click "Create API Key"
   - Copy your API key

2. **Set up environment variables**
   - Create a `.env.local` file in the root directory
   - Add your API key:
     ```
     GEMINI_API_KEY=your_api_key_here
     ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

## Vercel Deployment

### Option 1: Using Vercel Dashboard (Recommended)

1. **Connect your GitHub repository to Vercel**
   - Go to [Vercel Dashboard](https://vercel.com)
   - Click "New Project"
   - Select your GitHub repository

2. **Add Environment Variables**
   - In the Vercel project settings, go to "Environment Variables"
   - Add a new variable:
     - **Name:** `GEMINI_API_KEY`
     - **Value:** Your Gemini API key
   - Click "Save"

3. **Deploy**
   - Vercel will automatically deploy your project
   - Your app will be live with Gemini API integration

### Option 2: Using Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to Vercel
vercel

# When prompted, add your environment variables
# Or use:
vercel env add GEMINI_API_KEY
```

## Troubleshooting

### Error: "GEMINI_API_KEY is not configured"
- Make sure you've added the `GEMINI_API_KEY` environment variable to Vercel
- Check that the variable name is exactly `GEMINI_API_KEY` (case-sensitive)

### Error: "403 Forbidden"
- Your API key may be invalid or expired
- Regenerate your API key from [Google AI Studio](https://aistudio.google.com/app/apikey)
- Update the environment variable in Vercel

### Error: "Rate limit exceeded"
- You've hit the API rate limit
- Wait a few minutes before trying again
- Consider upgrading your Google Cloud plan for higher limits

## API Models Available

The current implementation uses `gemini-2.0-flash`. Other available models:
- `gemini-2.0-flash`: Fast, multimodal model (current)
- `gemini-1.5-pro`: More capable, multimodal model
- `gemini-2.0-flash`: Latest flash model (if available)

To change the model, edit `app/api/chat/route.ts` and update the model name in:
```typescript
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
```

## Security Notes

- **Never commit `.env.local`** - It's already in `.gitignore`
- **Never share your API key** - Treat it like a password
- Consider setting up API key restrictions in Google Cloud Console
- Monitor your API usage to avoid unexpected charges

## Resources

- [Google Generative AI Documentation](https://ai.google.dev/)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
