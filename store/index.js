export const state = () => ({
  all_users: [],
  candidateId: "22XkZJQ5i87gvSY",
  filterType: "",
});

export const getters = {
  calculate_amount_payable: (state) => {
    let array_of_amounts = [];
    let initValue = 0;

    state.all_users.map((user) => {
      if (user.paymentStatus !== "overdue") {
        return array_of_amounts.push(user.amountInCents);
      }
    });

    for (var i = 0; i < array_of_amounts.length; i++) {
      initValue += array_of_amounts[i];
    }

    return initValue;
  },
};

export const mutations = {
  mutateFilterType(state, payload) {
    state.filterType = payload;
  },
};

export const actions = {
  async get_all_users({ state }) {
    state.filterType = "";
    const data = await this.$axios.$get(`/users/${state.candidateId}`);
    state.all_users = data.data;
    return data;
  },
};

export const strict = false;
