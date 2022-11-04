export default class APIService{

    static InsertBill(type, body){
        return fetch(`http://127.0.0.1:5000/addnew/${type}`, {
            'method': 'POST',
            headers : {
                'Content-Type': 'application/json',
            },
            
            body:JSON.stringify(body)
        })
        // .then(response => console.log(response))
        .catch(error => console.log(error)
        )
    }

    static DeleteItem(type, body) {
        return fetch(`http://127.0.0.1:5000/delete/${type}`, {
            'method': 'POST',
            headers : {
                'Content-Type': 'application/json',
            },
            
            body:JSON.stringify(body)
        })
        // .then(response => console.log(response))
        .catch(error => console.log(error)
        )
    }
    
}