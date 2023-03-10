export default [
    {
        path: '/reservation',
        component: () => import('@/layouts/main/layout-bar.vue'),
        meta: {
            title: 'Reservation', authOnly: true
        },
        children: [
            {
              path: '',
              name: 'Reservation',
              // route level code-splitting
              // this generates a separate chunk (about.[hash].js) for this route
              // which is lazy-loaded when the route is visited.
              component: () => import(/* webpackChunkName: "home" */ '@/views/Reservation.vue'),
            },
        ],
    }
]