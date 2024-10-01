import { useParams } from 'react-router-dom'

export function Component() {
    const params = useParams()
    console.log(params);

    return (
        <div>Post Actions</div>
    )
}
