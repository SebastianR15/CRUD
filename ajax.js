(() => {
    const xhr = new XMLHttpRequest();
    $xhr = document.getElementById("xhr")
    $fragment = document.createDocumentFragment();

    xhr.addEventListener("readystatechange", e => {
        if(xhr.readyState !== 4) return;

        if(xhr.status >= 200 && xhr.status < 300){
            //console.log(xhr);
            //console.log("Exito");
            let json  = JSON.parse(xhr.responseText);
            console.log(json)

            json.forEach(el => {
                const $li = document.createElement("li");
                $li.innerHTML = `${el.name} -- ${el.email} -- ${el.phone}`;
                $fragment.appendChild($li);
            });
            $xhr.appendChild($fragment);

        }else{
            //console.log(xhr);
            //console.log("Error")
        }
    });

    xhr.open("GET","https://jsonplaceholder.typicode.com/users")

    xhr.send();
})();

(() => {
    $fetch = document.getElementById("fetch")
    $fragment = document.createDocumentFragment();

    fetch("https://jsonplaceholder.typicode.com/users")
    .then((res) => {
        return res.ok ? res.json() : Promise.reject(res);
    })
    .then(json => {
    
        json.forEach(el => {
            const $li = document.createElement("li");
            $li.innerHTML = `${el.name} -- ${el.email} -- ${el.phone}`;
            $fragment.appendChild($li);
        });
        $fetch.appendChild($fragment);
    })
    .catch((err) => {
        //console.log("Esto es un error" (err));

    })
    .finally(() => console.log("Esto se ejecutara siempre"));

})()


(() =>  {
   const $fetchAsync = document.getElementById("fetch-async")
    $fragment = document.createDocumentFragment();

    async function getData(){
        try{
            let res = await fetch("https://jsonplaceholder.typicode.com/users")
            json =res.json();

            console.log(res, json)

            if(!res.ok) throw {status: res.status, statusText: res.statusText};

            json.forEach(el => {
                const $li = document.createElement("li");
                $li.innerHTML = `${el.name} -- ${el.email} -- ${el.phone}`;
                $fragment.appendChild($li);
            });
            $fetchAsync.appendChild($fragment);
        }catch(err){
            let message = err.statusText || "Ocurrio un Error";
            $fetchAsync.innerHTML = `Error ${err.status}, ${message}`;
        }finally{

        }
    }

    getData();
   
})()

(() => {
    const $axios = document.getElementById("axios")
    $fragment = document.createDocumentFragment();

    axios.get("https://jsonplaceholder.typicode.com/users")
    .then(res => {
        console.log(res);
        let json = res.data;
        json.forEach(el => {
            const $li = document.createElement("li");
            $li.innerHTML = `${el.name} -- ${el.email} -- ${el.phone}`;
            $fragment.appendChild($li);

            $axios.appendChild($fragment);
        });
    })
    .catch(err => {
        let message = err.response.statusText || "Ocurrio un Error";
        $axios.innerHTML = `Error ${err.status}, ${message}`;
    })
    .finally(()=>{
        console.log("Esto se ejectura siempre")
    })
})()

(()=> {
    const $axiosAsync = document.getElementById("axios-async")
    $fragment = document.createDocumentFragment();


    async function getData(){
        try{
            let res = await axios.get("https://jsonplaceholder.typicode.com/users")
            json = await res.data;

            json.forEach(el => {
                const $li = document.createElement("li");
                $li.innerHTML = `${el.name} -- ${el.email} -- ${el.phone}`;
                $fragment.appendChild($li);
    
                $axiosAsync.appendChild($fragment);
            });
        }catch(err){
            let message = err.response.statusText || "Ocurrio un Error";
        $axiosAsync.innerHTML = `Error ${err.response.status}, ${message}`;
        }finally{
            console.log("Esto se ejectura siempre")
        }
    }

    getData();
})()