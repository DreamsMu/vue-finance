<template>
    <div class="box" :style="{backgroundImage: 'url(' + img + ')'}">
        <router-view class="animate__animated animate__flipInX"></router-view>
    </div>
</template>

<script>
import backgroundImg from '@/assets/1.jpg'

export default {
    data() {
        return {
            img: backgroundImg
        }
    }
}
</script>

<style scoped>
.box {
    width: 100vw;
    height: 100vh;
    background: no-repeat;
    background-size:100% 100%;
    background-attachment: fixed;
    background-position:center;
}
</style>