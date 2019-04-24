import { auth } from '@/plugins/fireinit.js'

export default (context) => {
  const { store } = context

  return new Promise((resolve, reject) => {
    auth.onAuthStateChanged(user => {
      // auth.currentUser.getIdToken(/* forceRefresh */ true)
      //   .then((idToken) => {
      //   // Send token to your backend via HTTPS
      //   // ...
      //     console.log(idToken)
      //   }).catch((error) => {
      //     console.log(error)
      //   })
      console.log('state change login fireauth.js')
      console.log(store)
      store.commit('setUser', user)
      // console.log(user)
      resolve()
    })
  })
}
