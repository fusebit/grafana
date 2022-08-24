export const getIsUIHidden = (uiElement: string) => {
  const urlParams = new URLSearchParams(window.location.search);
  const hiddenUiElements = urlParams.get('hideUi')?.split(',');
  const isUiElementHidden = Number(hiddenUiElements?.indexOf(uiElement)) > -1;

  // LEGACY SUPPORT - TODO: Remove once the ui gets hidden using hideUi
  const disablePanelTitle = urlParams.get('disablePanelTitle') === 'true';
  const disableBreadcrumbs = urlParams.get('disableBreadcrumbs') === 'true';
  const disableTvButton = urlParams.get('disableTvButton') === 'true';
  if (!isUiElementHidden && uiElement === 'panelTitle') {
    return disablePanelTitle;
  } else if (!isUiElementHidden && uiElement === 'breadcrumbs') {
    return disableBreadcrumbs;
  } else if (!isUiElementHidden && uiElement === 'tvButton') {
    return disableTvButton;
  }

  return isUiElementHidden;
};
