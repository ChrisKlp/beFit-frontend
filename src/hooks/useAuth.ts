import jwtDecode from 'jwt-decode';
import { useAppSelector } from '@/app/hooks';
import { selectToken } from '@/features/auth/authSlice';
import Role from '@/types/Role';

export default function useAuth() {
  const token = useAppSelector(selectToken);
  let isAdmin = false;
  let isUser = false;
  let isGuest = false;

  if (token) {
    const decoded = jwtDecode(token) as {
      UserInfo: {
        username: string;
        roles: Role[];
      };
    };
    const { username, roles } = decoded.UserInfo;

    isAdmin = roles.includes(Role.admin);
    isUser = roles.includes(Role.user);
    isGuest = roles.includes(Role.guest);

    return { username, roles, isAdmin, isUser, isGuest };
  }
  return { username: '', roles: [], isAdmin, isUser, isGuest };
}
