export default class Booklist {
  static get(url) {
    return new promise((resolve, reject) => {
      const req = new XMLHttpRequest();
      req.open('GET', url);
      req.send(null);

      req.onreadystatechange = function() {
        if (req.readyState === XMLHttpRequest.DONE) {
          if (req.status === 200) {
            resolve(req.response);
          } else {
            reject(req.statusText);
          }
        } 
      }
    });
  }
}

// // 리스트 가져오기
// .addEventListener( () => {
//   const userid = document.querySelector('#userid').value;
//   Ajax.get(`/users/${userid}`)
//   .then(res => {
//     let users = JSON.stringify(JSON.parse(res), null, 2);
//     contents.innerHTML = users;
//   })
//   .catch((e) => console.log(e));
// });