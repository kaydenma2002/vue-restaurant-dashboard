<template>
    <div>
        <v-container>
            <titlebarComponent :title="title" :routes="routes" class="mb"></titlebarComponent>
            <v-row>
                <v-col lg="12" sm="12">
                    <tableUser></tableUser>
                </v-col>

            </v-row>
            <v-row>
                <myFooter></myFooter>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import titlebarComponent from '@/components/titlebar/titlebar-component.vue';
import tableUser from '@/components/table/table-use.vue';
import myFooter from '@/components/footer/footer-component.vue';
export default {
    components: {
        titlebarComponent,
        tableUser,
        myFooter
    },
    data: () => ({
        title: 'Table',
        routes: [
            {
                title: "Components",
                disabled: false,
                href: "#",
            },
            {
                title: "Table",
                disabled: false,
                href: "table",
            },
        ],
    })
}
</script>

<style scoped>
.mb {
    margin-bottom: 15px;
}

.main-bg {
    background-color: rgb(227, 227, 221);
    height: 100%;
}

.margin {
    margin-top: 29%;
}
</style>