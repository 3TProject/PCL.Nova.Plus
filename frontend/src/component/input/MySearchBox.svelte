<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import MySelectCard from "../card/MySelectCard.svelte";
  import MyCardButton from "../button/MyCardButton.svelte";
  import MyNormalButton from "../button/MyNormalButton.svelte";
  export let placeholder: string = undefined
  let query: string = ""
  const dispath = createEventDispatcher()
  function handleSearch() {
    dispath("search", query)
  }
</script>

<MySelectCard>
  <section class="search-card">
    <svg class="search-icon" viewBox="0 0 1100 1100">
      <path
        d="M675.9168 242.816C556.3008 123.2 362.4448 123.2 242.8288 242.816 123.2128 362.432 123.2128 556.288 242.8288 675.904 362.4448 795.52 556.3008 795.52 675.9168 675.904 795.5328 556.288 795.5328 362.432 675.9168 242.816L675.9168 242.816ZM1000.7168 892.48C1030.6048 922.368 1030.6048 970.816 1000.7168 1000.704 970.8288 1030.656 922.3808 1030.656 892.4288 1000.704L730.0608 838.336C728.1408 836.416 727.4368 833.92 725.7728 831.872 546.3168 960.448 295.7568 945.408 134.5408 784.192-44.8512 604.8-44.8512 313.92 134.5408 134.528 313.9328-44.864 604.8128-44.864 784.2048 134.528 945.4208 295.744 960.4608 546.304 831.8848 725.76 833.9328 727.424 836.4288 728.128 838.3488 730.048L1000.7168 892.48Z"
        fill="currentColor">
      </path>
    </svg>
    <input
      type="text"
      bind:value={query}
      placeholder={placeholder}
      class="search-input"
    />
    <MyNormalButton style_in="padding: 6px 14px;" click={handleSearch}>搜索</MyNormalButton>
  </section>
</MySelectCard>

<style>
.search-card {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 10px;
  padding: 12px;
}

.search-icon {
  width: 18px;
}

.search-input {
  flex: 1;
  font-size: 15px;
  text-align: left;
  color: var(--color-text-black);
  font-family: 'PCL-English';
  border: none;
  outline: none;
  background-color: transparent;
}
</style>
