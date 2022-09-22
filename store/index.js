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
  //SORT LIST
  sortFirstName(state) {
    state.all_users.sort((x, y) => {
      if (x.firstName === y.firstName) return 0;
      return x.firstName > y.firstName ? 1 : -1;
    });
  },
  sortLastName(state) {
    state.all_users.sort((x, y) => {
      if (x.lastName === y.lastName) return 0;
      return x.lastName > y.lastName ? 1 : -1;
    });
  },
  sortDueDate(state) {
    state.all_users.sort((x, y) => {
        x = new Date(x.paidOn);
        y = new Date(y.paidOn)
        return y - x;
    });
  },
  sortLogin(state) {
    state.all_users.sort((x, y) => {
        x = new Date(x.lastLogin);
        y = new Date(y.lastLogin);
      return y - x;
    });
  },
  sortDefault(state) {
    state.all_users.sort((x, y) => {
      if (x.id === y.id) return 0;
      return x.id > y.id ? 1 : -1;
    });
  },
};

export const actions = {
  async get_all_users({ state }) {
    state.filterType = "";
    const data = await this.$axios.$get(`/users/${state.candidateId}`);
    state.all_users = data.data;
    return data;
  },

  async status_changer({ commit }, { type, id }) {
    if (type == "activate") {
      const data = await this.$axios.$patch(`/activate-user/${id}`);
      return data;
    } else if (type == "deactivate") {
      const data = await this.$axios.$patch(`/deactivate-user/${id}`);
      return data;
    } else if (type == "remove") {
      const data = await this.$axios.$delete(`/remove-user/${id}`);
      return data;
    }
  },
};

export const strict = false;
