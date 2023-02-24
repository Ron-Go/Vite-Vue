<template lang="">
  <div class="body__container d-flex">
    <aside class="aside d-flex flex-column py-5 fixed-top">
      <h1 class="aside__logo ml-3">
        <a href="" class="aside__logo__link">logo</a>
      </h1>
      <nav class="mb-auto">
        <ul class="aside__list mb-0">
          <li class="aside__list__item">
            <router-link
              class="item__link d-flex py-1 fw-bold"
              to="/admin/products"
            >
              <span class="material-symbols-outlined icon--pill me-3">
                inventory_2
              </span>
              Products
            </router-link>
          </li>
          <li class="aside__list__item">
            <router-link
              class="item__link d-flex py-1 fw-bold"
              to="/admin/orders"
            >
              <span class="material-symbols-outlined icon--pill me-3">
                order_approve
              </span>
              Orders
            </router-link>
          </li>
          <li class="aside__list__item">
            <router-link
              class="item__link d-flex py-1 fw-bold"
              to="/admin/coupon"
            >
              <span class="material-symbols-outlined icon--pill me-3">
                local_activity
              </span>
              Coupon
            </router-link>
          </li>
          <li class="aside__list__item">
            <router-link
              class="item__link d-flex py-1 fw-bold"
              to="/admin/article"
            >
              <span class="material-symbols-outlined icon--pill me-3">
                article
              </span>
              Article
            </router-link>
          </li>
          <li class="aside__list__item">
            <a
              class="item__link d-flex py-1 fw-bold"
              href=""
              @click.prevent="status.logout()">
              <span class="material-symbols-outlined icon--pill me-3">
                logout
              </span>
              Logout
            </a>
          </li>
        </ul>
      </nav>
    </aside>
    <main class="position-relative ms-auto me-3" ref="contentDom">
      <!-- adminStore、statusStore實體傳入router-view -->
      <!-- <router-view :store="{admin, status}"></router-view> -->
      <router-view></router-view>
    </main>
  </div>
</template>

<script setup></script>

<style lang="scss"></style>
