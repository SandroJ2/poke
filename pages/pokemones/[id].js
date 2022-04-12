import Image from "next/image"
import Link from "next/link"
import {useRouter} from "next/router"

const Pokemon = ({ data })=>{
    const router = useRouter()
    console.log(router)

    if (router.isFallback) {
        return <p>Cargando</p>
    }

    return(
        <div>
            <h1>{data.name} numero #{data.id}</h1>
            <Image src={data.sprites.front_default} width={400} height={400} />
            {/* PARA CARGAR ESTA IMAGEN HAY QUE AGREGAR LA PROPIEDAD IMAGE EN EL ARCHIVO NEXT.CONFIG.JS
            (REVISAR EL ARCHIVO SI SE OLVIDA) */}
            <Link href={"/"}>Volver al inicio</Link>
        </div>
    )
}

export default Pokemon

export const getStaticProps = async ({ params })=>{
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.id}`)
    const data = await response.json()

    return { props: { data } }/* TODO ESTE OBJETO DE PROPS SE LE VA A PASAR AL COMPONENTE "POKEMON
    DE ARRIBA" */
}

export const getStaticPaths = async () =>{
    const paths = [
        { params: { id: "1" } },
        { params: { id: "2" } },

    ]
    return {
        paths,
        fallback: true,/* EN FALSO ES QUE SOLO GENERA HTML PARA LOS ARCHIVOS ESPECIFICADOS EN 
        EL ARRAY PATH, Y EN TRUE INTENTARA RENDERIZAR LA PAGINA DE MANERA  */
    }
}

/* export const getServerSideProps = async ({ params })=>{
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.id}`)
    const data = await response.json()

    return { props: { data } }
} */