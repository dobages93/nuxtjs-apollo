export default function ({ store, redirect, error }) {
  // If user not connected, redirect to /
  if (!store.state.authUser) {
    error({
      message: 'You are not connected',
      statusCode: 403,
    });
    return redirect('/');
  }
}
