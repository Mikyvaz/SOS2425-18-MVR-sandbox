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
        console.log(`<${JSON.stringify(request.body,null,2)}>`);
    
        let newContact = request.body;
        
        db.insert(newContact);
    
        response.sendStatus(201);
    });
   
    app.delete(BASE_API+"/contacts/:name",(request,response)=>{
    
        let name = request.params.name;
        console.log(`DELETE to /contacts/${name}`);
            
        db.remove({ "name" : name},{},(err,numRemoved)=>{
            if(err){
                response.status(500).send("Error code 01 (please contact admin)");                
                console.error(`ÈRROR: ${err}`);
            }else{
                if(numRemoved >= 1){
                    response.sendStatus(200);
                }else{
                    response.sendStatus(404);
                }
            }
        });
    
    });
   

    app.get(BASE_API+"/docs",(request,response)=>{
        response.redirect("https://documenter.getpostman.com/view/359472/2sAYkGLezF");
    });

}



export { loadBackend };
