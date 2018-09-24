import { buildAddress } from './buildAddress'

class userApi {  
  static postCreateUser(payload, client) {
    const address = buildAddress(client, 'registrations')
    const request = new Request(address, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }), 
      body: JSON.stringify({registration: payload})
    });

    return fetch(request).then(response => {
      if (!response.ok) {
        console.log(JSON.stringify(response))
        throw new Error('Provide a valid email and a 6 character password');
      } else {
        return response.json();
      }
    })
  } 
}

export default userApi;  