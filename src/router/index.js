import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/FrontView.vue"),
      children: [
        {
          path: "/main",
          name: "main",
          component: () => import("../components/front/MainComponent.vue"),
        },
        {
          path: "/product",
          name: "product",
          component: () => import("../components/front/ProductsComponent.vue"),
        },
        {
          path: "/cart",
          name: "cart",
          component: () => import("../components/front/CartComponent.vue"),
        },
        {
          path: "/login",
          name: "login",
          component: () => import("../components/admin/LoginComponent.vue"),
        },
      ],
    },
    // {
    //   path: "/login",
    //   name: "login",
    //   component: () => import("../components/admin/LoginComponent.vue"),
    // },
    {
      path: "/admin",
      name: "admin",
      component: () => import("../views/AdminView.vue"),
      children: [
        {
          path: "/admin/products",
          name: "products",
          component: () => import("../components/admin/ProductsComponent.vue"),
        },
        {
          path: "/admin/orders",
          name: "orders",
          component: () => import("../components/admin/OrdersComponent.vue"),
        },
        {
          path: "/admin/coupon",
          name: "coupon",
          component: () => import("../components/admin/CouponComponent.vue"),
        },
        {
          path: "/admin/article",
          name: "article",
          component: () => import("../components/admin/ArticleComponent.vue"),
        },
      ],
    },
  ],
});

export default router;
