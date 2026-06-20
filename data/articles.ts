export interface Article {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  heroImage?: string;
  isCostEstimate?: boolean; // If true, links to /cost-to-build-[slug], otherwise /blog/[slug]
}

export const articles: Article[] = [
  {
    slug: 'about-us',
    title: 'About Us',
    date: '29/12/2025',
    excerpt: 'Learn about Projecto, an independent online service designed to help teams and businesses estimate software projects more clearly and efficiently.'
  },
  {
    slug: 'privacy-policy',
    title: 'Privacy Policy',
    date: '29/12/2025',
    excerpt: 'Projecto respects user privacy and is committed to protecting personal and project-related data.'
  },
  {
    slug: 'terms-of-service',
    title: 'Terms of Service',
    date: '29/12/2025',
    excerpt: 'By using Projecto, you agree to the following terms regarding the use of our estimation and planning tool.'
  },
  {
    slug: 'contact-us',
    title: 'Contact Us',
    date: '29/12/2025',
    excerpt: 'If you have questions about Projecto, the website, or how the service works, you can reach us using the contact information below.'
  },
  {
    slug: 'open-source-projekto-calculator',
    title: 'Why Projecto Is Open Source: MIT License, Transparency & Community',
    date: '20/04/2026',
    excerpt:
      'Projecto (Planify-Dev on GitHub) is a free, MIT-licensed development cost calculator. Learn why open source matters for estimation tools, how the stack is built, and how to contribute or self-host.'
  },
  {
    slug: 'project-cost-calculation',
    title: 'How to Calculate Project Cost: A Complete Guide',
    date: '01/01/2026',
    excerpt: 'Learn how to calculate project cost realistically, what factors influence software development cost, and how modern estimation tools help teams plan with confidence.'
  },
  {
    slug: 'software-development-cost',
    title: 'Software Development Cost Explained: What You Really Pay For',
    date: '01/01/2026',
    excerpt: 'Understand software development cost in detail. Learn what drives pricing, from team roles and features to testing, tech stack, and support.'
  },
  {
    slug: 'cost-for-application-development',
    title: 'Cost for Application Development: Web vs Mobile Explained',
    date: '01/01/2026',
    excerpt: 'Compare the cost for application development across web and mobile apps. Learn what drives pricing, timelines, and feature complexity.'
  },
  {
    slug: 'estimate-software-development-cost',
    title: 'Estimate Software Development Cost Accurately: Step-by-Step Guide',
    date: '01/01/2026',
    excerpt: 'Learn how to estimate software development cost accurately. Step-by-step process covering scope, roles, features, tech stack, QA, and buffers.'
  },
  {
    slug: 'app-cost-calculator',
    title: 'App Cost Calculator: How Accurate Are Online Tools?',
    date: '01/01/2026',
    excerpt:
      'Learn how mobile app cost calculators work, how accurate they are, and how to use them correctly to estimate your app development budget.'
  },
  {
    slug: 'website-cost-calculator',
    title: 'Website Cost Calculator: What Influences Website Pricing the Most',
    date: '01/01/2026',
    excerpt: 'Learn what influences website pricing the most and how a website cost calculator estimates design, development, testing, and maintenance costs.'
  },
  {
    slug: 'saas',
    title: 'Software Development Cost for SaaS Projects (2026 Guide)',
    date: '01/01/2026',
    excerpt: 'Understand SaaS software development cost, pricing ranges, key cost drivers, and how to estimate your SaaS project budget accurately.'
  },
  {
    slug: 'software-development-cost-marketplace',
    title: 'Software Development Cost for Marketplace Platforms (2026 Guide)',
    date: '18/01/2026',
    excerpt: 'Learn what drives software development cost for marketplace platforms and how to choose the right calculator inputs for accurate cost estimation.',
    heroImage: '/blog1.png'
  },
  {
    slug: 'fintech-app-development-cost',
    title: 'Fintech App Development Cost (Banking, Forex, ETFs) | Projecto',
    date: '18/01/2026',
    excerpt: 'Estimate fintech development cost with recommended inputs for banking and investing apps (forex, CFDs, ETFs): team, screens, features, QA, stack.',
    heroImage: '/blog2.png'
  },
  {
    slug: 'ecommerce-website-development-cost',
    title: 'E-commerce Website Development Cost (Shopify & WooCommerce Guide)',
    date: '18/01/2026',
    excerpt: 'Learn how to estimate e-commerce website development costs. Compare Shopify, WooCommerce, and custom builds with real input recommendations.',
    heroImage: '/blog3.png'
  },
  {
    slug: 'hidden-costs-ecommerce-website',
    title: 'Hidden Costs of Building and Running an E-commerce Website (The Real Monthly Cost Breakdown)',
    date: '18/01/2026',
    excerpt: 'Learn the hidden costs of e-commerce websites: platform fees, apps, payment processing, hosting, maintenance, security, and real monthly cost examples.',
    heroImage: '/blog4.png'
  },
  {
    slug: 'shopify-vs-woocommerce-total-cost',
    title: 'Shopify vs WooCommerce Cost: Total Cost of Ownership (1 vs 3 Years)',
    date: '18/01/2026',
    excerpt: 'Compare Shopify vs WooCommerce total cost of ownership over 1 and 3 years. Real numbers for platform fees, apps, maintenance, and long-term costs.',
    heroImage: '/blog5.png'
  },
  {
    slug: 'healthcare-software-development-cost',
    title: 'Healthcare Software Development Cost (Medical App Estimation Guide)',
    date: '19/01/2026',
    excerpt: 'Learn how to estimate healthcare software development costs, including team setup, features, security, QA, and real-world budget ranges.',
    heroImage: '/blog7.png'
  },
  {
    slug: 'telemedicine-app-development-cost',
    title: 'Telemedicine App Development Cost (Virtual Healthcare Estimation Guide)',
    date: '19/01/2026',
    excerpt: 'Learn how to estimate telemedicine app development cost, including video, security, QA, features, and realistic budget ranges.',
    heroImage: '/image8.png'
  },
  {
    slug: 'no-code-tools-saas-development-cost',
    title: 'How No-Code Tools Like Base44 Affect SaaS Development Cost (What You Save — and What You Don’t)',
    date: '19/01/2026',
    excerpt:
      'Learn how no-code tools like Base44 affect SaaS development cost. See where you save money, hidden tradeoffs, and how to estimate no-code vs custom.',
    heroImage: '/images/blog/no-code-tools-saas-development-cost-cover.png',
  },
  // Cost-to-Build App Estimates
  {
    slug: 'uber-like-app',
    title: 'Cost to Build an Uber Like App in 2026',
    date: '08/03/2026',
    excerpt: `Learn how much it costs to build an Uber like app. Detailed breakdown of development time, team size, features, and estimated budget from $${(80000 / 1000).toFixed(0)}K to $${(250000 / 1000).toFixed(0)}K.`,
    heroImage: undefined,
    isCostEstimate: true,
  },
  {
    slug: 'airbnb-like-app',
    title: 'Cost to Build an Airbnb Like App in 2026',
    date: '08/03/2026',
    excerpt: `Learn how much it costs to build an Airbnb like app. Detailed breakdown of development time, team size, features, and estimated budget from $${(75000 / 1000).toFixed(0)}K to $${(230000 / 1000).toFixed(0)}K.`,
    heroImage: undefined,
    isCostEstimate: true,
  },
  {
    slug: 'instagram-like-app',
    title: 'Cost to Build an Instagram Like App in 2026',
    date: '08/03/2026',
    excerpt: `Learn how much it costs to build an Instagram like app. Detailed breakdown of development time, team size, features, and estimated budget from $${(70000 / 1000).toFixed(0)}K to $${(220000 / 1000).toFixed(0)}K.`,
    heroImage: undefined,
    isCostEstimate: true,
  },
  {
    slug: 'tiktok-like-app',
    title: 'Cost to Build a TikTok Like App in 2026',
    date: '08/03/2026',
    excerpt: `Learn how much it costs to build a TikTok like app. Detailed breakdown of development time, team size, features, and estimated budget from $${(90000 / 1000).toFixed(0)}K to $${(280000 / 1000).toFixed(0)}K.`,
    heroImage: undefined,
    isCostEstimate: true,
  },
  {
    slug: 'netflix-like-app',
    title: 'Cost to Build a Netflix Like App in 2026',
    date: '08/03/2026',
    excerpt: `Learn how much it costs to build a Netflix like app. Detailed breakdown of development time, team size, features, and estimated budget from $${(85000 / 1000).toFixed(0)}K to $${(260000 / 1000).toFixed(0)}K.`,
    heroImage: undefined,
    isCostEstimate: true,
  },
  {
    slug: 'amazon-like-app',
    title: 'Cost to Build an Amazon Like App in 2026',
    date: '08/03/2026',
    excerpt: `Learn how much it costs to build an Amazon like app. Detailed breakdown of development time, team size, features, and estimated budget from $${(80000 / 1000).toFixed(0)}K to $${(250000 / 1000).toFixed(0)}K.`,
    heroImage: undefined,
    isCostEstimate: true,
  },
  {
    slug: 'spotify-like-app',
    title: 'Cost to Build a Spotify Like App in 2026',
    date: '08/03/2026',
    excerpt: `Learn how much it costs to build a Spotify like app. Detailed breakdown of development time, team size, features, and estimated budget from $${(75000 / 1000).toFixed(0)}K to $${(240000 / 1000).toFixed(0)}K.`,
    heroImage: undefined,
    isCostEstimate: true,
  },
  {
    slug: 'marketplace-app',
    title: 'Cost to Build a Marketplace App in 2026',
    date: '08/03/2026',
    excerpt: `Learn how much it costs to build a marketplace app. Detailed breakdown of development time, team size, features, and estimated budget from $${(50000 / 1000).toFixed(0)}K to $${(180000 / 1000).toFixed(0)}K.`,
    heroImage: undefined,
    isCostEstimate: true,
  },
  {
    slug: 'ai-app',
    title: 'Cost to Build an AI App in 2026',
    date: '08/03/2026',
    excerpt: `Learn how much it costs to build an AI app. Detailed breakdown of development time, team size, features, and estimated budget from $${(40000 / 1000).toFixed(0)}K to $${(200000 / 1000).toFixed(0)}K.`,
    heroImage: undefined,
    isCostEstimate: true,
  },
  {
    slug: 'whatsapp-like-app',
    title: 'Cost to Build a WhatsApp Like App in 2026',
    date: '08/03/2026',
    excerpt: `Learn how much it costs to build a WhatsApp like app. Detailed breakdown of development time, team size, features, and estimated budget from $${(60000 / 1000).toFixed(0)}K to $${(180000 / 1000).toFixed(0)}K.`,
    heroImage: undefined,
    isCostEstimate: true,
  },
  {
    slug: 'youtube-like-app',
    title: 'Cost to Build a YouTube Like App in 2026',
    date: '08/03/2026',
    excerpt: `Learn how much it costs to build a YouTube like app. Detailed breakdown of development time, team size, features, and estimated budget from $${(80000 / 1000).toFixed(0)}K to $${(250000 / 1000).toFixed(0)}K.`,
    heroImage: undefined,
    isCostEstimate: true,
  },
  {
    slug: 'dating-app',
    title: 'Cost to Build a Dating App in 2026',
    date: '08/03/2026',
    excerpt: `Learn how much it costs to build a dating app. Detailed breakdown of development time, team size, features, and estimated budget from $${(50000 / 1000).toFixed(0)}K to $${(150000 / 1000).toFixed(0)}K.`,
    heroImage: undefined,
    isCostEstimate: true,
  },
  {
    slug: 'food-delivery-app',
    title: 'Cost to Build a Food Delivery App in 2026',
    date: '08/03/2026',
    excerpt: `Learn how much it costs to build a food delivery app. Detailed breakdown of development time, team size, features, and estimated budget from $${(70000 / 1000).toFixed(0)}K to $${(200000 / 1000).toFixed(0)}K.`,
    heroImage: undefined,
    isCostEstimate: true,
  },
  {
    slug: 'social-network-app',
    title: 'Cost to Build a Social Network App in 2026',
    date: '08/03/2026',
    excerpt: `Learn how much it costs to build a social network app. Detailed breakdown of development time, team size, features, and estimated budget from $${(80000 / 1000).toFixed(0)}K to $${(250000 / 1000).toFixed(0)}K.`,
    heroImage: undefined,
    isCostEstimate: true,
  },
  {
    slug: 'e-learning-platform',
    title: 'Cost to Build an E-Learning Platform in 2026',
    date: '08/03/2026',
    excerpt: `Learn how much it costs to build an e-learning platform. Detailed breakdown of development time, team size, features, and estimated budget from $${(60000 / 1000).toFixed(0)}K to $${(180000 / 1000).toFixed(0)}K.`,
    heroImage: undefined,
    isCostEstimate: true,
  },
  {
    slug: 'fitness-app',
    title: 'Cost to Build a Fitness App in 2026',
    date: '08/03/2026',
    excerpt: `Learn how much it costs to build a fitness app. Detailed breakdown of development time, team size, features, and estimated budget from $${(40000 / 1000).toFixed(0)}K to $${(120000 / 1000).toFixed(0)}K.`,
    heroImage: undefined,
    isCostEstimate: true,
  },
  {
    slug: 'banking-app',
    title: 'Cost to Build a Banking App in 2026',
    date: '08/03/2026',
    excerpt: `Learn how much it costs to build a banking app. Detailed breakdown of development time, team size, features, and estimated budget from $${(100000 / 1000).toFixed(0)}K to $${(300000 / 1000).toFixed(0)}K.`,
    heroImage: undefined,
    isCostEstimate: true,
  },
  {
    slug: 'real-estate-app',
    title: 'Cost to Build a Real Estate App in 2026',
    date: '08/03/2026',
    excerpt: `Learn how much it costs to build a real estate app. Detailed breakdown of development time, team size, features, and estimated budget from $${(60000 / 1000).toFixed(0)}K to $${(180000 / 1000).toFixed(0)}K.`,
    heroImage: undefined,
    isCostEstimate: true,
  },
  {
    slug: 'job-board-app',
    title: 'Cost to Build a Job Board App in 2026',
    date: '08/03/2026',
    excerpt: `Learn how much it costs to build a job board app. Detailed breakdown of development time, team size, features, and estimated budget from $${(50000 / 1000).toFixed(0)}K to $${(150000 / 1000).toFixed(0)}K.`,
    heroImage: undefined,
    isCostEstimate: true,
  },
  {
    slug: 'event-management-app',
    title: 'Cost to Build an Event Management App in 2026',
    date: '08/03/2026',
    excerpt: `Learn how much it costs to build an event management app. Detailed breakdown of development time, team size, features, and estimated budget from $${(45000 / 1000).toFixed(0)}K to $${(130000 / 1000).toFixed(0)}K.`,
    heroImage: undefined,
    isCostEstimate: true,
  },
  {
    slug: 'crowdfunding-app',
    title: 'Cost to Build a Crowdfunding App in 2026',
    date: '08/03/2026',
    excerpt: `Learn how much it costs to build a crowdfunding app. Detailed breakdown of development time, team size, features, and estimated budget from $${(55000 / 1000).toFixed(0)}K to $${(160000 / 1000).toFixed(0)}K.`,
    heroImage: undefined,
    isCostEstimate: true,
  },
  {
    slug: 'travel-booking-app',
    title: 'Cost to Build a Travel Booking App in 2026',
    date: '08/03/2026',
    excerpt: `Learn how much it costs to build a travel booking app. Detailed breakdown of development time, team size, features, and estimated budget from $${(65000 / 1000).toFixed(0)}K to $${(190000 / 1000).toFixed(0)}K.`,
    heroImage: undefined,
    isCostEstimate: true,
  },
  {
    slug: 'healthcare-app',
    title: 'Cost to Build a Healthcare App in 2026',
    date: '08/03/2026',
    excerpt: `Learn how much it costs to build a healthcare app. Detailed breakdown of development time, team size, features, and estimated budget from $${(90000 / 1000).toFixed(0)}K to $${(250000 / 1000).toFixed(0)}K.`,
    heroImage: undefined,
    isCostEstimate: true,
  },
  {
    slug: 'on-demand-services-app',
    title: 'Cost to Build an On-Demand Services App in 2026',
    date: '08/03/2026',
    excerpt: `Learn how much it costs to build an on-demand services app. Detailed breakdown of development time, team size, features, and estimated budget from $${(60000 / 1000).toFixed(0)}K to $${(170000 / 1000).toFixed(0)}K.`,
    heroImage: undefined,
    isCostEstimate: true,
  },
  {
    slug: 'music-production-app',
    title: 'Cost to Build a Music Production App in 2026',
    date: '08/03/2026',
    excerpt: `Learn how much it costs to build a music production app. Detailed breakdown of development time, team size, features, and estimated budget from $${(55000 / 1000).toFixed(0)}K to $${(160000 / 1000).toFixed(0)}K.`,
    heroImage: undefined,
    isCostEstimate: true,
  },
  {
    slug: 'podcast-platform',
    title: 'Cost to Build a Podcast Platform in 2026',
    date: '08/03/2026',
    excerpt: `Learn how much it costs to build a podcast platform. Detailed breakdown of development time, team size, features, and estimated budget from $${(45000 / 1000).toFixed(0)}K to $${(130000 / 1000).toFixed(0)}K.`,
    heroImage: undefined,
    isCostEstimate: true,
  },
  {
    slug: 'news-aggregator-app',
    title: 'Cost to Build a News Aggregator App in 2026',
    date: '08/03/2026',
    excerpt: `Learn how much it costs to build a news aggregator app. Detailed breakdown of development time, team size, features, and estimated budget from $${(40000 / 1000).toFixed(0)}K to $${(120000 / 1000).toFixed(0)}K.`,
    heroImage: undefined,
    isCostEstimate: true,
  },
  {
    slug: 'weather-app',
    title: 'Cost to Build a Weather App in 2026',
    date: '08/03/2026',
    excerpt: `Learn how much it costs to build a weather app. Detailed breakdown of development time, team size, features, and estimated budget from $${(25000 / 1000).toFixed(0)}K to $${(80000 / 1000).toFixed(0)}K.`,
    heroImage: undefined,
    isCostEstimate: true,
  },
  {
    slug: 'navigation-app',
    title: 'Cost to Build a Navigation App in 2026',
    date: '08/03/2026',
    excerpt: `Learn how much it costs to build a navigation app. Detailed breakdown of development time, team size, features, and estimated budget from $${(90000 / 1000).toFixed(0)}K to $${(280000 / 1000).toFixed(0)}K.`,
    heroImage: undefined,
    isCostEstimate: true,
  },
  {
    slug: 'file-sharing-app',
    title: 'Cost to Build a File Sharing App in 2026',
    date: '08/03/2026',
    excerpt: `Learn how much it costs to build a file sharing app. Detailed breakdown of development time, team size, features, and estimated budget from $${(60000 / 1000).toFixed(0)}K to $${(180000 / 1000).toFixed(0)}K.`,
    heroImage: undefined,
    isCostEstimate: true,
  },
  {
    slug: 'project-management-app',
    title: 'Cost to Build a Project Management App in 2026',
    date: '08/03/2026',
    excerpt: `Learn how much it costs to build a project management app. Detailed breakdown of development time, team size, features, and estimated budget from $${(55000 / 1000).toFixed(0)}K to $${(160000 / 1000).toFixed(0)}K.`,
    heroImage: undefined,
    isCostEstimate: true,
  },
];

