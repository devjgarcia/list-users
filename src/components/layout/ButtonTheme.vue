<template>
    <label class="toggle_label" :title="`Cambiar tema a ${(theme===`dark`) ? `Claro` : `Oscuro` }`">
        <input 
            type="checkbox" 
            id="mode" 
            :checked="(theme === `dark`)" 
            class="toggle" 
            @change="toggleTheme">

        <span class="slider round">
            <i class="bi bi-moon-stars-fill moon"></i>
            <i class="bi bi-brightness-high-fill sun"></i>
        </span>
    </label>
</template>

<script setup>
import { useTheme } from '../../composables/useTheme'; 

const { toggleTheme, theme } = useTheme();

</script>

<style scoped>

.toggle {
    background-color: #607d8b;
    color: #607d8b;
    visibility: hidden;
}

.toggle_label {
    position: relative;
    display: inline-block;
    width: 120px;
    height: 50px;
    background-color: #9ae6ff;
    border-radius: 30px;
}

.slider {
    bottom: 0;
    cursor: pointer;
    position: absolute;
    right: 0px;
    left: 0px;
    top: 0px;
    bottom: 0;
    -webkit-transition: .4s;
    transition: .4s;
}

.slider:before {
    border: 5px solid white;
    content: "";
    height: 40px;
    width: 40px;
    right: 10px;
    left: 5px;
    top: 5px;
    position: absolute;
    transition: .4s;
    border-radius: 50%;
}

.slider i {
    position: absolute;
    display: inline-block;
    font-size: 18px;
    color: #fff;
    transition: opacity 0.4s;
}

.sun {
    top: 12px;
    left: 15px;
    color: yellow !important;
}

.moon {
    top: 12px;
    right: 15px;
    opacity: 0;
    color: gray !important;
}

input:checked+.slider {
    background-color: rgb(0, 0, 0);
}

input:checked+.slider:before {
    transform: translateX(70px);
}

.slider.round {
    border-radius: 34px;
}

.slider.round:before {
    border-radius: 50%;
}

.toggle:checked+.slider .sun {
    opacity: 0;
}

.toggle:checked+.slider .moon {
    opacity: 1;
    color: rgb(0, 0, 0);
}
</style>