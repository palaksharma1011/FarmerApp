This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## File structure
agrivoice-frontend/
├── README.md
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
├── package.json
├── .env.local
├── .env.example
├── .gitignore
├── postcss.config.js
│
├── public/
│   ├── favicon.ico
│   ├── logo.png
│   ├── icons/
│   │   ├── farmer.svg
│   │   ├── consumer.svg
│   │   ├── voice.svg
│   │   └── blockchain.svg
│   ├── images/
│   │   ├── hero-bg.jpg
│   │   ├── farm-verification/
│   │   └── products/
│   ├── audio/
│   │   ├── voice-prompts/
│   │   │   ├── hindi/
│   │   │   ├── punjabi/
│   │   │   └── english/
│   │   └── notification-sounds/
│   └── manifest.json
│
├── src/
│   ├── app/                              # Next.js 13+ App Router
│   │   ├── layout.tsx                    # Root layout
│   │   ├── page.tsx                      # Homepage
│   │   ├── loading.tsx                   # Global loading UI
│   │   ├── error.tsx                     # Error boundary
│   │   ├── not-found.tsx                 # 404 page
│   │   ├── globals.css                   # Global styles
│   │   │
│   │   ├── (auth)/                       # Auth route group
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   ├── register/
│   │   │   │   └── page.tsx
│   │   │   └── wallet-connect/
│   │   │       └── page.tsx
│   │   │
│   │   ├── farmer/                       # Farmer dashboard routes
│   │   │   ├── layout.tsx                # Farmer-specific layout
│   │   │   ├── page.tsx                  # Farmer dashboard
│   │   │   ├── onboarding/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── voice-registration/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── verification/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── farm-details/
│   │   │   │       └── page.tsx
│   │   │   ├── products/
│   │   │   │   ├── page.tsx              # Product list
│   │   │   │   ├── add/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── [id]/
│   │   │   │   │   ├── page.tsx          # Product detail
│   │   │   │   │   └── edit/
│   │   │   │   │       └── page.tsx
│   │   │   │   └── voice-add/
│   │   │   │       └── page.tsx
│   │   │   ├── orders/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [orderId]/
│   │   │   │       └── page.tsx
│   │   │   ├── profile/
│   │   │   │   └── page.tsx
│   │   │   ├── payments/
│   │   │   │   └── page.tsx
│   │   │   └── analytics/
│   │   │       └── page.tsx
│   │   │
│   │   ├── marketplace/                  # Consumer marketplace
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx                  # Product listings
│   │   │   ├── search/
│   │   │   │   └── page.tsx
│   │   │   ├── category/
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx
│   │   │   ├── product/
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx
│   │   │   └── farmer/
│   │   │       └── [farmerId]/
│   │   │           └── page.tsx
│   │   │
│   │   ├── consumer/                     # Consumer dashboard
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── cart/
│   │   │   │   └── page.tsx
│   │   │   ├── orders/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [orderId]/
│   │   │   │       └── page.tsx
│   │   │   ├── profile/
│   │   │   │   └── page.tsx
│   │   │   └── wishlist/
│   │   │       └── page.tsx
│   │   │
│   │   ├── admin/                        # Admin panel (optional)
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── farmers/
│   │   │   │   └── page.tsx
│   │   │   ├── products/
│   │   │   │   └── page.tsx
│   │   │   └── analytics/
│   │   │       └── page.tsx
│   │   │
│   │   └── api/                          # API routes
│   │       ├── auth/
│   │       │   ├── login/
│   │       │   │   └── route.ts
│   │       │   └── register/
│   │       │       └── route.ts
│   │       ├── voice/
│   │       │   ├── process/
│   │       │   │   └── route.ts
│   │       │   ├── translate/
│   │       │   │   └── route.ts
│   │       │   └── commands/
│   │       │       └── route.ts
│   │       ├── blockchain/
│   │       │   ├── contracts/
│   │       │   │   └── route.ts
│   │       │   ├── transactions/
│   │       │   │   └── route.ts
│   │       │   └── verify/
│   │       │       └── route.ts
│   │       ├── products/
│   │       │   ├── route.ts
│   │       │   └── [id]/
│   │       │       └── route.ts
│   │       ├── farmers/
│   │       │   ├── route.ts
│   │       │   ├── verify/
│   │       │   │   └── route.ts
│   │       │   └── [id]/
│   │       │       └── route.ts
│   │       ├── orders/
│   │       │   ├── route.ts
│   │       │   └── [id]/
│   │       │       └── route.ts
│   │       ├── payments/
│   │       │   ├── process/
│   │       │   │   └── route.ts
│   │       │   └── webhook/
│   │       │       └── route.ts
│   │       └── upload/
│   │           ├── image/
│   │           │   └── route.ts
│   │           └── document/
│   │               └── route.ts
│   │
│   ├── components/                       # Reusable UI components
│   │   ├── ui/                          # Basic UI components
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── modal.tsx
│   │   │   ├── card.tsx
│   │   │   ├── loading.tsx
│   │   │   ├── avatar.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── dropdown.tsx
│   │   │   └── notification.tsx
│   │   │
│   │   ├── layout/                      # Layout components
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Navigation.tsx
│   │   │   └── MobileMenu.tsx
│   │   │
│   │   ├── farmer/                      # Farmer-specific components
│   │   │   ├── VoiceInterface.tsx
│   │   │   ├── ProductForm.tsx
│   │   │   ├── VoiceProductAdd.tsx
│   │   │   ├── FarmVerification.tsx
│   │   │   ├── DashboardStats.tsx
│   │   │   ├── OrderNotifications.tsx
│   │   │   └── PaymentHistory.tsx
│   │   │
│   │   ├── consumer/                    # Consumer-specific components
│   │   │   ├── ProductCard.tsx
│   │   │   ├── ProductGrid.tsx
│   │   │   ├── SearchFilters.tsx
│   │   │   ├── CartSummary.tsx
│   │   │   ├── CheckoutProcess.tsx
│   │   │   ├── OrderTracking.tsx
│   │   │   └── ReviewSystem.tsx
│   │   │
│   │   ├── common/                      # Shared components
│   │   │   ├── LanguageSelector.tsx
│   │   │   ├── WalletConnector.tsx
│   │   │   ├── BlockchainStatus.tsx
│   │   │   ├── ImageUpload.tsx
│   │   │   ├── LocationPicker.tsx
│   │   │   ├── PriceDisplay.tsx
│   │   │   └── RatingStars.tsx
│   │   │
│   │   ├── voice/                       # Voice-related components
│   │   │   ├── VoiceButton.tsx
│   │   │   ├── VoiceRecorder.tsx
│   │   │   ├── LanguageDetector.tsx
│   │   │   ├── VoiceCommands.tsx
│   │   │   └── SpeechFeedback.tsx
│   │   │
│   │   └── blockchain/                  # Blockchain components
│   │       ├── WalletProvider.tsx
│   │       ├── TransactionStatus.tsx
│   │       ├── ContractInteraction.tsx
│   │       └── GasFeeEstimator.tsx
│   │
│   ├── lib/                             # Utility libraries
│   │   ├── utils.ts                     # General utilities
│   │   ├── constants.ts                 # App constants
│   │   ├── validations.ts               # Form validations
│   │   │
│   │   ├── blockchain/                  # Blockchain utilities
│   │   │   ├── web3.ts                  # Web3 initialization
│   │   │   ├── contracts.ts             # Smart contract interactions
│   │   │   ├── wallet.ts                # Wallet connections
│   │   │   └── transactions.ts          # Transaction handling
│   │   │
│   │   ├── voice/                       # Voice processing
│   │   │   ├── speechToText.ts
│   │   │   ├── textToSpeech.ts
│   │   │   ├── languageProcessor.ts
│   │   │   └── voiceCommands.ts
│   │   │
│   │   ├── ai/                          # AI utilities
│   │   │   ├── imageAnalysis.ts
│   │   │   ├── priceOptimization.ts
│   │   │   └── qualityAssessment.ts
│   │   │
│   │   ├── api/                         # API utilities
│   │   │   ├── client.ts                # API client setup
│   │   │   ├── endpoints.ts             # API endpoints
│   │   │   └── middleware.ts            # API middleware
│   │   │
│   │   └── storage/                     # Storage utilities
│   │       ├── ipfs.ts                  # IPFS integration
│   │       ├── localStorage.ts
│   │       └── sessionStorage.ts
│   │
│   ├── hooks/                           # Custom React hooks
│   │   ├── useAuth.ts
│   │   ├── useWallet.ts
│   │   ├── useVoice.ts
│   │   ├── useBlockchain.ts
│   │   ├── useGeolocation.ts
│   │   ├── useLanguage.ts
│   │   ├── useProducts.ts
│   │   ├── useOrders.ts
│   │   └── useNotifications.ts
│   │
│   ├── store/                           # State management (Redux/Zustand)
│   │   ├── index.ts                     # Store configuration
│   │   ├── slices/
│   │   │   ├── authSlice.ts
│   │   │   ├── walletSlice.ts
│   │   │   ├── voiceSlice.ts
│   │   │   ├── productSlice.ts
│   │   │   ├── orderSlice.ts
│   │   │   ├── cartSlice.ts
│   │   │   └── languageSlice.ts
│   │   └── middleware/
│   │       ├── apiMiddleware.ts
│   │       └── blockchainMiddleware.ts
│   │
│   ├── types/                           # TypeScript type definitions
│   │   ├── index.ts
│   │   ├── api.ts
│   │   ├── blockchain.ts
│   │   ├── voice.ts
│   │   ├── user.ts
│   │   ├── product.ts
│   │   ├── order.ts
│   │   └── farmer.ts
│   │
│   ├── styles/                          # Styling
│   │   ├── globals.css
│   │   ├── components.css
│   │   ├── farmer.css
│   │   ├── consumer.css
│   │   └── voice.css
│   │
│   ├── locales/                         # Internationalization
│   │   ├── en/
│   │   │   └── common.json
│   │   ├── hi/
│   │   │   └── common.json
│   │   ├── pa/
│   │   │   └── common.json
│   │   ├── bn/
│   │   │   └── common.json
│   │   └── ta/
│   │       └── common.json
│   │
│   ├── data/                            # Static data and mock data
│   │   ├── categories.json
│   │   ├── locations.json
│   │   ├── mockProducts.json
│   │   └── voiceCommands.json
│   │
│   └── middleware.ts                    # Next.js middleware
│
├── contracts/                           # Smart contracts (if included)
│   ├── AgriVoice.sol
│   ├── ProductRegistry.sol
│   ├── PaymentEscrow.sol
│   └── ReputationSystem.sol
│
├── docs/                               # Documentation
│   ├── API.md
│   ├── DEPLOYMENT.md
│   ├── VOICE_COMMANDS.md
│   └── BLOCKCHAIN_INTEGRATION.md
│
└── tests/                              # Test files
    ├── components/
    ├── pages/
    ├── hooks/
    ├── utils/
    └── e2e/
