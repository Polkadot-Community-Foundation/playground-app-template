# Polkadot Playground — agent guidance

A minimal Polkadot dapp template: React 19 + Vite + TypeScript, wired to the Host API to obtain an app-scoped product account and signatures from Polkadot Desktop. Use this as a starting point for building Polkadot apps.

## Polkadot stack

| Layer | Package |
|-------|---------|
| Product account / signing | `@parity/product-sdk-signer` |
| Host / TruAPI helpers | `@parity/product-sdk-host` (Polkadot Desktop only) |
| Chain RPC | `@parity/product-sdk-chain-client` (add with descriptors when you need it) |

Other packages worth knowing about for richer apps:

- `@parity/product-sdk-bulletin` — IPFS-style off-chain storage
- `@parity/product-sdk-contracts` — smart contract helpers
- `@parity/product-sdk-statement-store` — real-time P2P pub/sub
- `@parity/product-sdk-tx` — transaction submission helpers

## Landmarks

- Frontend entry + product account panel: [src/App.tsx](src/App.tsx)
- Product SDK signer wrapper: [src/utils.ts](src/utils.ts)
- Vite + TS config: [vite.config.ts](vite.config.ts), [tsconfig.json](tsconfig.json)

## Conventions

- **Host API login only works inside Polkadot Desktop.** Don't propose extension/browser fallbacks — they're intentionally out-of-scope.
- `src/utils.ts` intentionally calls `SignerManager.connect("host")` first, then `getProductAccount(productIdentifier, 0)`; the selected account is the app-scoped product account.
- Product account identifiers must match the host's current app identifier. Localhost uses `window.location.host` (for example `localhost:5173`), `.dot.li` gateway URLs map to `.dot`, and `VITE_PRODUCT_ACCOUNT_ID` can override this.
- Signed extrinsics (Bulletin uploads, contract calls, etc.) require PAS tokens. Faucets:
  - Asset Hub: https://faucet.polkadot.io/
  - Bulletin: https://paritytech.github.io/polkadot-bulletin-chain/authorizations?tab=faucet
- Polkadot Desktop itself isn't installable from this repo — point users at the Polkadot Apps documentation if they don't have it.

## Slash commands

- `/dev` — install deps if needed, then start the dev server in the background.
- `/deploy <name>` — build and deploy to `<name>.dot` via the `dot` CLI (phone signer).
