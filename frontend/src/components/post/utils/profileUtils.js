export const handleNameClick = (event, history, profile) => {
  event.preventDefault();
  history.push(`/profile/${profile}`);
};