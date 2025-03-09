
# Digital Wardrobe V2

A modern web application to help you manage your clothing inventory, create outfits, and track your wardrobe statistics.

## Features

- **Authentication**: Login with email/password or social providers (Google, Apple)
- **Clothing Management**: Add, organize, and categorize your clothing items
- **Outfit Creation**: Combine clothing items to create and save outfits
- **Statistics Dashboard**: View insights about your wardrobe usage
- **Wear History**: Track when you've worn specific items or outfits
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, shadcn/ui
- **State Management**: React Context API, TanStack Query
- **Authentication**: JWT-based auth with social login options
- **Styling**: Tailwind CSS for responsive design

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository
```sh
git clone <repository-url>
cd digital-wardrobe-v2
```

2. Install dependencies
```sh
npm install
```

3. Update API configuration
   - Open `src/utils/api.ts` and update the `API_BASE_URL` to point to your backend server

4. Start the development server
```sh
npm run dev
```

## Usage

1. Register a new account or login with existing credentials
2. Upload and categorize your clothing items
3. Create outfits by combining items
4. View statistics and track wear history

## Development

The project is structured as follows:

- `/src/components`: UI components grouped by feature
- `/src/context`: React Context providers for state management
- `/src/hooks`: Custom React hooks
- `/src/pages`: Main application pages
- `/src/utils`: Utility functions including API client

## License

This project is licensed under the MIT License - see the LICENSE file for details.
