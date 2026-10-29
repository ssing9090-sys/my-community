import { useCallback, useEffect, useMemo, useState } from 'react';

import { supabase } from '../../lib/supabase.js';
import { AuthContext } from '../../utils/auth-context.js';

/**
 * AuthProvider 컴포넌트 - Supabase 로그인 세션과 users 프로필을 앱 전체에 제공
 *
 * Props:
 * @param {node} children - 로그인 상태를 사용할 하위 컴포넌트 [Required]
 *
 * Example usage:
 * <AuthProvider><App /></AuthProvider>
 */
function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [isSessionLoading, setIsSessionLoading] = useState(true);
  const [profileState, setProfileState] = useState({ authId: null, data: null });

  const userId = session?.user?.id ?? null;

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setIsSessionLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!userId) return undefined;

    let isActive = true;
    supabase
      .from('users')
      .select('id, name, created_at')
      .eq('auth_id', userId)
      .maybeSingle()
      .then(({ data }) => {
        if (isActive) setProfileState({ authId: userId, data });
      });

    return () => {
      isActive = false;
    };
  }, [userId]);

  const signOut = useCallback(() => supabase.auth.signOut(), []);

  const value = useMemo(() => {
    const isProfileLoading = userId !== null && profileState.authId !== userId;
    return {
      user: session?.user ?? null,
      profile: userId && profileState.authId === userId ? profileState.data : null,
      isLoading: isSessionLoading || isProfileLoading,
      signOut,
    };
  }, [session, userId, profileState, isSessionLoading, signOut]);

  return <AuthContext.Provider value={ value }>{ children }</AuthContext.Provider>;
}

export default AuthProvider;
