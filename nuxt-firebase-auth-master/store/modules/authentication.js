import firebase, {
  auth,
  GoogleProvider,
  FacebookProvider,
  TwitterProvider
} from "@/plugins/fireinit.js";

const state = () => ({
  user: null
});

const getters = {
  activeUser(state, getters) {
    return state.user;
  }
};

const mutations = {
  setUser(state, payload) {
    state.user = payload;
  }
};

const actions = {
  autoSignIn({ commit }, payload) {
    commit("setUser", payload);
  },
  signInWithGoogle({ commit }) {
    return new Promise((resolve, reject) => {
      auth.signInWithRedirect(GoogleProvider);
      resolve();
    });
  },
  signInWithFacebook({ commit }) {
    console.log(FacebookProvider);
    auth
      .signInWithRedirect(FacebookProvider)
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.log(err);
      });
  },
  signInWithTwitter({ commit }) {
    console.log(TwitterProvider);
    auth
      .signInWithRedirect(TwitterProvider)
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.log(err);
      });
  },
  signOut({ commit }) {
    auth
      .signOut()
      .then(() => {
        commit("setUser", null);
      })
      .catch(err => console.log(error));
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};

// const authentication = {
//   state: {
//     user: null
//   },
//   getters: {
//     activeUser: (state, getters) => {
//       return state.user;
//     }
//   },
//   mutations: {
//     setUser(state, payload) {
//       state.user = payload;
//     }
//   },
//   actions: {
//     autoSignIn({ commit }, payload) {
//       commit("setUser", payload);
//     },

//     signInWithGoogle({ commit }) {
//       return new Promise((resolve, reject) => {
//         auth.signInWithRedirect(GoogleProvider);
//         resolve();
//       });
//     },
//     signInWithFacebook({ commit }) {
//       console.log(FacebookProvider);
//       auth
//         .signInWithRedirect(FacebookProvider)
//         .then(result => {
//           console.log(result);
//         })
//         .catch(err => {
//           console.log(err);
//         });
//     },
//     signInWithTwitter({ commit }) {
//       console.log(TwitterProvider);
//       auth
//         .signInWithRedirect(TwitterProvider)
//         .then(result => {
//           console.log(result);
//         })
//         .catch(err => {
//           console.log(err);
//         });
//     },
//     signOut({ commit }) {
//       auth
//         .signOut()
//         .then(() => {
//           commit("setUser", null);
//         })
//         .catch(err => console.log(error));
//     }
//   }
// };

// const location = {
//   state: {
//     currentLocation: {}
//   },
//   getters: {
//     getCurrentLocation: function(state) {
//       return state.currentLocation;
//     }
//   },
//   mutations: {
//     setCurrentLocation: function(state, updatedLocation) {
//       state.currentLocation = updatedLocation;
//       console.log("location work" + state.currentLocation)
//     }
//   },
//   actions: {
//     setCurrentLocation: function({ commit }, updatedLocation) {
//       commit("setCurrentLocation", updatedLocation);
//     }
//   }
// };