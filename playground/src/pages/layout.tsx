import { Outlet } from 'react-router-dom';

export function Component() {
    return (
        <>
            <div>Root Layout</div>
            <Outlet />
        </>
    )
}
