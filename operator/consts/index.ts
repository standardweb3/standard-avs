interface ChainAddressMap {
    [chainId: number]: `0x${string}`; // Key is a number (chain ID), value is a string (address)
}

export const Stablecoin: ChainAddressMap = {
    238: "0x4300000000000000000000000000000000000003"
};

export const WETH: ChainAddressMap = {
    238: "0x4200000000000000000000000000000000000006"
}

export const ServiceManager: ChainAddressMap = {
    238: "0x0000000000000000000000000000000000000000"
}