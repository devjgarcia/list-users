import { ref } from 'vue';

const themeSelected = localStorage.getItem(`theme`);
const theme = ref( ((!themeSelected) ? 'light' : themeSelected) );

export function useTheme() {
    
    const toggleTheme = () => {
        theme.value = theme.value === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-bs-theme', theme.value);

        localStorage.setItem(`theme`, theme.value)
    };

    return { theme, toggleTheme };
}