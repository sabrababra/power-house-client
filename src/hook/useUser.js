import { useEffect, useState } from "react"

const useUser = (data) => {
    const [user, setUser] = useState(false);
    const [userLoading, setUserLoading] = useState(true);
    const [userData, setUserData] = useState(data);

    console.log(userData);

    useEffect(() => {
        if (userData?.email) {
            fetch(`https://power-hacks-server.vercel.app/api/user`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    authorization: `Bearer ${userData?.accessToken}`
                },
                body: JSON.stringify({ email: userData?.email })
            })
                .then(res => res.json())
                .then(data => {
                    if (data?.verify) {
                        setUser(data);
                    }
                    setUserLoading(false)
                })
                .catch(error => {
                    console.log(error);
                    setUserLoading(false);
                })
        } else {
            setUser(null);
            setUserLoading(false);
        }
    }, [userData])

    return { user, userLoading, setUserData }
}

export default useUser;