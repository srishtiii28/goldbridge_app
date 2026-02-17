# Security Deposit Compliance Dashboard

An interactive web tool that helps property owners stay compliant with security deposit laws across different states and cities.

## Features

- **Multi-State Law Lookup**: Automatically fetch security deposit laws by property address
- **Compliance Checklist**: Generate state-specific checklists for security deposit handling
- **Maximum Deposit Calculator**: Calculate allowed security deposit amounts by jurisdiction
- **Interest Requirements**: Track which states require interest on security deposits
- **Deadline Tracker**: Know exactly when deposits must be returned
- **Penalty Calculator**: Understand non-compliance costs

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: TailwindCSS
- **Data**: Security deposit law database (JSON)
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
cd security-deposit-checker
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
security-deposit-checker/
├── src/
│   ├── app/              # Next.js app directory
│   ├── components/       # React components
│   ├── data/            # Security deposit law database
│   └── lib/             # Utility functions
├── public/              # Static assets
└── package.json
```

## Data Sources

Security deposit laws compiled from:
- State housing authority websites
- Legal databases
- Property management resources

*Note: Laws change frequently. Always verify with local authorities.*

## License

MIT
