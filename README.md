# Zhatbot

<p align="center">
    Zhatbot is a modern, powerful chatbot application built with Next.js and the AI SDK, designed for seamless AI-powered conversations.
</p>

<p align="center">
  <a href="#features"><strong>Features</strong></a> ·
  <a href="#model-providers"><strong>Model Providers</strong></a> ·
  <a href="#getting-started"><strong>Getting Started</strong></a> ·
  <a href="#running-locally"><strong>Running Locally</strong></a>
</p>
<br/>

## Features

- [Next.js](https://nextjs.org) App Router
  - Advanced routing for seamless navigation and performance
  - React Server Components (RSCs) and Server Actions for server-side rendering
- [AI SDK](https://ai-sdk.dev/docs/introduction)
  - Unified API for generating text, structured objects, and tool calls with LLMs
  - Hooks for building dynamic chat and generative user interfaces
  - Supports OpenAI, Anthropic, Google, xAI, and other model providers
- [shadcn/ui](https://ui.shadcn.com)
  - Beautiful styling with [Tailwind CSS](https://tailwindcss.com)
  - Component primitives from [Radix UI](https://radix-ui.com) for accessibility
- Data Persistence
  - PostgreSQL database for saving chat history and user data
  - File storage for documents and attachments
- [Auth.js](https://authjs.dev)
  - Secure authentication with guest user support

## Model Providers

Zhatbot supports multiple AI providers through the AI SDK:

- **OpenAI**: GPT models including GPT-4, GPT-3.5, and O1 series
- **Anthropic**: Claude models including Haiku, Sonnet, and Opus
- **Google**: Gemini models for various use cases
- **xAI**: Grok models for advanced reasoning and coding

### Provider Authentication

Add your API keys to the `.env` file:

```env
OPENAI_API_KEY=your_openai_key
ANTHROPIC_API_KEY=your_anthropic_key
GOOGLE_API_KEY=your_google_key
XAI_API_KEY=your_xai_key
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- API keys for your preferred AI providers

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ivishal-g/Chatbot.git
cd Chatbot
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your API keys and database URL
```

4. Set up the database:
```bash
pnpm db:migrate
```

5. Start the development server:
```bash
pnpm dev
```

Your Zhatbot instance will be running on [localhost:3000](http://localhost:3000).

## Running Locally

You will need to configure the environment variables [defined in `.env.example`](.env.example) to run Zhatbot.

> Note: Never commit your `.env` file as it contains sensitive API keys and database credentials.

### Environment Variables

Required environment variables:

```env
# Database
POSTGRES_URL=postgresql://username:password@host:port/database

# AI Provider API Keys
OPENAI_API_KEY=your_openai_key
ANTHROPIC_API_KEY=your_anthropic_key
GOOGLE_API_KEY=your_google_key
XAI_API_KEY=your_xai_key

# Authentication
AUTH_SECRET=your_auth_secret
```

## Project Structure

```
├── app/                 # Next.js app directory
├── components/          # React components
├── lib/                # Utility functions and configurations
│   ├── ai/            # AI SDK providers and models
│   └── db/            # Database schema and queries
├── hooks/              # Custom React hooks
└── public/             # Static assets
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).
