import { signOut } from "@/auth";
import { PowerIcon } from "@heroicons/react/16/solid";
import { Button } from "@nextui-org/react";
import { auth } from '../auth'

export default async function LogoutButton() {
    const session = await auth()    

    if(!session?.user) return null

    const formAction = async () => {         
        "use server"       
        await signOut();
    }

    return (
        <form action={formAction}>
            <Button
                isIconOnly
                variant="light"
                type="submit"
            >
                <PowerIcon className="w-5" />
            </Button>
        </form>
    )
}