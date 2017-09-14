import Ajax from './ajax';

export default class BookList {
  constructor() {
    this.url = '/books';
    this.books = [];
  }
  // books 객체의 마지막 id에 1을 더한 값 취득
  get lastBookId() {
    return !this.books.length ? 1 : Math.max(...this.books.map(({ id }) => id)) + 1;
  }

  static makeHtmlTableRow({ id, title, author, price, editable }) {
    let res = '';
    // editable의 값이 'true'인 경우, true로 변경
    const isEditable = editable || (editable === 'true');
    
    if (isEditable) {
      res =
        `<tr class="row-${id}">
          <th scope="row">${id}</th>
          <td>
            <div class="input-group">
              <input type="text" id="title" class="form-control" placeholder="Title">
            </div>
          </td>
          <td>
            <div class="input-group">
              <input type="text" id="author" class="form-control" placeholder="Author">
            </div>
          </td>
          <td>
            <div class="input-group">
              <input type="text" id="price" class="form-control" placeholder="Price">
            </div>
          </td>
          <td>
            <button type="button" class="btn fa fa-floppy-o" data-item="${id}" data-type="save"></button>
            <button type="button" class="btn fa fa-ban" data-item="${id}" data-type="cancel"></button>
            <button type="button" class="btn fa fa-trash-o" data-item="${id}" data-type="delete"></button>
          </td>
        </tr>`
        console.log(id);
    } else {
      res =
      `<tr class="row-${id}">
        <th scope="row">${id}</th>
        <td>${title}</td>
        <td>${author}</td>
        <td>${price}</td>
        <td>
          <button type="button" class="btn fa fa-pencil" data-item="${id}" data-type="edit"></button>
          <button type="button" class="btn fa fa-trash-o" data-item="${id}" data-type="delete"></button>
        </td>
      </tr>`
    }
    return res;
  }
  
  // html 렌더
  bindBooksToDom() {
    document.querySelector('tbody').innerHTML = this.books.map(({ id, title, author, price, editable }) => BookList.makeHtmlTableRow({ id, title, author, price, editable })).join('');
    //console.log('bindbooks');
  }

  init() {
    // booklist DB에서 데이터를 취득한 후, 렌더링 
    console.log('init');
    Ajax.get(this.url).then( data => {
      this.books = JSON.parse(data);
      this.bindBooksToDom();
      this.bindEvent();
    });
  }


  bindEvent() {
    // Add 버튼 이벤트 핸들러
    // books 배열에 내용이 비어 있는 새로운 book 객체를 추가한다
    document.getElementById('add').addEventListener('click', () => {
      this.books.push({ id: this.lastBookId, editable: true });
      this.bindBooksToDom();
      console.log('bindevent');
    });

    // edit / save / delete 버튼 이벤트 핸들러
    document.querySelector('tbody').addEventListener('click', e => {
      // 이벤트 타킷이 edit / save / delete 버튼이 아니면 처리 종료
      if (!e.target || e.target.nodeName !== 'BUTTON') return;

      // 이벤트를 발생시킨 버튼이 소속된 book의 id
      const targetId = parseInt(e.target.dataset.item);

      // 이벤트를 발생시킨 버튼의 타입 (edit / save / delete)
      const { type } = e.target.dataset;

      switch (type) {
        // edit 버튼 이벤트 핸들러
        case 'edit': {
          break;
        }
        // save 버튼 이벤트 핸들러
        case 'save': {
          const title  = document.querySelector('#title').value;
          const author = document.querySelector('#author').value;
          const price  = document.querySelector('#price').value;
          const data   = { id: Math.max(...this.books.map(({ id }) => id)), title: title, author: author, price: price, editable: false, status: '' };  // id를 this.books에 있는 id값 중 가장 큰 값을 가져온다.
          Ajax.post(this.url, data).then( () => this.init() );
          console.log('save');
          break;
        }
        // cancel 버튼 이벤트 핸들러
        case 'cancel': {
          break;
        }
        // delete 버튼 이벤트 핸들러
        case 'delete': {
          Ajax.delete(this.url, targetId).then( () => this.init() );
          break;
        }
        default:
          break;
      }
    });
  }
}
