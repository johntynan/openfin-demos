{
    "startup_app": {
        "name": "layouts2_prototype_local",
        "uuid": "layouts2_prototype_local",
        "applicationIcon": "https://johntynan.sharepoint.com/TSClassicDev/SiteAssets/OpenFin/favicon.ico",
        "autoShow": false,
        "layout": {
            "windows": [
                {
                    "name": "window_A",
                    "defaultWidth": 600,
                    "defaultHeight": 600,
                    "defaultLeft": 0,
                    "defaultTop": 0,
                    "saveWindowState": false,
                    "backgroundThrottling": true,
                    "layoutConfig": {
                        "content": [
                            {
                                "type": "stack",
                                "id": "no-drop-target",
                                "content": [
                                    {
                                        "type": "component",
                                        "componentName": "view",
                                        "componentState": {
                                            "name": "component_A1",
                                            "processAffinity": "ps_1",
                                            "showDevTools": true,
                                            "url": "https://johntynan.sharepoint.com/TSClassicDev/SiteAssets/OpenFin/view_form.aspx"
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                },
                {
                    "name": "window_B",
                    "defaultWidth": 600,
                    "defaultHeight": 600,
                    "defaultLeft": 200,
                    "defaultTop": 200,
                    "saveWindowState": false,
                    "backgroundThrottling": true,
                    "layoutConfig": {
                        "content": [
                            {
                                "type": "stack",
                                "id": "no-drop-target",
                                "content": [
                                    {
                                        "type": "component",
                                        "componentName": "view",
                                        "componentState": {
                                            "name": "component_B1",
                                            "showDevTools": true,
                                            "url": ""
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                }
            ]
        }
    },
    "runtime": {
        "arguments": "--v=1 --inspect",
        "version": "14.78.46.14"
    },
    "shortcut": {
        "company": "OpenFin",
        "description": "Layouts prototype",
        "icon": "https://johntynan.sharepoint.com/TSClassicDev/SiteAssets/OpenFin/favicon.ico",
        "name": "Layouts2 prototype"
    }
}