# readme

### **to run:**
```sh
$ node server.js
```

### **testing with Postman**
when forming the body to test in postman, use 'Body > raw'. Using form-data spits a 415 code.
```json
{
    "name": "Victor",
    "password": "notagoodpassword"
}
```