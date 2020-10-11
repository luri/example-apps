import luri from "./luri.js";

let u = null;

class AuthManager {;

  login(user) {
    u = user;

    luri.emit("logged-in", user);
  }

  logout() {
    let x = u;

    u = null;
    
    luri.emit("logged-out", x);
  }

  logged() {
    return !!u;
  }

  user() {
    return u;
  }

  throwable = Error

  require(message) {
    if (!this.logged()) {
      throw new this.throwable(message);
    }
  }
}

let auth = new AuthManager;

export default auth;