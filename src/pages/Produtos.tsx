import { useEffect } from "react";

function Produtos() {

    useEffect(() => {
        document.title = 'Produtos'
    }, [])
    return (
        <>
            <h3>Produtos</h3>
        </>
    )
}

export default Produtos;