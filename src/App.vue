<template>
    <div>
        <AppHeader />
        <AppSidebar />
        <main>
            <section class="content p-4">
                <router-view />
            </section>
        </main>
    </div>
</template>

<script setup>
    import { provide, onMounted } from 'vue';
    import AppHeader from './components/layout/AppHeader.vue';
    import AppSidebar from './components/layout/AppSidebar.vue';
    import { useTheme } from './composables/useTheme';

    const { toggleTheme, theme } = useTheme();
    provide('toggleTheme', toggleTheme);

    onMounted(() => {
        // Establecer el valor inicial de data-bs-theme
        document.documentElement.setAttribute('data-bs-theme', theme.value);
    });
</script>

<style scoped>
    .content {
        margin-left: 265px;
        width: calc(100% - 265px);
    }
</style>