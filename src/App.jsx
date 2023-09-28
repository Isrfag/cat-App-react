import './App.css'
import { useState,useEffect } from "react"

const catFactURL = `https://catfact.ninja/fact`
//const cat_EndPointIMG_URL=`https://cataas.com/cat/says/${firstword}hello?json=true`

const CAT_PREFIX_IMAGEURL=`https://cataas.com`

export function App() {

    //Creamos el estado
    const [fact,setFact] = useState ()

    const [imageURL,setImageURL] = useState()

    //Creamos el useEffect que nos va a permitir hacer las llamadas a la api diciendole cuando parar, el segundo paramtero [] es eso
    useEffect(() => {
        fetch(catFactURL)
            .then(res => res.json())
            .then(data => {
                const {fact} = data
                setFact(fact)

                const firstWord =fact.split(' ', 3)
                console.log(firstWord)

                fetch(`https://cataas.com/cat/says/${firstWord}?json=true`)
                    .then(response =>response.json())
                    .then(response => {
                        const {url} = response
                        setImageURL(url)
                    })
            })

    },[])

    /*
    fetch('https://catfact.ninja/fact')
    .then(response =>response.json)
    .then(data =>setCatFact(data.catFact)) ------> PROHIBIDO LOOP INFINITO */

    //Esto es lo que renderiza
    return (
    <main>
    <h1>App de gatitos</h1>
    {fact &&<p>{fact}</p>}
    {imageURL && <img src={`${CAT_PREFIX_IMAGEURL}${imageURL}`} alt={`Image extracted from API using the first word from {fact}`}/>}
    <div> HOLA BB, Eres la más buenorra de la tierra</div>
    </main>
    )
}