const vscode = require('vscode')

const UserStatus = {
  signin: 1,
  signout: 2
}

class LuoguManager {
  constructor () {
    this.user = null
    this.userStatus = UserStatus.signout
  }

  signIn () {
    const promist = new Promise((resolve, reject) => {
      
    })
  }

  signOut () {
    this.user = null
    this.userStatus = UserStatus.signout
  }
}


export const luoguManager = new LuoguManager()