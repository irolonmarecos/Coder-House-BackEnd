const chai = require("chai");
const supertest = require("supertest");
const expect = chai.expect;
const url = "http://localhost:8080";
const agent = supertest(url);


describe('TEST PRODUCTOS',()=>{
    it('Total Productos', async ()=>{
        const response = await agent.get(`/registro`) 
        expect(response.status).to.eql(200);
    }) ;

})