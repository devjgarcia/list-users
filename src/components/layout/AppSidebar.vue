<template>
    <aside class="sidebar p-3">
        <ul class="nav flex-column">
            <li class="nav-item">
                <router-link to="/" class="nav-link" active-class="active">Inicio</router-link>
            </li>
            <li class="nav-item">
                <router-link to="/users" class="nav-link" active-class="">Usuarios</router-link>
            </li>
            <li class="nav-item">
                <router-link to="/grid" class="nav-link" active-class="">Grid</router-link>
            </li>
        
        </ul>
    </aside>
</template>

<script setup>
</script>

<style scoped>
    .sidebar {
        width: 250px;
        background-color: var(--bs-light-bg);
        height: 100vh;
        position: fixed;
        border-right: solid 1.5px #efefef;
    }
</style>