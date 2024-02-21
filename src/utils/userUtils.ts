// Placeholder functions for now
// Could be converted to a class

function requireUser(req, res) {
  return {
    redirect: false,
  }
}

function eligibility(req, res) {
  return Promise.resolve({ redirect: false })
}

const User = {
  eligibility,
  requireUser,
}

export default User
