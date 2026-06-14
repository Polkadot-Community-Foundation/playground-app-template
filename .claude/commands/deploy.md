---
description: Build and deploy the app to a .dot domain.
---

Deploy the app to the Summit network using `playground deploy`. The user's chosen domain name is: $ARGUMENTS

Steps:
1. If no domain name was provided in $ARGUMENTS, ask the user for one before proceeding (e.g. "reinhard" will become "reinhard.dot").
2. Run `npm run build` to ensure a fresh build.
3. Run `playground deploy --env summit --no-build --buildDir dist --domain <name>.dot --signer phone --playground` where `<name>` is the domain the user provided (strip any trailing `.dot` if they included it — the CLI adds it). Use a 5-minute timeout — deploys involve multiple on-chain transactions that wait for phone approval.
4. Show the user the output. The phone signer is already paired. There are **no push notifications** — tell the user to **open the Polkadot App on their phone** themselves; pending approval requests appear inside the app and they need to approve each one (4 approvals total: commitment, register, setContenthash, publish). Do not mention QR codes, links, or notifications.
5. If it succeeded, remind them to open `<name>.dot` inside **Polkadot Desktop** to verify the deployment. Tell them to **hard-refresh** (Cmd+Shift+R / Ctrl+Shift+R) — the browser may serve a cached version of the previous deploy.
