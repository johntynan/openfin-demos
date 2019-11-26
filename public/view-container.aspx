<DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
    <%@ Page Language="C#" %>
    <%@ Register tagprefix="SharePoint" namespace="Microsoft.SharePoint.WebControls" assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
    <html dir="ltr" xmlns="http://www.w3.org/1999/xhtml">
    
    <head runat="server">
    <meta name="WebPartPageExpansion" content="full" />
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Untitled 1</title>
    <meta http-equiv="X-UA-Compatible" content="IE=10" />
    <SharePoint:CssRegistration Name="default" runat="server"/>
    </head>
    
    <body>
    <form id="form1" runat="server">
    </form>
    <div>
        <openfin-info></openfin-info>
        <openfin-frame></openfin-frame>
        <view-layout></view-layout>
    </div>
    <script type="module" src="js/view-layout.js"></script>
    <script type="module" src="js/openfin-frame.js"></script>
    <script type="text/javascript" src="https://code.jquery.com/jquery-1.11.1.min.js">
    </script>
    <script type="text/javascript" src="https://golden-layout.com/files/latest/js/goldenlayout.min.js"></script>
    <link type="text/css" rel="stylesheet" href="https://golden-layout.com/files/latest/css/goldenlayout-base.css" />
    <link type="text/css" rel="stylesheet" href="https://golden-layout.com/files/latest/css/goldenlayout-dark-theme.css" />


</body>
<style type="text/css">
    body {
        background: RGB(31, 30, 36);
    }
    div.popout-button {
            position: relative;
            right: 0px;
            color: #fff;
            font-weight: bold;
            z-index: 9999;
            padding: 0px 0px 0px 15px;
            width: 15px;
            margin: 0px auto;
            display: inline-block;
    }

    div.wrapper_title {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 3vw;
        opacity: 0.3;
        color: white;
    }
    div.container {
        -webkit-app-region: drag;
        background: RGB(43, 45, 64);
    }
    div.button {
        float: right;
        position: relative;
        padding: 2px 0px;
        -webkit-app-region: no-drag;
    }
    div.button:hover {
        cursor: pointer;
    }

    div.buttonsWrapper {
        height: 28px
    }
    .lm_header {
        -webkit-app-region: drag;
        background: RGB(31, 30, 36);
        box-shadow: none;
    }
    .lm_tabs {
        -webkit-app-region: no-drag;

    }
    .lm_tab {
        box-shadow: none !important;
    }
</style>
</html>
