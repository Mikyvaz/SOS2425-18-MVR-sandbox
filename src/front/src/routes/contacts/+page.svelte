
<script>
// @ts-nocheck
    let API = "http://localhost:16078/api/v1/contacts";
    import { onMount } from "svelte";

    let contacts = [];
    let result = "";
    let resultStatus = "";
    
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

    onMount(async () => {
        getContacts();
    })

</script>

<h2>Contact List</h2>
<table>
    <thead>
        <tr>
            <th>Name</th>
            <th>Phone</th>
            <th> Actions </th>    
        </tr>
    </thead>
    <tbody>
        {#each contacts as contact}
            <tr>
                <td>
                    {contact.name}
                </td>
                <td>
                    {contact.phone}
                </td>
                <td>

                </td>

            </tr>
        {/each}
    </tbody>
</table>