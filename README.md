# MPSS E-commerce Website

A modern, responsive e-commerce website built with React, TypeScript, Vite, and Tailwind CSS.

## Features

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Modern UI**: Clean, professional design with reusable components
- **TypeScript**: Full type safety throughout the application
- **React Router**: Client-side routing for seamless navigation
- **Component Library**: Custom UI components built with Tailwind CSS
- **Product Filtering**: Advanced filtering by category and price range
- **Contact Form**: Functional contact form with validation
- **About Page**: Company information with team section

## Pages

1. **Home Page**: Hero banner, category filters, and featured collections
2. **Product Listing**: Filterable product grid with sidebar filters
3. **Contact Us**: Contact form with name, email, and message fields
4. **About Us**: Company story, team, and mission information

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Lucide React** - Icon library

## Project Structure

```
src/
├── components/ui/          # Reusable UI components
│   ├── Button.tsx
│   ├── Badge.tsx
│   ├── Card.tsx
│   ├── Input.tsx
│   └── Textarea.tsx
├── layout/                 # Layout components
│   ├── HeaderSection.tsx
│   └── FooterSection.tsx
├── pages/                  # Route pages
│   ├── HomePage.tsx
│   ├── ProductListingPage.tsx
│   ├── ContactUsPage.tsx
│   └── AboutUsPage.tsx
├── sections/               # Page-specific sections
│   ├── HeroSection.tsx
│   ├── CategoryFiltersSection.tsx
│   ├── FeaturedCollectionsSection.tsx
│   └── ContactFormSection.tsx
├── App.tsx                 # Main app component
├── main.tsx               # Entry point
└── index.css              # Global styles
```

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd mpss-ecommerce
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Features in Detail

### Responsive Design
- Mobile-first approach using Tailwind CSS breakpoints
- Responsive grid layouts for products and categories
- Adaptive navigation and footer

### Product Management
- Product cards with images, prices, and badges
- Category-based filtering
- Price range filtering
- Product ratings and reviews

### UI Components
- Custom Button component with multiple variants
- Badge component for status indicators
- Card component for content containers
- Input and Textarea components for forms

### Navigation
- Header with navigation links and icons
- Footer with company info and social links
- React Router for client-side routing

## Customization

### Styling
The project uses Tailwind CSS for styling. You can customize the design by:
- Modifying the `tailwind.config.js` file
- Adding custom CSS classes
- Updating component styles

### Content
- Update product data in the respective components
- Modify company information in the About page
- Change contact form fields as needed

### Images
The project uses Unsplash images as placeholders. Replace them with your own product images by updating the image URLs in the components.

## Deployment

### Build for Production
```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment to any static hosting service.

### Recommended Hosting
- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please contact the development team or create an issue in the repository. "# MPSS" 
