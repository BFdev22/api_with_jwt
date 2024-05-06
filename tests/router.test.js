const session = require('supertest-session');
const app = require('../index');
const request  = require('supertest');

var token = "";
var idTodo;


// test login
describe('POST /login', () => {
    it('devrait connecter un utilisateur', async () => {

        // faire la requete pour l'authentification
        const response = await request(app)
            .post('/api/login')
            .send({ name: "flo", password: "flo" });
        expect(response.status).toBe(200);

        // parser le resultat
        const jsonResponse = JSON.parse(response.text);

        // message en fonction du resultat
        if(response.status == 200){
            token = jsonResponse.token;
            console.log("Authentification réussie")
        }else{
            console.log("Email ou mot de passe incorrecte");
        }
    });
});

describe('GET /todos', () => {
    it('devrait retourner tous les todos', async () => {
        const response = await request(app)
            .get('/api/todos/')
            .set('Authorization', 'Bearer ' + token);
        
        expect(response.status).toBe(200);

        if(response.status == 200){
            console.log(response.body);
            idTodo = response.body[1]._id;
        }else{
            const jsonResponse = JSON.parse(response.text);
            throw jsonResponse.error;
        }
    });
});

describe('PUT /todo/id', () => {
    it("devrait modifier un todo", async () => {
        const response = await request(app)
            .put('/api/todos/' + idTodo)
            .set('Authorization', 'Bearer ' + token)
            .send({ completed: false });

        expect(response.status).toBe(200);

        const jsonResponse = JSON.stringify(response.text);
        
        if(response.status == 200){
            console.log("Résultat : " + response.text);
        }else{
            throw jsonResponse.error;
        }   
    });
});
