export default [
    {
        path: '/table',
        component: () => import('@/layouts/main/layout-bar.vue'),
        meta: {
            title: 'Swing :: Table Component',
            authOnly: true

        },
        children: [
            {
                path: '',
                name: 'Table',
                component: () => import('@/views/table-view.vue')
            }
        ]
    }
]