<script lang="ts">
  import SvelteMarkdown from "svelte-markdown";

  export let content = "";

</script>

<div class="p-4 lg:mt-8">
  <div class="
  m-4 p-4 w-full lg:w-3/4 border border-gray-600 border-2 rounded-xl mx-auto bg-white shadow shadow-2xl drop-shadow-2xl box-decoration-clone
  [&>h1]:text-2xl [&>h1]:font-poppins-bold [&>h1]:my-4
  [&>h2]:text-xl [&>h2]:font-poppins-medium
  [&>h3]:text-lg
  [&>p]:my-2
  [&>ul]:list-disc [&>ul]:list-inside [&>ul]:my-2 [&>ul]:pl-4
  [&>ol]:list-decimal [&>ol]:list-inside [&>ol]:my-2 [&>ol]:pl-4
  [&>li]:my-2 [&>li]:pl-4
  [&>a]:text-blue-500 [&>a]:hover:text-blue-700 [&>a]:underline
  [&>img]:my-4 [&>img]:mx-auto [&>img]:rounded-xl [&>img]:shadow [&>img]:shadow-2xl [&>img]:drop-shadow-2xl [&>img]:box-decoration-clone [&>img]:border [&>img]:border-black
  [&>blockquote]:my-4 [&>blockquote]:p-4 [&>blockquote]:border-l-4 [&>blockquote]:border-black [&>blockquote]:border-2 [&>blockquote]:rounded-l-xl [&>blockquote]:bg-gray-100 [&>blockquote]:shadow [&>blockquote]:shadow-2xl [&>blockquote]:drop-shadow-2xl [&>blockquote]:box-decoration-clone
  [&>pre]:my-4 [&>pre]:p-4 [&>pre]:border-l-4 [&>pre]:border-black [&>pre]:border-2 [&>pre]:rounded-l-xl [&>pre]:bg-gray-100 [&>pre]:shadow [&>pre]:shadow-2xl [&>pre]:drop-shadow-2xl [&>pre]:box-decoration-clone
  [&>code]:my-4 [&>code]:p-4 [&>code]:border-l-4 [&>code]:border-black [&>code]:border-2 [&>code]:rounded-l-xl [&>code]:bg-gray-100 [&>code]:shadow [&>code]:shadow-2xl [&>code]:drop-shadow-2xl [&>code]:box-decoration-clone
  [&>table]:my-4 [&>table]:p-4 [&>table]:border-l-4 [&>table]:border-black [&>table]:border-2 [&>table]:rounded-l-xl [&>table]:bg-gray-100 [&>table]:shadow [&>table]:shadow-2xl [&>table]:drop-shadow-2xl [&>table]:box-decoration-clone
  [&>th]:my-4 [&>th]:p-4 [&>th]:border-l-4 [&>th]:border-black
">
    <SvelteMarkdown source={content}/>
  </div>
</div>