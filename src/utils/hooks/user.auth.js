import { useSelector } from 'react-redux';
import { selectGlobalIsUserPanelOpen, selectIsLoggedIn, selectIsRefreshing, selectUserEmail, selectUserFirstName } from '../../redux/selectors.js';

export const useAuth = () => {
  const isAuthorized = useSelector(selectIsLoggedIn);
  const isRefreshing = useSelector(selectIsRefreshing);
  const isUserPanelOpen = useSelector(selectGlobalIsUserPanelOpen);
  const userName = useSelector(selectUserFirstName);
  const userEmail = useSelector(selectUserEmail);

  return { isAuthorized, isRefreshing, userName, userEmail, isUserPanelOpen };
};
