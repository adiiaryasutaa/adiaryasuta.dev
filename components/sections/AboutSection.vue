<script setup lang="ts">
</script>

<template>
	<section class="container">
		<div class="flex flex-col items-center md:flex-row md:items-start">
			<div class="flex flex-col items-center md:shrink-0">
				<img src="@/assets/imgs/adiaryasuta2.jpg" :alt="$t('brand')"
						 class="rounded-sm w-60 border-8 border-slate-200 xl:w-72 dark:border-slate-800">
				<div v-html="$t('about.image-description[0]')" class="text-xs mt-2 text-slate-400 dark:text-slate-600"></div>
				<div v-html="$t('about.image-description[1]')" class="text-xs mt-1 text-slate-400 dark:text-slate-600"></div>
			</div>
			<div class="mt-10 text-justify leading-relaxed text-slate-700 space-y-4 dark:text-slate-300 md:mt-0 md:ml-10 xl:text-lg">
				<p v-html="$t('about.description[0]')"></p>
				<p v-html="$t('about.description[1]')"></p>
				<p v-html="$t('about.description[2]')"></p>
			</div>
		</div>
	</section>
</template>