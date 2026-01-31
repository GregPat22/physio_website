/**
 * Loads the MioDottore widget script if it hasn't been loaded already
 */
export const loadMioDottoreWidget = (): void => {
  if (!document.getElementById("zl-widget-s")) {
    const script = document.createElement("script");
    script.id = "zl-widget-s";
    script.src = "//platform.docplanner.com/js/widget.js";
    script.async = true;
    document.body.appendChild(script);
  }
};
