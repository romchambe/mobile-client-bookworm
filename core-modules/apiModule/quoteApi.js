import { buildAddress } from './buildAddress'

class quoteApi {
  static postQuote(payload,client) {
    const address = buildAddress(client, 'quotes')
    const {jwt, ...data} = payload


    const request = new Request(address, {
      method: 'POST',
      headers: new Headers({
        'AUTHORIZATION': `Bearer ${jwt}`,
        'Content-Type': 'application/json'
      }), 
      body: JSON.stringify(data)
    });
    console.log(JSON.stringify(data))
    return fetch(request).then(response => {
      return response.json();
    });
  }

  // static getBlobUrl(payload) {
  //   const date = new Date;
  //   var filename = 'Scan - ' + date.toLocaleDateString('fr-FR') + ' ' + date.toLocaleTimeString('fr-FR').substring(0,5)
    
  //   return fetch('/rails/active_storage/direct_uploads', {
  //     method: 'POST',
  //     body: {
  //       blob: {
  //         filename: filename,
  //         content_type: "image/jpeg",
  //         byte_size: payload.size,
  //         checksum: ''
  //       }
  //     }
  //   })
  // }
}

export default quoteApi