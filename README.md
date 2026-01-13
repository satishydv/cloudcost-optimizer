
# CloudCost Optimizer

CloudCost Optimizer is a sophisticated cloud financial management platform designed to provide real-time visibility, forecasting, and optimization for multi-cloud infrastructure costs. This MVP focuses on delivering high-energy, data-driven insights through a premium user interface.

## Key Features

- Financial Overview: Real-time expenditure monitoring with key performance indicators for daily spend, MTD actuals, and EOM forecasts.
- Spending Velocity: Interactive area charts showing cost trends over time with multi-region monitoring.
- Resource Distribution: Detailed breakdown of costs across various cloud services like EC2, S3, RDS, and Lambda.
- Anomaly Detection: Automated identification of cost spikes and unusual spending patterns.
- Alerts and Monitoring: Proactive notification system for critical budget deviations and optimization opportunities.
- Global Operations: Active monitoring across 12 global regions for a comprehensive multi-provider view.

## Technology Stack

- Frontend: React 19 with Vite for fast development and optimized production builds.
- Language: TypeScript for robust type safety and improved developer experience.
- Styling: Tailwind CSS for a modern, responsive, and utility-first design system.
- Data Visualization: Recharts for high-performance, interactive analytical charts.
- Animations: Framer Motion for smooth transitions and high-energy interactive elements.
- Icons: Lucide React for consistent and crisp vector iconography.

## Getting Started

### Prerequisites

- Node.js (version 18 or higher recommended)
- A valid Gemini API Key for AI-driven insights

### Installation

1. Clone the repository:
   `git clone <repository-url>`

2. Navigate to the project directory:
   `cd cloudcost-optimizer-mvp`

3. Install dependencies:
   `npm install`

### Configuration

Set your Gemini API key in the `.env.local` file:
`GEMINI_API_KEY=your_api_key_here`

### Running Locally

To start the development server:
`npm run dev`

The application will be available at `http://localhost:5173`.

## Deployment

