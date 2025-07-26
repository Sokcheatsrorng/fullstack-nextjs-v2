// components/AuthSync.tsx
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useDispatch } from 'react-redux';
import { setAccessToken } from '@/redux/features/auth/authSlice';


interface AuthSyncProps {
    children: React.ReactNode;
}

export default function AuthSync({ children }: AuthSyncProps) {
    const { data: session, status } = useSession();
    const dispatch = useDispatch();

    useEffect(() => {
        if (status === 'loading') {
           console.log("loading...")
        } else if (status === 'authenticated' && session) {
            dispatch(setAccessToken(session.access_token));
        }
    }, [session, status, dispatch]);

    return <>{children}</>;
}