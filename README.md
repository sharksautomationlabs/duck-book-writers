# Duck Book Writers Landing Page

A modern, responsive landing page for Duck Book Writers — a full-service publishing house. This project is built with Next.js 15, TypeScript, and Tailwind CSS, featuring a modular component architecture.

## 🚀 Features

- **Fully Responsive Design** - Optimized for all device sizes
- **Modular Component Architecture** - Easy to maintain and extend
- **Modern UI/UX** - Beautiful animations and hover effects
- **SEO Optimized** - Proper metadata and semantic HTML
- **Performance Focused** - Built with Next.js 15 for optimal performance
- **Custom Typography** - Uses Poppins and Lora fonts for brand consistency

## 🏗️ Project Structure

```
ecom-duck-1/
├── app/
│   ├── components/          # Modular components
│   │   ├── Header.tsx      # Navigation and contact info
│   │   ├── Hero.tsx        # Main hero section
│   │   ├── Features.tsx    # Service features
│   │   ├── About.tsx       # Company description
│   │   ├── Partners.tsx    # Publishing platforms
│   │   ├── NewReleases.tsx # New book releases
│   │   ├── Bestsellers.tsx # Bestseller books
│   │   ├── BookCategories.tsx # Book categories grid
│   │   ├── ComingSoon.tsx  # Countdown timer
│   │   ├── AwardWinners.tsx # Awards section
│   │   ├── AboutUs.tsx     # Mission, vision, values
│   │   ├── Authors.tsx     # Team members
│   │   ├── NewsEvents.tsx  # News and events
│   │   └── Footer.tsx      # Footer with links
│   ├── globals.css         # Global styles and fonts
│   ├── layout.tsx          # Root layout with metadata
│   └── page.tsx            # Main page component
├── public/                 # Static assets
├── package.json            # Dependencies
└── README.md              # This file
```

## 🎨 Design System

### Colors
- **Primary**: Yellow (#ffbe02) - Brand color
- **Secondary**: Blue (#001b86) - Accent color
- **Text**: Dark gray (#040404) - Primary text
- **Background**: White and light grays

### Typography
- **Headings**: Lora font family (Medium, Bold weights)
- **Body Text**: Poppins font family (Light, Regular, Medium, SemiBold, Bold weights)

### Components
Each component is designed to be:
- **Reusable** - Can be used across different pages
- **Customizable** - Easy to modify props and styling
- **Accessible** - Proper semantic HTML and ARIA labels
- **Responsive** - Mobile-first design approach

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ecom-duck-1
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🛠️ Built With

- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety and better developer experience
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[React](https://reactjs.org/)** - UI library
- **[Google Fonts](https://fonts.google.com/)** - Poppins and Lora fonts

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🎯 Key Sections

1. **Header** - Navigation, contact info, and logo
2. **Hero** - Main headline and call-to-action buttons
3. **Features** - Service highlights (shipping, guarantee, quality)
4. **About** - Company description and image
5. **Partners** - Publishing platform logos
6. **New Releases** - Latest book releases
7. **Bestsellers** - Popular books with pricing
8. **Book Categories** - Genre-based book grid
9. **Coming Soon** - Countdown timer for new releases
10. **Award Winners** - Recognition and achievements
11. **About Us** - Mission, vision, and values
12. **Authors** - Team member profiles
13. **News & Events** - Company updates
14. **Footer** - Contact info, navigation, and social links

## 🔧 Customization

### Adding New Components
1. Create a new component in `app/components/`
2. Follow the existing naming convention
3. Import and add to `page.tsx`

### Modifying Styles
- Use Tailwind CSS classes for styling
- Custom styles can be added to `globals.css`
- Component-specific styles use CSS modules or inline styles

### Updating Content
- Text content is easily editable in each component
- Images can be replaced with actual assets
- Links and contact information can be updated

## 📈 Performance

- **Lighthouse Score**: Optimized for performance, accessibility, and SEO
- **Image Optimization**: Next.js automatic image optimization
- **Code Splitting**: Automatic code splitting for optimal loading
- **Font Loading**: Optimized font loading with Google Fonts

## 🌐 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy automatically

### Other Platforms
- **Netlify**: Build command: `npm run build`, Publish directory: `out`
- **AWS Amplify**: Build command: `npm run build`
- **Traditional hosting**: Build with `npm run build` and serve static files

## 🤝 Contributing

1. Fork the project
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

**Duck Book Writers**
- Phone: +1 (346) 463-7721
- Email: contact@duckbookwriters.com

## 🙏 Acknowledgments

- Design inspiration from the Figma design
- Next.js team for the amazing framework
- Tailwind CSS for the utility-first approach
- Google Fonts for beautiful typography

---

**Built with ❤️ for Duck Book Writers**
