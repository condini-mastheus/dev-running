import axios from 'axios'

const Api = baseURL => {
  const client = axios.create({ baseURL: baseURL })
  
  const getAuthHeader = () => {
    const token = localStorage.getItem('token')
    return {
      headers: { Authorization: `Bearer ${token}` }
    }
  }
  
  const create = (endpoint, data) => client.post(endpoint, data, getAuthHeader())
  const read = endpoint => client.get(endpoint, getAuthHeader())
  const update = (endpoint, data) => client.patch(endpoint, data, getAuthHeader())
  const del = endpoint => client.delete(endpoint, getAuthHeader())  

  const auth = (endpoint, user) => client.post(endpoint, user)

  return {
    getUser: id => read(`/users/${id}`),
    updateUser: data => update(`/users/${data.id}`, data),
    createUser: data => create(`/users/`, data),

    getRuns: () => read(`/runs`),
    removeRun: id => del(`/runs/${id}`),
    createRun: data => create(`/runs/`, data),
    updateRun: data => update(`/runs/${data.id}`, data),

    authUser: user => auth(`/users/login`, user)
  }
}

export default Api