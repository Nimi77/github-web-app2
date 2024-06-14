<template>
    <div>
        <slot v-if="!hasError"></slot>
        <div v-else>
            <h1>Something went wrong</h1>
            <p>We apologize for the inconvenience. Please try again later.</p>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const hasError = ref(false);

// eslint-disable-next-line no-unused-vars
const errorCaptured = (err, instance, info) => {
    console.error('Error caught by error boundary:', err, info);
    hasError.value = true;
    // Return true to stop the error from propagating further
    return true;
};
</script>