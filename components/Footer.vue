<script setup lang="ts">
</script>

<template>
	<footer class="bg-slate-100 border-t border-slate-200 dark:bg-slate-900 dark:border-slate-700">
		<div class="container flex flex-col items-center font-medium text-slate-600 dark:text-slate-400 py-8 sm:flex-row sm:justify-between">
			<div>{{ $t('footer.copyright', { year: new Date().getFullYear() }) }}</div>
			<div class="flex flex-col items-center text-sm mt-4 sm:items-end sm:mt-0">
				<div v-html="$t('footer.technology')"></div>
				<div v-html="$t('footer.host')"></div>
			</div>
		</div>
	</footer>
</template>