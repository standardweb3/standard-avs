interface ChainAddressMap {
    [chainId: number]: string; // Key is a number (chain ID), value is a string (address)
}

export const Stablecoin: ChainAddressMap = {
    238: "0x4300000000000000000000000000000000000003"
};