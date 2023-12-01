// Placeholder functions for now

function requireUser(req, res) {
  return {
    redirect: {},
  }
}

function eligibility(req, res) {
  return Promise.resolve({})
}

const User = {
  eligibility,
  requireUser,
}

export default User
