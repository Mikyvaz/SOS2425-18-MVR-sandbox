<svelte:head>
    <title>Contact list</title>
</svelte:head>
<script>
// @ts-nocheck
    import { dev } from "$app/environment"; 

    let DEVEL_HOST = "http://localhost:16078";

    let API = "/api/v1/contacts";

    if(dev)
        API = DEVEL_HOST + API;

    import { onMount } from "svelte";
    import { Button, Table } from '@sveltestrap/sveltestrap';

    let contacts = [];
    let result = "";
    let resultStatus = "";
    let newContactName;
    let newContactPhone;
    
    
    async function getContacts(){
        resultStatus = result = "";
        try {
            const res = await fetch(API,{method:"GET"});
  
            const data = await res.json();
            result = JSON.stringify(data,null,2);

            contacts = data;
            console.log(`Response received:\n${JSON.stringify(contacts,null,2)}`);

        } catch (error){
            console.log(`ERROR:  GET from ${API}: ${error}`);
        }


    }

    async function deleteContact(name){
        resultStatus = result = "";
        try {
            const res = await fetch(API+"/"+name,{method:"DELETE"});
  
            const status = await res.status;
            resultStatus = status;

            if(status == 200){
                console.log(`Contact ${name} deleted`);
                getContacts();
            } else {
                console.log(`ERROR deleting contact ${name}: status received\n${status}`);
            }


        } catch (error){
            console.log(`ERROR:  GET from ${API}: ${error}`);
        }


    }


    async function createContact(){
        resultStatus = result = "";
        try {
            const res = await fetch(API,{
                method:"POST",
                headers:{
                    "Content-Type" : "application/json"
                },
                body:JSON.stringify({ 
                    name: newContactName,
                    phone: newContactPhone
                })
            });
  
            const status = await res.status;
            resultStatus = status;
            if(status == 201){
                console.log(`Contact created`);
                getContacts();
            } else {
                console.log(`ERROR creating contact: status received\n${status}`);
            }

        } catch (error){
            console.log(`ERROR:  GET from ${API}: ${error}`);
        }


    }




    onMount(async () => {
        getContacts();
    })

</script>

<h2>Contact List</h2>
<Table>
    <thead>
        <tr>
            <th>Name</th>
            <th>Phone</th>
            <th> Actions </th>    
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>
                <input bind:value={newContactName}>
            </td>
            <td>
                <input bind:value={newContactPhone}>
            </td>
            <td>
                <Button color="secondary" on:click={createContact}>Create</Button>
            </td>
        </tr>
        {#each contacts as contact}
            <tr>
                <td>
                    {contact.name}
                </td>
                <td>
                    {contact.phone}
                </td>
                <td>
                    <Button color="danger" on:click={() => {deleteContact(contact.name)}}>Delete</Button>

                </td>

            </tr>
        {/each}
    </tbody>
</Table>


