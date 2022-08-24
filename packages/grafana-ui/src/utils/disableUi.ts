export const getIsUIHidden = (uiElement: string) => {
  const urlParams = new URLSearchParams(window.location.search);
  const hiddenUiElements = urlParams.get('hideUi')?.split(',');
  let isUiElementHidden = false;
  hiddenUiElements?.forEach((element) => {
    if (!isUiElementHidden) {
      isUiElementHidden = element === uiElement;
    }
  });
  return isUiElementHidden;
};
