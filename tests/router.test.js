const session = require('supertest-session');
const app = require('../index');
const request  = require('supertest');

let token;
var idTodo;

// test fonctionnel
describe('POST /login', () => {
    test('devrait connecter un utilisateur', async () => {

        const user = {
            name: "flo",
            password: "flo"
        };

        // faire la requete pour l'authentification
        const response = await request(app)
            .post('/api/login')
            .send(user);
        
        expect(response.status).toBe(200);

        // // Parser le résultat
        const jsonResponse = response.body;

        // console.log(jsonResponse.token);

        // // Vérifier le message et le token
        expect(jsonResponse).toHaveProperty('token');

        // // Stocker le token pour les tests suivants
        token = jsonResponse.token;
    }, 10000);
});

// test unitaire et d'integration
describe('POST /todos', () => {
    test('should create a todo', async () => {
        const todos = {
            username: "test todo",
            reminder: "weekly",
            completed: false
        }

        const response = await request(app)
            .post('/api/todos/')
            .send(todos)
            .set('Authorization', 'Bearer ' + token);
        
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('username', 'test todo');
    });
});

// describe('GET /todos', () => {
//     it('devrait retourner tous les todos', async () => {
//         const response = await request(app)
//             .get('/api/todos/')
//             .set('Authorization', 'Bearer ' + token);
        
//         expect(response.status).toBe(200);

//         if(response.status == 200){
//             console.log(response.body);
//             idTodo = response.body[1]._id;
//         }else{
//             const jsonResponse = JSON.parse(response.text);
//             throw jsonResponse.error;
//         }
//     });
// });

// describe('PUT /todo/id', () => {
//     it("devrait modifier un todo", async () => {
//         const response = await request(app)
//             .put('/api/todos/' + idTodo)
//             .set('Authorization', 'Bearer ' + token)
//             .send({ completed: false });

//         expect(response.status).toBe(200);

//         const jsonResponse = JSON.stringify(response.text);
        
//         if(response.status == 200){
//             console.log("Résultat : " + response.text);
//         }else{
//             throw jsonResponse.error;
//         }   
//     });
// });

describe('Security Tests', () => {
    test('should prevent SQL Injection in login', async () => {
        const response = await request(app)
            .post('/api/login')
            .send({ name: "'; DROP TABLE users; --", password: 'password' });
        expect(response.status).not.toBe(200);
    });
});

describe('Security Tests', () => {
    test('should prevent XSS in comments', async () => {
        const todos = {
            username: '<script>alert("XSS")</script>',
            reminder: '<script>alert("XSS")</script>',
            completed: '<script>alert("XSS")</script>',
        };

      const response = await request(app)
        .post('/api/todos/')
        .send(todos)
        .set('Authorization', 'Bearer ' + token);
      expect(response.status).not.toBe(200);
    });
});
  


