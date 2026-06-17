import { useEffect, useState } from "react";
import { createChainClient } from "@parity/product-sdk-chain-client";
import { summit_asset_hub } from "@parity/product-sdk-descriptors/summit-asset-hub";

// Demo chain read: subscribe to Summit Asset Hub's current block number through
// the sanctioned chain-client (host-routed — never a direct RPC endpoint). The
// network is hardcoded to Summit: the descriptor's genesis hash is what selects
// the chain (there are no endpoints/URLs to configure), and importing only
// summit_asset_hub keeps the build to a single metadata chunk.
export interface ChainBlockState {
    status: "connecting" | "live" | "error";
    block: number | null;
    error: string | null;
}

export function useChainBlock(): ChainBlockState {
    const [state, setState] = useState<ChainBlockState>({
        status: "connecting",
        block: null,
        error: null,
    });

    useEffect(() => {
        let cancelled = false;
        let client: { destroy(): void } | null = null;
        let subscription: { unsubscribe(): void } | null = null;

        const fail = (cause: unknown) => {
            if (cancelled) return;
            setState({
                status: "error",
                block: null,
                error: cause instanceof Error ? cause.message : String(cause),
            });
        };

        createChainClient({ chains: { assetHub: summit_asset_hub } })
            .then(chainClient => {
                if (cancelled) {
                    chainClient.destroy();
                    return;
                }
                client = chainClient;
                // watchValue returns an RxJS Observable; each new best block emits.
                subscription = chainClient.assetHub.query.System.Number.watchValue({
                    at: "best",
                }).subscribe({
                    next: ({ value }) => {
                        if (!cancelled) setState({ status: "live", block: Number(value), error: null });
                    },
                    error: fail,
                });
            })
            .catch(fail);

        return () => {
            cancelled = true;
            subscription?.unsubscribe();
            client?.destroy();
        };
    }, []);

    return state;
}
