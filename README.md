# Polkadot Playground

Minimal React + Vite + TypeScript template wired to the Host API for product-account access from Polkadot Desktop. A starting point for building Polkadot dapps.

A live deployment runs at [**playground.dot.li**](https://playground.dot.li) — open it inside Polkadot Desktop to see the template connect to the Host API, surface the app-scoped product account's SS58 + EVM (H160) addresses, and sign a message end-to-end.

## Mod it

This repo is meant to be forked, gutted, and turned into your own dapp. The pieces you'll most likely want to swap or extend:

- **Account panel** ([src/App.tsx](src/App.tsx)) — replace the address display + sign demo with whatever your app actually does. The `SignDemo` component is a working reference for calling `signerManager.signRaw(...)` once you have a selected account.
- **App shell** ([src/App.tsx](src/App.tsx), [src/App.css](src/App.css)) — header, layout, and theme are intentionally tiny so you can rip them out. The `#root { max-width: 520px }` cap is just a default; widen or remove it for dashboards / multi-column layouts.
- **Stack additions** — `@parity/product-sdk-chain-client` for chain RPC, `@parity/product-sdk-bulletin` for off-chain storage, `@parity/product-sdk-contracts` for smart contracts, `@parity/product-sdk-statement-store` for P2P pub/sub. See [CLAUDE.md](CLAUDE.md) for the full stack table.

When you're ready, deploy your fork to your own `<name>.dot` domain (see below) — no servers, no hosting bill.

## Stack

- **React 19** + **Vite** + **TypeScript**
- **`@parity/product-sdk-signer`** — Host signer management and app-scoped product-account signing
- **`@parity/product-sdk-host`** — TruAPI helpers for Polkadot Desktop
- **`@novasamatech/product-sdk`** — TruAPI runtime used underneath the Product SDK packages

## Running

```bash
npm install
npm run dev
```

Runs on `http://localhost:5173`. Must be opened inside **Polkadot Desktop** for Host API login to work.

Product-account signing is scoped to the host's current app identifier. Local dev uses the current loopback host, e.g. `localhost:5173`; `.dot.li` gateway URLs are mapped back to their `.dot` product id. Set `VITE_PRODUCT_ACCOUNT_ID` when you need an explicit override.

## Structure

```
src/
├── App.tsx       # Header + product account panel + your app shell
├── utils.ts      # Product SDK signer wrapper + small helpers
└── main.tsx      # Vite entry
```

## Deploying

A `/deploy <name>` slash command is wired up for Claude Code users — it runs `dot deploy` against `<name>.dot` using the phone signer. Standalone:

```bash
npm run build
dot deploy --no-build --buildDir dist --domain <name>.dot --signer phone --playground
```
