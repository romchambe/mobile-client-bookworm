import { buildAddress } from './buildAddress'

class noteApi {
  static postCreateNote(payload, client) {
    const address = buildAddress(client, 'notes')
    const date = new Date;
    
    var title = 'Draft - ' + date.toLocaleDateString('fr-FR') + ' ' + date.toLocaleTimeString('fr-FR').substring(0,5)
    var content = payload.content ? payload.content : null

    const request = new Request(address, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json', 
        'AUTHORIZATION': `Bearer ${payload.jwt},`
      }), 
      body: JSON.stringify({title: title, content: content})
    });

    return fetch(request).then(response => {
      return response.json();
    });
  }

  static getNotesIndex(payload, client) {
    const address = buildAddress(client, 'notes_index')

    
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

  static putUpdateNote(payload, client) {
    const address = buildAddress(client, 'notes')
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

export default noteApi