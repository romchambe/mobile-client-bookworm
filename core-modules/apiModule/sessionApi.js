import { buildAddress } from './buildAddress'

class sessionApi {
  static postLogin(credentials, client) {
    const address = buildAddress(client, 'login');

    const request = new Request(address, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }), 
      body: JSON.stringify({login: credentials})
    });

    return fetch(request).then(response => {
      
      return response.json();
      
    });
  }

  static postFbLogin(payload,client) {
    const address = buildAddress(client, 'fb_login')
    const request = new Request(address, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }), 
      body: JSON.stringify({login: payload})
    });

    return fetch(request).then(response => {
      if (!response.ok) {
        throw new Error('FB credentials request failed');
      } 
      return response.json();
      
    });
  } 

  static getFbUserInfo(token) {
    return fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,about,picture`).then(response => {
      if (!response.ok) {
        throw new Error('Facebook API failed');
      }
      return response.json();
    })
  }
}

export default sessionApi;  