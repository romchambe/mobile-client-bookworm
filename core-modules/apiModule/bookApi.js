import { buildAddress } from './buildAddress'

class bookApi {
  static postBook(payload, client) {
    const address = buildAddress(client, 'books')
    const date = new Date;
    
    var title = 'Draft - ' + date.toLocaleDateString('fr-FR') + ' ' + date.toLocaleTimeString('fr-FR').substring(0,5)
    var content = payload.content ? payload.content : null

    const request = new Request(address, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json', 
        'AUTHORIZATION': `Bearer ${payload.jwt},`
      }), 
      body: JSON.stringify({title: title, author: author})
    });

    return fetch(request).then(response => {
      return response.json();
    });
  }

  static getBooks(payload, client) {
    const address = buildAddress(client, 'books')

    
    const request = new Request(address, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        'AUTHORIZATION': `Bearer ${payload.jwt},`
      })
    });

    return fetch(request).then(response => {
      return response.json();
    });
  }

  static updateBook(payload, client) {
    const address = buildAddress(client, 'books')
    const request = new Request(address, {
      method: 'PUT',
      headers: new Headers({
        'Content-Type': 'application/json', 
        'AUTHORIZATION': `Bearer ${payload.jwt},`
      }), 
      body: JSON.stringify({
        id: payload.id,
        title: payload.title,
        book: payload.book,
        content: payload.content,

      })
    });

    return fetch(request).then(response => {
      return response.json();
    });
  }
}

export default bookApi