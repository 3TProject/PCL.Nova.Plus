<script lang="ts">
  import MySearchBox from "../../../component/input/MySearchBox.svelte";
  import MySelectCard from "../../../component/card/MySelectCard.svelte";
  import modrinthApi from "../../../util/modrinthApi";
  import CompItem from "../../../component/card/CompItem.svelte";
  import { onMount } from "svelte";

  export let slide = null;
  export let after_leave = null;
  let hits = [];

  const handleSearch = async (e: CustomEvent) => {
    hits.length = 0;
    const query = e.detail;
    let data = await modrinthApi.searchProjects({
      query,
      facets: [["project_type:mod"]],
    });
    hits = data.hits;
  };

  onMount(async()=>{
    let data = await modrinthApi.searchProjects({
      facets: [["project_type:mod"]],
    });
    hits = data.hits;
  })
</script>

<div
  class="component-extension_mod"
  in:slide
  out:slide
  on:outroend={after_leave}
>
  <MySearchBox placeholder="搜索 Mod" on:search={handleSearch} />
  <MySelectCard maxHeight={740}>
    {#each hits as hit}
      <CompItem
        title={hit.title}
        description={hit.description}
        date_modified={hit.date_modified}
        icon_url={hit.icon_url}
        categories={hit.categories}
        downloads={hit.downloads}
      />
    {/each}
  </MySelectCard>
</div>

<style>
  .component-extension_mod {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow-y: auto;
  }
</style>
