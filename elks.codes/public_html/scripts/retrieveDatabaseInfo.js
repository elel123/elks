export async function retrieveActivityDate(){
    return await fetch(`https://www.elks.codes/server/api/activity`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
    }).then(async (res) => {
        const json = await res.json();
        // successful response, return predictions
        if(res.status === 200){
            alert(JSON.stringify(json));
            return json;
        // error occurred 
        }  else {
            alert(res.status);
        }
    })
}

export function test(){
    alert("Hello");
    return '[{"first": "Amrit", "last": "Singh"}]';
}