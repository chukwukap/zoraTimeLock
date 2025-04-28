# ZoraTimeLock

Monetize your future content, today. A Farcaster frame that enables creators to tokenize and monetize upcoming content through time-locked tokens.

## Features

- Creator Portal for content management
- Token-based content monetization
- Time-lock mechanism for future content
- Trading platform for content tokens
- Analytics and insights dashboard
- Community engagement tools
- Farcaster frame integration
- Seamless Farcaster social experience

## Branding

### Colors

- Primary: #3B82F6 (Blue)
- Secondary: #1E293B (Dark Blue)
- Accent: #10B981 (Green)
- Background: #F8FAFC (Light Gray)
- Text: #0F172A (Dark Gray)

### Typography

- Primary Font: Geist Sans
- Secondary Font: Geist Mono

## Tech Stack

- **Frontend**: Next.js 14 with TypeScript
- **Smart Contracts**: Solidity
- **Blockchain**: Ethereum (Zora integration)
- **Database**: PostgreSQL
- **Authentication**: Web3 wallet integration
- **Styling**: Tailwind CSS
- **Package Manager**: pnpm
- **Frame Protocol**: Farcaster Frame API
- **Social Integration**: Farcaster API

## Getting Started

### Prerequisites

- Node.js 18.x or later
- pnpm
- MetaMask or other Web3 wallet
- Farcaster account
- Git

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/zoraTimeLock.git
cd zoraTimeLock
```

2. Install dependencies:

```bash
pnpm install
```

3. Set up environment variables:

```bash
cp .env.example .env.local
# Edit .env.local with your configuration
```

4. Run the development server:

```bash
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Development

### Project Structure

```
zoraTimeLock/
├── app/                 # Next.js app directory
│   ├── api/            # API routes including frame endpoints
│   └── frame/          # Farcaster frame components
├── components/          # React components
├── contracts/           # Smart contracts
├── lib/                 # Utility functions
├── public/             # Static assets
└── styles/             # Global styles
```

### Smart Contracts

The smart contracts are located in the `contracts/` directory. Key contracts include:

- `TimeLockToken.sol`: Main token contract
- `ContentManager.sol`: Content management contract
- `TradingPool.sol`: Trading functionality

### Farcaster Integration

The application integrates with Farcaster through:

- Frame API endpoints for interactive content
- Social graph integration for community features
- Cast embedding for content sharing
- Frame actions for token interactions

### Testing

Run the test suite:

```bash
pnpm test
```

### Deployment

1. Build the application:

```bash
pnpm build
```

2. Deploy smart contracts:

```bash
pnpm deploy:contracts
```

3. Deploy frontend:

```bash
pnpm deploy:frontend
```

4. Deploy Farcaster frame:

```bash
pnpm deploy:frame
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Security

- All smart contracts are audited
- Regular security updates
- Bug bounty program available
- Report security issues to security@zoratimelock.com
- Frame security best practices implemented

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

- Documentation: [docs.zoratimelock.com](https://docs.zoratimelock.com)
- Discord: [discord.gg/zoratimelock](https://discord.gg/zoratimelock)
- Twitter: [@ZoraTimeLock](https://twitter.com/ZoraTimeLock)
- Farcaster: [@zoratimelock](https://warpcast.com/zoratimelock)
- Email: support@zoratimelock.com
