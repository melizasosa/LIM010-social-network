export const functionProfile = (user, newName) => {
  return user.updateProfile({
    displayName: newName,
    // photoURL: "https://example.com/jane-q-user/profile.jpg"
  }).then(() => {
    // Update successful.
  }).catch((error) => {
    // An error happened.
    // console.log(error);
  });
};
