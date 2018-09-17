import { buildAddress } from './buildAddress'

class scanApi {
  static postScan(payload,client) {
    const address = buildAddress(client, 'scans')
    
    const date = new Date;
    var filename = 'scan-' + date.toLocaleTimeString('fr-FR').substring(0,5) + '.jpg'

    const data = new FormData();

    data.append('filename', filename)
    data.append('upload', payload.file)

    const request = new Request(address, {
      method: 'POST',
      headers: new Headers({
        'AUTHORIZATION': `Bearer ${payload.jwt}`,
        'Content-Type': 'multipart/form-data'
      }), 
      body: data
    });
    
    return fetch(request).then(response => {
      if (!response.ok) {
        throw new Error({status:response.status});
      } 
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

export default scanApi