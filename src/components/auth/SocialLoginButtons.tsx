
import React from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';

export const SocialLoginButtons = () => {
  const { loginWithGoogle, loginWithApple } = useAuth();

  return (
    <div className="flex flex-col space-y-3 w-full">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-gray-300"></span>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="px-2 bg-background text-muted-foreground">Or continue with</span>
        </div>
      </div>
      
      <Button 
        variant="outline" 
        type="button"
        onClick={loginWithGoogle}
        className="flex items-center justify-center gap-2 w-full"
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24">
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
          />
          <path d="M1 1h22v22H1z" fill="none" />
        </svg>
        <span>Google</span>
      </Button>
      
      <Button 
        variant="outline" 
        type="button"
        onClick={loginWithApple}
        className="flex items-center justify-center gap-2 w-full"
      >
        <svg className="h-5 w-5" viewBox="0 0 256 315">
          <path d="M213.803 167.03c.442 47.58 41.74 63.578 42.197 63.794-.35 1.087-6.671 22.82-22.001 45.218-13.26 19.38-27.01 38.684-48.75 39.066-21.29.388-28.16-12.657-52.518-12.657-24.36 0-31.921 12.28-52.048 13.07-20.868.782-36.774-20.95-50.17-40.23C11.844 246.64.06 205.454 0 190.86c-.06-14.642 5.34-30.724 17.25-41.49 12.335-11.07 26.972-18.566 45.16-18.28 19.663.3 32.137 12.128 48.927 12.128 16.792 0 33.757-15.003 55.022-13.002 9.22.477 35.052 3.58 51.674 27.01-1.33.782-30.88 18.027-30.498 53.762l.267.042zm-39.84-105.508c-11.063-13.095-28.314-22.854-45.488-21.388-1.86 14.733 7.42 31.33 18.98 41.687C159.034 93.244 178.212 102 194.22 99.666c1.424-14.103-7.108-30.238-20.257-38.143z" fill="#000"></path>
        </svg>
        <span>Apple</span>
      </Button>
    </div>
  );
};

export default SocialLoginButtons;
