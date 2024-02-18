// composables/useGasPrice.ts

import { fetchGasPrice } from '@kolirt/vue-web3-auth';
import { ref } from 'vue';

export function useGasPrice() {
  const gasPrice = ref();

  const fetchContractGas = async () => {
    try {
      gasPrice.value = await fetchGasPrice();
      gasPrice.value = (parseFloat(gasPrice.value.formatted.gasPrice) * 14 / 10000).toFixed(3) + " ETH";
    } catch (error) {
      console.error('Failed to fetch gas price:', error);
    }
  };

  return { gasPrice, fetchContractGas };
}
