const { 
  navigateToRoute,
  isAuthorized,
  pendingMakerChecker,
  roles,
  isAuthenticated 
} = useSecureRoute()

// Check authorization before rendering
if (!isAuthorized) {
  return <UnauthorizedView />
}

// Show maker-checker status if needed
if (pendingMakerChecker) {
  return <MakerCheckerStatus state={makerCheckerState} />
}