import { useParams } from 'react-router-dom'

export function Component() {
    const { '*': slug } = useParams()
    return (
        <div>Dashboard Params {slug} </div>
    )
}
