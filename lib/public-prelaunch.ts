/**
 * Public opening switch.
 *
 * Set this single value to false to remove the prelaunch curtain. The public
 * pages, their metadata and the Safe Link Mask remain unchanged.
 */
export const PUBLIC_PRELAUNCH_CURTAIN = true;

export function isPublicPrelaunchCurtainActive(
  isPublicDeployment: boolean,
  curtainEnabled = PUBLIC_PRELAUNCH_CURTAIN,
) {
  return isPublicDeployment && curtainEnabled;
}
