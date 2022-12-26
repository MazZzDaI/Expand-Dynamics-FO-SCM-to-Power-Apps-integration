(function () {
    "use strict";
    Globalize.addCultureInfo('en', {
        messages: {
            PowerAppsHost_iFrameTitle: "PowerApps host region",
        }
    });

    $dyn.ui.defaults.PowerAppsHost = {
    };

    $dyn.controls.PowerAppsHost = function (data, element) {
        var self = this;
        self.element = element;

        $dyn.ui.Control.apply(this, arguments);

        if (data.AppId) {
            $dyn.observe(data.AppId, function () {
                self.onPropChanged(data);
            });
        }

        if (data.PowerAppsEnvironment) {
            $dyn.observe(data.PowerAppsEnvironment, function () {
                self.onPropChanged(data);
            });
        }

        if (data.EntityId) {
            $dyn.observe(data.EntityId, function () {
                self.onPropChanged(data);
            });
        }

        if (data.EmbedderOrigin) {
            $dyn.observe(data.EmbedderOrigin, function () {
                self.onPropChanged(data);
            });
        }

        if (data.LegalEntity) {
            $dyn.observe(data.LegalEntity, function () {
                self.onPropChanged(data);
            });
        }

        if (data.ErpIsAdmin) {
            $dyn.observe(data.ErpIsAdmin, function () {
                self.onPropChanged(data);
            });
        }
    }

    $dyn.controls.PowerAppsHost.prototype = $dyn.extendPrototype($dyn.ui.Control.prototype, {
        onPropChanged: function (data) {
            var self = this;

            // Clear any existing children
            while (self.element.hasChildNodes()) {
                self.element.removeChild(self.element.childNodes[0]);
            }

            // Rebuild power app iframe
            if (data) {
                if ($dyn.value(data.AppId) && $dyn.value(data.PowerAppsEnvironment)) {
                    var powerAppUrl = $dyn.value(data.PowerAppsEnvironment);
                    if (!powerAppUrl.endsWith('/')) {
                        powerAppUrl = powerAppUrl + '/';
                    }
                    powerAppUrl = powerAppUrl + $dyn.value(data.AppId) + '?authMode=default&hideNavBar=true';
                    if ($dyn.value(data.EntityId)) {
                        powerAppUrl = powerAppUrl + '&EntityId=' + encodeURIComponent($dyn.value(data.EntityId));
                    }
                    if ($dyn.value(data.EmbedderOrigin)) {
                        powerAppUrl = powerAppUrl + '&embedderOrigin=' + encodeURIComponent($dyn.value(data.EmbedderOrigin));
                    }
                    if ($dyn.value(data.LegalEntity)) {
                        powerAppUrl = powerAppUrl + '&cmp=' + encodeURIComponent($dyn.value(data.LegalEntity));
                    }
                    if ($dyn.value(data.ErpIsAdmin)) {
                        powerAppUrl = powerAppUrl + '&ErpIsAdmin=' + encodeURIComponent($dyn.value(data.ErpIsAdmin));
                    }
                    var hostingDiv = document.createElement('div');
                    hostingDiv.classList.add('powerAppsHost-layout');
                    var iFrameTitle = $dyn.label('PowerAppsHost_iFrameTitle');
                    hostingDiv.innerHTML = '<iframe class="powerAppsHost-layout" src="' + powerAppUrl + '" title="' + iFrameTitle + '" ></iframe>';
                    self.element.appendChild(hostingDiv);
                }
            }
        }
    });
})();