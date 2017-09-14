import Ajax from './ajax';

// BookList View Controller
class BookList {
  constructor() {
    this.url = '/books';
    this.books = [];
  }

  // books 객체의 마지막 id에 1을 더한 값 취득
  get lastBookId() {
    return !this.books.length ? 1 : Math.max(...this.books.map(({ id }) => id)) + 1;
  }

  // If a class method does not use this, it can safely be made a static function.
  static makeHtmlTableRow({ id, title, author, price, editable }) {
    let res = '';
    // editable의 값이 'true'인 경우, true로 변경
    const isEditable = editable || (editable === 'true');

    if (isEditable) {
      res = `<tr class="row-${id}">
        <th>${id}</th>
        <td><input type="text" class="form-control" name="title" value="${title}"></td>
        <td><input type="text" class="form-control" name="author" value="${author}"></td>
        <td><input type="text" class="form-control" name="price" value="${price}"></td>
        <td>
          <div class="btn-group" role="group">
            <button type="button" class="btn btn-default" data-item="${id}" data-type="save">
              <i class="fa fa-check" aria-hidden="true"></i>
            </button>
            <button type="button" class="btn btn-default" data-item="${id}" data-type="cancel">
              <i class="fa fa-ban" aria-hidden="true"></i>
            </button>
            <button type="button" class="btn btn-default" data-item="${id}" data-type="delete">
              <i class="fa fa-trash-o" aria-hidden="true"></i>
            </button>
          </div>
        </td>
      </tr>`;
    } else {
      res = `<tr class="row-${id}">
        <th>${id}</th>
        <td>${title}</td>
        <td>${author}</td>
        <td>${(price * 1).toLocaleString()}</td>
        <td>
          <div class="btn-group" role="group">
            <button type="button" class="btn btn-default" data-item="${id}" data-type="edit">
              <i class="fa fa-pencil" aria-hidden="true"></i>
            </button>
            <button type="button" class="btn btn-default" data-item="${id}" data-type="delete">
              <i class="fa fa-trash-o" aria-hidden="true"></i>
            </button>
          </div>
        </td>
      </tr>`;
    }
    return res;
  }

  bindBooksToDom() {
    document.querySelector('tbody').innerHTML = this.books.map(({ id, title, author, price, editable }) => BookList.makeHtmlTableRow({ id, title, author, price, editable })).join('');
  }

  // bookList view 초기화
  init() {

  }

  bindEvent() {
    // Add 버튼 이벤트 핸들러
    // books 배열에 내용이 비어 있는 새로운 book 객체를 추가한다
    document.getElementById('add').addEventListener('click', () => {
    });

    // edit / save / delete 버튼 이벤트 핸들러
    document.querySelector('tbody').addEventListener('click', e => {
      // 이벤트 타킷이 edit / save / delete 버튼이 아니면 처리 종료
      if (!e.target || e.target.nodeName !== 'BUTTON') return;

      // 이벤트를 발생시킨 버튼이 소속된 book의 id
      const targetId = e.target.dataset.item * 1;
      // 이벤트를 발생시킨 버튼의 타입 (edit / save / delete)
      const { type } = e.target.dataset;

      switch (type) {
        // edit 버튼 이벤트 핸들러
        case 'edit': {
          break;
        }
        // save 버튼 이벤트 핸들러
        case 'save': {
          break;
        }
        // cancel 버튼 이벤트 핸들러
        case 'cancel': {
          break;
        }
        // delete 버튼 이벤트 핸들러
        case 'delete': {
          break;
        }
        default:
          break;
      }
    });
  }
}
