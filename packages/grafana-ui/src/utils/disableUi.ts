export const getIsUIHidden = (uiElement: string) => {
  const urlParams = new URLSearchParams(window.location.search);
  const hiddenUiElements = urlParams.get('hideUi')?.split(',');
  const isUiElementHidden = Number(hiddenUiElements?.indexOf(uiElement)) > -1;

  // LEGACY SUPPORT - TODO: Remove once the ui gets hidden using hideUi
  const disablePanelTitle = urlParams.get('disablePanelTitle') === 'true';
  const disableBreadcrumbs = typeof urlParams.get('disableBreadcrumbs') === 'string';
  const disableTvButton = typeof urlParams.get('disableTvButton') === 'string';
  if (!isUiElementHidden && uiElement === 'panelTitle') {
    return disablePanelTitle;
  } else if (!isUiElementHidden && uiElement === 'breadcrumbs') {
    return disableBreadcrumbs;
  } else if (!isUiElementHidden && uiElement === 'tvButton') {
    return disableTvButton;
  }

  return isUiElementHidden;
};
