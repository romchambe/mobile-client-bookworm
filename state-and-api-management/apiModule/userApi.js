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
        throw new Error({error:response.status});
      };
      return response.json();
    });
  } 
}

export default userApi;  