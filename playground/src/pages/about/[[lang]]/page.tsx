import { useParams } from 'react-router-dom'

export function Component() {
    const { lang } = useParams()
    return (
        <div>About {lang}</div>
    )
}
