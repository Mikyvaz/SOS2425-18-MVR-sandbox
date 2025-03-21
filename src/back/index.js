import dataStore from "nedb";


const BASE_API = "/api/v1";

let db = new dataStore();

let initialContacts = [
    {
        name: "peter",
        phone: 123456
    },
    {
        name: "pablo",
        phone: 789654
    }
];


db.find({},(err,contacts)=>{
    if (contacts.length < 1){
        db.insert(initialContacts);
    }
});

function loadBackend(app){
    app.get(BASE_API+"/contacts",(request,response)=>{
        console.log("New GET to /contacts");
                
        db.find({},(err,contacts)=>{
            response.send(JSON.stringify(contacts.map((c)=>{
                delete c._id;
                return c;
            }),null,2));
        });

    });
    
    
    app.post(BASE_API+"/contacts",(request,response)=>{
    
        console.log("POST to /contacts");
        console.log(`<${request.body}>`);
    
        let newContact = request.body;
        
        db.insert(newContact);
    
        response.sendStatus(201);
    });
        
}



export { loadBackend };
