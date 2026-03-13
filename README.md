<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/95f2db4b-ca50-4cdb-946b-e2bdead018ab

## Features

- 🤖 **AI-Powered Prompts**: Generate custom prompts using Google Gemini AI
- 📚 **Blueprint Library**: Pre-built prompt templates for various use cases
- 🔐 **User Authentication**: Firebase-based authentication with tiered access
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile
- 🎨 **Modern UI**: Built with Tailwind CSS and smooth animations
- 📊 **Admin Dashboard**: Blueprint management system for administrators

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   - Copy `.env.example` to `.env.local`
   - Add your `GEMINI_API_KEY`
   - Configure Firebase settings (for authentication and blueprint management)

3. Run the app:
   ```bash
   npm run dev
   ```

## Blueprint Management

### For Administrators
Blueprints are managed through Firebase Console or admin scripts only (no web UI for security):

1. **Firebase Console**: Direct database management through Firestore
2. **Admin Scripts**: Batch upload via Node.js scripts
3. **Validation**: Automatic validation ensures data integrity

### Blueprint JSON Format
```json
{
  "title": "Blueprint Title",
  "category": "Category",
  "description": "Description",
  "logic_template": "Template with {{variables}}",
  "input_fields": [
    {
      "label": "Field Label",
      "type": "text|textarea|select|number",
      "placeholder": "Placeholder text",
      "name": "variable_name"
    }
  ],
  "tier": "free|premium|vip"
}
```

For detailed instructions, see [BLUEPRINT_ADMIN_GUIDE.md](BLUEPRINT_ADMIN_GUIDE.md).

## Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run TypeScript linter
- `npm test` - Run unit tests
- `npm run test:e2e` - Run end-to-end tests

### Project Structure
```
src/
├── components/          # React components
├── context/            # React context providers
├── lib/               # Utility libraries
├── pages/             # Page components
├── services/          # API services
└── data.ts           # Static data (fallback)
```

## Deployment

The app is configured for deployment on Vercel, Netlify, or any static hosting service.

### Environment Variables for Production
```env
GEMINI_API_KEY=your_gemini_api_key
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
# ... other Firebase config
VITE_SENTRY_DSN=your_sentry_dsn
```
