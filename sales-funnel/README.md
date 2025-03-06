# Sales Funnel Tracking System

A comprehensive sales CRM and funnel tracking system built with Next.js, Prisma, and Tailwind CSS.

## Features

- **Dashboard**: Visualize your sales funnel and key metrics
- **Leads Management**: Track and manage potential customers
- **Deals Tracking**: Monitor deals through the sales pipeline
- **Activity Logging**: Record all interactions with leads and customers
- **Sales Analytics**: Analyze conversion rates and performance

## Database Schema

The system uses a relational database with the following structure:

- **Users**: Sales representatives and administrators
- **Leads**: Potential customers and their information
- **Deals**: Opportunities associated with leads
- **Deal Stages**: Tracking of deal progression through the sales funnel
- **Activities**: Interactions with leads (emails, calls, meetings, etc.)

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- A database (SQLite for development, PostgreSQL recommended for production)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/sales-funnel.git
   cd sales-funnel
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up the database:
   ```
   npx prisma migrate dev --name init
   ```

4. Start the development server:
   ```
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Development

### Database Management

- Generate Prisma client: `npx prisma generate`
- Open Prisma Studio: `npx prisma studio`
- Create a migration: `npx prisma migrate dev --name your_migration_name`

### Building for Production

```
npm run build
npm start
```

## License

MIT

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [Prisma](https://www.prisma.io/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Chart.js](https://www.chartjs.org/)
