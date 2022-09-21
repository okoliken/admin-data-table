<template>
  <v-app>
    <v-main>
      <v-container class="mt-12">
        <div class="data-table__header">
          <h3>Table Heading</h3>
        </div>
        <v-tabs class="tab__liner">
          <v-tab>All</v-tab>
          <v-tab>Paid</v-tab>
          <v-tab>Unpaid</v-tab>
          <v-tab>Overdue</v-tab>
        </v-tabs>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "DefaultLayout",
  data() {
    return {};
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Inter&display=swap");
.v-application {
  background-color: #f2f0f9 !important;
  font-family: "Inter";
}
.v-tabs .theme--light {
  background-color: #f2f0f9 !important;
}
.v-tab {
  text-transform: capitalize !important;
  font-weight: bold;
  font-size: 14px;
  color: #6e6893 !important;
  padding: 0;
}

.data-table__header {
  font-family: "Inter";
  margin-bottom: 8px;
  font-style: normal;
  font-weight: 900;
  font-size: 14px;
  line-height: 17px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #6e6893;
}
.v-tab--active,
.v-tabs-slider {
  color: #25213b !important;
  padding: 0;
  margin: 0;
}
.v-tabs-slider{
  width: 90% !important;
  display: flex;
  align-items: center;
  justify-items: center;
}
.tab__liner {
  border-bottom: 2px solid #c6c2de !important;
  transform: translateY(-1px);
}
</style>
