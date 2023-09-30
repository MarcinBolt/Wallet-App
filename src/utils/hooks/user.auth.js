import { useSelector } from 'react-redux';
import { selectIsLoggedIn, selectIsRefreshing, selectUserEmail, selectUserFirstName } from '../../redux/selectors.js';

export const useAuth = () => {
  const isAuthorized = useSelector(selectIsLoggedIn);
  const isRefreshing = useSelector(selectIsRefreshing);
  const userName = useSelector(selectUserFirstName);
  const userEmail = useSelector(selectUserEmail);

  return { isAuthorized, isRefreshing, userName, userEmail };
};
