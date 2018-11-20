import { buildAddress } from './buildAddress'

class userApi {  
  static postCreateUser(payload, client) {
    const address = buildAddress(client, 'registrations')
    const request = new Request(address, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }), 
      body: JSON.stringify(payload)
    });

    return fetch(request).then(response => {
      return response.json();
    })
  } 
}

export default userApi;  