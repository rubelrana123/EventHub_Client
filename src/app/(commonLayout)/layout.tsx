import { PublicFooter } from "@/components/shared/PublicFooter";
import { PublicNavbar } from "@/components/shared/PublicNavbar";

 
export default function CommonLayout({ children }: { children: React.ReactNode }): React.ReactNode {
    return (
        <>  
            <PublicNavbar/>
            {children}
            <PublicFooter/>
        </>
    );
}

 